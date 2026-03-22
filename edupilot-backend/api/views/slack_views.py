import requests
from datetime import datetime
from django.conf import settings
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


class SyncSlackView(APIView):
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        # 1. 마지막 저장된 타임스탬프 가져오기
        last_log = SlackLogNew.objects.all().order_by('-ts').first()
        oldest_ts = last_log.ts if last_log else "0"

        # 2. 슬랙 설정 가져오기
        slack_token = getattr(settings, 'SLACK_BOT_TOKEN', None)
        # 동기화할 채널을 'mokdong_student' (CF2JWA4AC)로 명시적 지정
        channel_id = 'CF2JWA4AC' 

        if not slack_token or "YOUR_SLACK_BOT_TOKEN_HERE" in slack_token:
            return Response({"error": "SLACK_BOT_TOKEN is not configured correctly in secrets.json."}, status=status.HTTP_400_BAD_REQUEST)

        # 3. 슬랙 API 호출
        url = "https://slack.com/api/conversations.history"
        headers = {"Authorization": f"Bearer {slack_token}"}
        params = {
            "channel": channel_id,
            "oldest": oldest_ts,
            "limit": 100
        }

        try:
            response = requests.get(url, headers=headers, params=params)
            data = response.json()

            if not data.get("ok"):
                return Response({"error": f"Slack API Error: {data.get('error')}"}, status=status.HTTP_400_BAD_REQUEST)

            messages = data.get("messages", [])
            new_logs = []

            # 4. 메시지 처리 및 저장 (최신순에서 과거순으로 오므로 역순으로 저장하거나 ts 체크)
            for msg in reversed(messages):
                ts = msg.get("ts")
                if ts == oldest_ts:
                    continue
                
                # 중복 체크 (DB 레벨 unique constraint도 있지만 여기서도 확인)
                if SlackLogNew.objects.filter(ts=ts).exists():
                    continue

                text = msg.get("text", "")
                # <@...> 형태의 멘션 제거
                import re
                clean_text = re.sub(r'<@[\w\d]+>\s*', '', text).strip()
                
                # 날짜 변환
                posted_dt = datetime.fromtimestamp(float(ts))

                new_logs.append(SlackLogNew(
                    ts=ts,
                    posted_dt=posted_dt,
                    message=clean_text
                ))

            if new_logs:
                SlackLogNew.objects.bulk_create(new_logs)
                return Response({"message": f"Successfully synced {len(new_logs)} messages."}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Already up to date."}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
