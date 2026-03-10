import os
from django.core.files.storage import default_storage
from django.db import transaction
from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.pagination import PageNumberPagination

from api.models import StudentMaster, CourseMaster, SemesterStatus, Attend, History, Enrollment, AttendanceLog
from api.serializers import StudentMasterSerializer

class StudentPagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = 'page_size'
    max_page_size = 100

class StudentMasterView(APIView):
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]
    pagination_class = StudentPagination
    serializer_class = StudentMasterSerializer

    def get_queryset(self):
        request = self.request
        status_param = request.query_params.get('status')
        search_query = request.query_params.get('search', '').strip()
        base_queryset = StudentMaster.objects.prefetch_related('courses').order_by('-id')

        if search_query:
            base_queryset = base_queryset.filter(
                Q(name__icontains=search_query) | Q(phone_parent__icontains=search_query)
            )

        if status_param == 'unprocessed':
            current_semester_obj = SemesterStatus.objects.first()
            if not current_semester_obj: return base_queryset.none()
            current_semester = current_semester_obj.current_semester
            
            enrolled_student_ids = CourseMaster.objects.filter(term=current_semester).values_list('userid_id', flat=True)
            
            # 상태가 '재원생', '미처리', '확인필요'인 학생 중 수강 기록이 없는 학생
            return base_queryset.filter(
                Q(status='재원생') | Q(status='미처리') | Q(status='확인필요')
            ).exclude(id__in=enrolled_student_ids)

        if status_param:
            return base_queryset.filter(status=status_param)
        return base_queryset

    def get(self, request):
        queryset = self.get_queryset()
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(queryset, request)
        if page is not None:
            serializer = self.serializer_class(page, many=True)
            return paginator.get_paginated_response(serializer.data)
        return Response(self.serializer_class(queryset, many=True).data)

    def post(self, request):
        # master_id 자동 생성 (전화번호 기반 또는 UUID)
        data = request.data.copy()
        if not data.get('master_id'):
            # 학부모 전화번호를 master_id로 사용 (기존 관례)
            data['master_id'] = data.get('phone_parent')

        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk=None):
        try:
            student = StudentMaster.objects.get(id=pk)
        except StudentMaster.DoesNotExist:
            return Response({"error": "학생을 찾을 수 없습니다."}, status=404)
        serializer = self.serializer_class(student, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

class StudentMergeView(APIView):
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]

    @transaction.atomic
    def post(self, request):
        old_id = request.data.get('old_id') # 확인필요 학생 (기존 데이터)
        new_id = request.data.get('new_id') # 현재 재원생 (신규 데이터)

        try:
            old_student = StudentMaster.objects.get(id=old_id)
            new_student = StudentMaster.objects.get(id=new_id)

            # 1. 수강 정보 이전 (새로운 CourseMaster를 기존 학생으로 변경)
            CourseMaster.objects.filter(userid=new_student).update(userid=old_student)
            
            # 2. 기타 이력 이전
            Attend.objects.filter(userid=new_student).update(userid=old_student)
            History.objects.filter(userid=new_student).update(userid=old_student)
            Enrollment.objects.filter(student=new_student).update(student=old_student)
            AttendanceLog.objects.filter(student=new_student).update(student=old_student)

            # 3. 기존 학생 정보 업데이트 (신규 데이터의 연락처 등 반영)
            old_student.phone_parent = new_student.phone_parent
            old_student.status = '재원생'
            old_student.memo = f"{old_student.memo}\n[데이터통합 {datetime.now().strftime('%y%m%d')}]"
            old_student.save()

            # 4. 신규 중복 데이터 삭제
            new_student.delete()

            return Response({"message": f"{old_student.name} 학생의 데이터가 성공적으로 통합되었습니다."})

        except Exception as e:
            return Response({"error": str(e)}, status=400)

@api_view(['POST'])
@parser_classes([MultiPartParser])
def upload_photo(request):
    file = request.FILES.get('file')
    master_id = request.POST.get('master_id')
    if not file or not master_id: return Response({'error': 'file/id error'}, status=400)
    ext = os.path.splitext(file.name)[1]
    filename = f'{master_id}{ext}'
    path = default_storage.save(f'student_photos/{filename}', file)
    return Response({'url': default_storage.url(path)}, status=200)
