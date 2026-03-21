from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from ..models import Notification
from ..serializers import NotificationSerializer

class NotificationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications = Notification.objects.all()[:50] # 최근 50개만
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

    def post(self, request):
        # 모든 알림을 읽음 처리
        Notification.objects.filter(is_unread=True).update(is_unread=False)
        return Response({"message": "All notifications marked as read"})

    def delete(self, request):
        # 알림 삭제 (필요한 경우)
        pk = request.query_params.get('id')
        if pk:
            Notification.objects.filter(id=pk).delete()
        else:
            Notification.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
