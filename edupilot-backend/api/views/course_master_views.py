from django.db.models import Count, Q
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status  # ← 필요함

from api.models import CourseMaster
from api.serializers import CourseMasterSerializer

class CourseMasterView(APIView):
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]

    queryset = CourseMaster.objects.all()
    serializer_class = CourseMasterSerializer

    def get(self, request):
        group_by = request.query_params.get('group_by', None)

        if group_by == 'term':
            queryset = self.queryset.filter(course='정규') \
                           .values('term') \
                           .annotate(
                term_count=Count('id'),
                new_count=Count('id', filter=Q(pay__contains='신규'))
            ) \
                           .order_by('-term')[:7]
            return Response(reversed(queryset))

        user_id = request.query_params.get('id', None)
        course_masters = self.queryset.filter(userid__id=user_id)
        serializer = self.serializer_class(course_masters, many=True)
        return Response(serializer.data)

    def delete(self, request, pk):  # 🔥 요기!
        try:
            course = CourseMaster.objects.get(id=pk)
            course.delete()
            return Response({"message": "삭제되었습니다."}, status=status.HTTP_204_NO_CONTENT)
        except CourseMaster.DoesNotExist:
            return Response({"error": "해당 수강기록을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)
