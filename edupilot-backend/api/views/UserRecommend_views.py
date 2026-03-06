from rest_framework import status
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from api.models import RecommendedItem
from api.serializers import RecommendedItemSerializer


class RecommendedItemView(APIView):
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        student = request.query_params.get('student_id', None)
        queryset = RecommendedItem.objects.all().order_by('-term')

        if student:
            queryset = queryset.filter(student_id=student)  # 🔥 여기 변경

        serializer = RecommendedItemSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = RecommendedItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
