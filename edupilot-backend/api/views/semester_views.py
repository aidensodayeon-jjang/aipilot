from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import AcademicSemester

class AcademicSemesterView(APIView):
    def get(self, request):
        semester = AcademicSemester.objects.filter(is_current=True).first()
        if not semester:
            return Response({"message": "No current semester found"}, status=200)
        
        return Response({
            "name": semester.name,
            "start_date": semester.start_date,
            "end_date": semester.end_date,
            "vacation_start": semester.vacation_start,
            "vacation_end": semester.vacation_end,
        })

    def post(self, request):
        name = request.data.get('name')
        start_date = request.data.get('start_date') or None
        end_date = request.data.get('end_date') or None
        vacation_start = request.data.get('vacation_start') or None
        vacation_end = request.data.get('vacation_end') or None

        if not name or not start_date or not end_date:
            return Response({"error": "학기명, 개강일, 종강일은 필수입니다."}, status=400)

        # 기존의 is_current를 모두 False로 변경
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

        return Response({"message": "학기 일정이 성공적으로 저장되었습니다."})
