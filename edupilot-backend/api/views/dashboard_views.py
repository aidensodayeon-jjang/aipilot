from django.db.models import Count
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from api.models import Attend
from api.models import StudentMaster


class DashboardView(APIView):
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        results = {
            "total_consulting_count": self.get_student_count(status='상담중'),
            "total_user_count": StudentMaster.objects.exclude(status='종료').count(),
            "total_paid_count": StudentMaster.objects.filter(status='결제완료').count(),
            "total_unpaid_count": StudentMaster.objects.filter(status='미결제').count(),
            "total_reservation_count": self.get_attend_count(status_prefix='예약'),
        }
        return Response(results)

    @staticmethod
    def get_student_count(status):
        return StudentMaster.objects.filter(status=status).aggregate(count=Count('id'))['count']

    @staticmethod
    def get_attend_count(status_prefix):
        return Attend.objects.filter(status__startswith=status_prefix).aggregate(count=Count('id'))['count']
