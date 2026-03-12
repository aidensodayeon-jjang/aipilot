from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny # ✅ 추가
from ..models import AcademicSemester, SemesterStatus

class AcademicSemesterView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [] # ✅ 인증 클래스 비우기 추가

    def get(self, request):
        semester = AcademicSemester.objects.filter(is_current=True).first()
        status_obj = SemesterStatus.objects.first()
        
        data = {
            "name": semester.name if semester else "학기 정보 없음",
            "start_date": str(semester.start_date) if semester else "",
            "end_date": str(semester.end_date) if semester else "",
            "vacation_start": str(semester.vacation_start) if semester and semester.vacation_start else "",
            "vacation_end": str(semester.vacation_end) if semester and semester.vacation_end else "",
            "call_id": status_obj.call_id if status_obj else "" # ✅ 추가
        }
        return Response(data)

    def post(self, request):
        name = request.data.get('name')
        start_date = request.data.get('start_date') or None
        end_date = request.data.get('end_date') or None
        vacation_start = request.data.get('vacation_start') or None
        vacation_end = request.data.get('vacation_end') or None
        call_id = request.data.get('call_id') # ✅ 추가

        if not name or not start_date or not end_date:
            return Response({"error": "학기명, 개강일, 종강일은 필수입니다."}, status=400)

        # 1. 전체 시스템 현재 학기 코드 및 발신번호 업데이트 (SemesterStatus)
        SemesterStatus.objects.update_or_create(
            id=1,
            defaults={
                'current_semester': name,
                'call_id': call_id # ✅ 추가
            }
        )

        # 2. 학기 일정 상세 업데이트 (AcademicSemester)
        AcademicSemester.objects.all().update(is_current=False)
        semester, created = AcademicSemester.objects.update_or_create(
            name=name,
            defaults={
                'start_date': start_date,
                'end_date': end_date,
                'vacation_start': vacation_start,
                'vacation_end': vacation_end,
                'is_current': True
            }
        )

        return Response({"message": f"시스템 현재 학기가 '{name}'으로 변경 및 저장되었습니다."})
