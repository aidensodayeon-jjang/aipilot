from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from api.models import StudentMaster

class StudentStatusView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        # Get distinct statuses, excluding null and empty values
        statuses = StudentMaster.objects.values_list('status', flat=True).distinct()
        non_empty_statuses = [status for status in statuses if status]
        return Response(non_empty_statuses)
