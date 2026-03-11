from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from api.utils.config import callId
from api.utils.message import send_many
from api.models import MessageLog, StudentMaster


class MessageView(APIView):
    permission_classes = [IsAdminUser]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        """날짜별 발송 로그 조회"""
        date_str = request.query_params.get('date')
        if not date_str:
            return Response({"error": "Date is required"}, status=400)
        
        # 해당 날짜의 발송 로그 조회
        logs = MessageLog.objects.filter(created_at__date=date_str).select_related('student')
        
        result = [{
            "id": log.id,
            "student_name": log.student.name if log.student else "직접입력",
            "receiver": log.receiver,
            "content": log.content,
            "status": log.status,
            "created_at": log.created_at.strftime('%Y-%m-%d %H:%M:%S')
        } for log in logs]
        
        return Response(result)

    def post(self, request):
        content = request.data.get("content", None)
        phone_nums = request.data.get("phoneNums", [])
        # 프론트엔드에서 보낸 발신번호가 비어있으면 config 기본값 사용
        sender_raw = request.data.get("sender", "")
        sender = sender_raw if sender_raw else callId

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
            # 발송 성공 시 로그 저장 (개별 메시지당 한 줄씩)
            if res.status_code == 200:
                for phone in phone_nums:
                    if not phone: continue
                    clean_phone = phone.replace("-", "").strip()
                    # 해당 번호의 학생 매칭 시도
                    student = StudentMaster.objects.filter(phone_parent__contains=clean_phone[-8:]).first()
                    MessageLog.objects.create(
                        student=student,
                        sender=sender,
                        receiver=phone,
                        content=content,
                        status='success'
                    )

            return Response(res.json(), status=res.status_code)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
