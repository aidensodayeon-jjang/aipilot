from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import AcademicSemester, SemesterStatus

class AcademicSemesterView(APIView):
    # ... (get 동일) ...

    def post(self, request):
        name = request.data.get('name')
        start_date = request.data.get('start_date') or None
        end_date = request.data.get('end_date') or None
        vacation_start = request.data.get('vacation_start') or None
        vacation_end = request.data.get('vacation_end') or None

        if not name or not start_date or not end_date:
            return Response({"error": "학기명, 개강일, 종강일은 필수입니다."}, status=400)

        # 1. 전체 시스템 현재 학기 코드 업데이트 (SemesterStatus)
        SemesterStatus.objects.update_or_create(
            id=1,
            defaults={'current_semester': name}
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
