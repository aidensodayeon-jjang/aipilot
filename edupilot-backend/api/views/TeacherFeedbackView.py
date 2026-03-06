# api/views.py

from api.models import TeacherFeedback
from api.serializers import TeacherFeedbackSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status


class TeacherFeedbackView(APIView):
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        student_id = request.query_params.get('student_id')
        semester = request.query_params.get('semester')

        queryset = TeacherFeedback.objects.all()

        if student_id:
            queryset = queryset.filter(student_id=student_id)
        if semester:
            queryset = queryset.filter(semester=semester)

        serializer = TeacherFeedbackSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TeacherFeedbackSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
