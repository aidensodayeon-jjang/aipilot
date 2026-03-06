from rest_framework import status
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from api.models import History
from api.serializers import HistorySerializer


class HistoryView(APIView):
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]

    queryset = History.objects.all()
    serializer_class = HistorySerializer

    def get(self, request):
        user_id = request.query_params.get('id', None)
        history = self.queryset.filter(userid__id=user_id).order_by('-id')
        serializer = self.serializer_class(history, many=True)

        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
