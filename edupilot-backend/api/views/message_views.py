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
        phone_nums = request.data.get("phoneNums", [])
        # 프론트엔드에서 보낸 발신번호가 있으면 사용, 없으면 config 기본값 사용
        sender = request.data.get("sender", callId)

        if not content or not phone_nums:
            return Response({"error": "내용 또는 수신자 번호가 없습니다."}, status=400)

        if isinstance(phone_nums, str):
            phone_nums = [phone_nums]

        messages = [
            {
                'to': phone.replace("-", "").strip(),
                'from': sender.replace("-", "").strip(),
                'text': content
            } for phone in phone_nums if phone
        ]

        data = {
            "messages": messages
        }

        try:
            res = send_many(data)
            return Response(res.json(), status=res.status_code)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
