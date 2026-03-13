from rest_framework import viewsets
from api.models import Announcement
from api.serializers import AnnouncementSerializer

class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all().order_by('-date')
    serializer_class = AnnouncementSerializer
