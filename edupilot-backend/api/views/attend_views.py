from rest_framework import status
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from api.models import Attend
from api.serializers import AttendSerializer


from rest_framework.permissions import AllowAny # ✅ 추가

class AttendView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [] # ✅ 인증 비우기

    serializer_class = AttendSerializer

    @staticmethod
    def get_queryset(request):
        group_by = request.query_params.get('group_by')
        user_id = request.query_params.get('id')

        if group_by == 'reserve':
            return Attend.objects.filter(status__startswith='예약')
        elif user_id:
            return Attend.objects.filter(userid__id=user_id).order_by('-id')

        return Attend.objects.none()

    def get(self, request):
        attend_qs = self.get_queryset(request)
        serializer = self.serializer_class(attend_qs, many=True)
        data = serializer.data

        # ✅ 키오스크 출석 로그 추가 (출결/보강 관리 화면 통합)
        if request.query_params.get('group_by') == 'reserve':
            from django.utils import timezone
            from ..models import AttendanceLog, SemesterStatus
            
            now = timezone.localtime()
            # 오늘 날짜의 출석 로그 가져오기
            today_logs = AttendanceLog.objects.filter(
                check_in_time__date=now.date()
            ).select_related('student', 'course_class')
            
            # 현재 학기 정보 가져오기
            current_semester = ""
            sem_status = SemesterStatus.objects.first()
            if sem_status:
                current_semester = sem_status.current_semester

            for log in today_logs:
                # Attend 모델 형식으로 변환하여 추가
                data.append({
                    'id': f"log-{log.id}", # 가상 ID (Frontend에서 구분용)
                    'name': log.student.name if log.student else "Unknown",
                    'phone_parent': log.student.phone_parent if log.student else "",
                    'term': current_semester,
                    'subject': log.course_class.subject_name if log.course_class else "자습/방문",
                    'round': "기본",
                    'status': "출석" if log.status == 'present' else "결석",
                    'res_date': log.check_in_time.isoformat(),
                    'memo': f"키오스크 체크인 ({log.check_in_time.strftime('%H:%M')})" if log.method == 'Kiosk' else "수동 기록",
                    'is_log': True # 출석 로그임을 표시
                })
        
        return Response(data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request):
        pk = request.data.get('id')
        try:
            attend = Attend.objects.get(id=pk)
        except Attend.DoesNotExist:
            return Response({"error": "Data not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.serializer_class(attend, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request):
        pk = request.query_params.get('id')
        print(f"DEBUG: Attempting to delete Attend record with ID: {pk}") # 서버 로그 확인용
        
        if not pk:
            return Response({"error": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            attend = Attend.objects.get(id=pk)
            attend.delete()
            print(f"DEBUG: Successfully deleted Attend record ID: {pk}")
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Attend.DoesNotExist:
            print(f"DEBUG: Attend record ID: {pk} not found")
            return Response({"error": "Data not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"DEBUG: Error during delete: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
