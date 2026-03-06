from rest_framework import status
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from api.models import SlackLogNew
from api.serializers import SlackLogNewSerializer


class SlackLogView(APIView):
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        keyword = request.query_params.get('q', None)
        queryset = SlackLogNew.objects.all().order_by('-posted_dt')

        if keyword:
            queryset = queryset.filter(message__icontains=keyword)

        serializer = SlackLogNewSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SlackLogNewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
