import os

from django.core.files.storage import default_storage
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from api.models import StudentMaster
from api.serializers import StudentMasterSerializer


class StudentMasterView(APIView):
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]

    serializer_class = StudentMasterSerializer

    @staticmethod
    def get_queryset(request):
        status_param = request.query_params.get('status')

        if status_param == 'unprocessed':
            # 1. CSV 파일 절대 경로 설정
            import csv
            csv_path = "/Users/aiden/Desktop/프로젝트/aipilot-main/edupilot-frontend/src/data/raw_data.csv"
            csv_names = set()
            try:
                with open(csv_path, mode='r', encoding='utf-8') as f:
                    reader = csv.DictReader(f)
                    for row in reader:
                        name = (row.get('학생이름') or row.get('\ufeff학생이름') or '').strip()
                        if name:
                            csv_names.add(name)
            except Exception as e:
                print(f"Error reading CSV for unprocessed filter: {e}")

            # 2. DB에는 '재원생'이지만 CSV 명단에는 없는 학생만 필터링 (조예준 등)
            return StudentMaster.objects.filter(status='재원생').exclude(name__in=csv_names)

        if status_param:
            # 재원생, 휴원생, 미등록, 상담중 등 일반 상태는 DB 기준으로 필터링
            return StudentMaster.objects.filter(status=status_param)

        return StudentMaster.objects.all()

        return StudentMaster.objects.all()

    def get(self, request):
        queryset = self.get_queryset(request)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        print(request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # def put(self, request, pk=None):
    #     print("📥 [PUT 요청 수신] StudentMasterUpdateView")
    #     print("📌 요청된 pk:", pk)
    #     print("📦 요청 데이터:", request.data)
    #
    #     try:
    #         student = StudentMaster.objects.get(id=pk)
    #         print("✅ 해당 학생 객체 존재함:", student)
    #
    #     except StudentMaster.DoesNotExist:
    #         print("❌ 해당 ID의 학생이 존재하지 않음:", pk)
    #         return Response({"error": "학생을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)
    #
    #     serializer = self.serializer_class(student, data=request.data)
    #
    #     if not serializer.is_valid():
    #         print("❗ serializer 오류:", serializer.errors)
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #
    #     instance = serializer.save()
    #     print("💾 저장 완료:", instance)
    #
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk=None):
        try:
            student = StudentMaster.objects.get(id=pk)

        except StudentMaster.DoesNotExist:
            return Response({"error": "학생을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)

        # partial=True를 추가하여 일부 필드만 업데이트 가능하게 함
        serializer = self.serializer_class(student, data=request.data, partial=True)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@parser_classes([MultiPartParser])
def upload_photo(request):
    file = request.FILES.get('file')
    master_id = request.POST.get('master_id')  # 클라이언트에서 같이 보냄

    if not file or not master_id:
        return Response({'error': 'file과 master_id가 필요합니다.'}, status=400)

    # 확장자 유지
    ext = os.path.splitext(file.name)[1]  # 예: ".jpg"
    filename = f'{master_id}{ext}'
    path = default_storage.save(f'student_photos/{filename}', file)

    return Response({'url': default_storage.url(path)}, status=200)
