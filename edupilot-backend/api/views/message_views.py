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
        phone_nums = request.data.get("phoneNums", None)

        data = {
            "messages": [{
                'to': phone_nums,
                'from': callId,
                'text': content
            }]
        }

        res = send_many(data)
        return Response(res, res.status_code)
