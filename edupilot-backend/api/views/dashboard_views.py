from django.db.models import Count
from rest_framework.permissions import AllowAny # ✅ 수정
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from api.models import Attend
from api.models import StudentMaster


class DashboardView(APIView):
    permission_classes = [AllowAny] # ✅ 수정
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        results = {
            "total_user_count": StudentMaster.objects.filter(status='재원생').count(),
            "total_leave_count": StudentMaster.objects.filter(status='휴원생').count(),
            "total_unreg_count": StudentMaster.objects.filter(status='미등록').count(),
            "total_consulting_count": StudentMaster.objects.filter(status='상담중').count(),
            
            "total_paid_count": StudentMaster.objects.filter(status='재원생', courses__term__isnull=False).distinct().count(), # 유효 수강 기록 기준
            "total_unpaid_count": StudentMaster.objects.filter(status='재원생').exclude(courses__term__isnull=False).distinct().count(), # 미결제 추정
            "total_reservation_count": self.get_attend_count(status_prefix='예약'),
        }
        return Response(results)

    @staticmethod
    def get_student_count(status):
        return StudentMaster.objects.filter(status=status).aggregate(count=Count('id'))['count']

    @staticmethod
    def get_attend_count(status_prefix):
        return Attend.objects.filter(status__startswith=status_prefix).aggregate(count=Count('id'))['count']
