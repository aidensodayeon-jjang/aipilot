from rest_framework import status
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from api.models import Attend
from api.serializers import AttendSerializer


class AttendView(APIView):
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]

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
        attend = self.get_queryset(request)
        serializer = self.serializer_class(attend, many=True)

        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
