from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from api.utils.config import callId
from api.utils.message import send_many


class MessageView(APIView):
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        content = request.data.get("content", None)
        phone_nums = request.data.get("phoneNums", []) # 리스트 형태로 기대

        if not content or not phone_nums:
            return Response({"error": "내용 또는 수신자 번호가 없습니다."}, status=400)

        # 수신자가 한 명일 경우 리스트로 변환
        if isinstance(phone_nums, str):
            phone_nums = [phone_nums]

        # Solapi 규격에 맞게 개별 메시지 구성
        messages = [
            {
                'to': phone.replace("-", ""), # 하이픈 제거
                'from': callId,
                'text': content
            } for phone in phone_nums
        ]

        data = {
            "messages": messages
        }

        try:
            res = send_many(data)
            res_data = res.json()
            return Response(res_data, status=res.status_code)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
