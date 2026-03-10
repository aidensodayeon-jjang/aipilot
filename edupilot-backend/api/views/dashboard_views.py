from datetime import date, datetime
from django.db.models import Count, Q
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Attend, StudentMaster, AcademicSemester, SemesterStatus


from rest_framework.decorators import authentication_classes, permission_classes
...
class DashboardView(APIView):
    # 인증과 권한을 명시적으로 비움
    permission_classes = [AllowAny]
    authentication_classes = [] 

    def get(self, request):
        # 1. 학기 및 요일 정보
        current_semester = AcademicSemester.objects.filter(is_current=True).first()
        semester_status = SemesterStatus.objects.first()
        
        week_info = "학기 정보 없음"
        day_info = datetime.now().strftime("%A")
        day_map = {
            'Monday': '월요일', 'Tuesday': '화요일', 'Wednesday': '수요일',
            'Thursday': '목요일', 'Friday': '금요일', 'Saturday': '토요일', 'Sunday': '일요일'
        }
        korean_day = day_map.get(day_info, day_info)

        current_week = None
        progress_percent = 0
        new_student_count = 0

        # 저장된 신규 인원수 가져오기
        if semester_status:
            new_student_count = semester_status.new_count

        if current_semester:
            today = date.today()
            try:
                total_days = (current_semester.end_date - current_semester.start_date).days
                elapsed_days = (today - current_semester.start_date).days
                if total_days > 0:
                    progress_percent = min(max(int((elapsed_days / total_days) * 100), 0), 100)

                if current_semester.start_date <= today <= current_semester.end_date:
                    delta = today - current_semester.start_date
                    current_week = (delta.days // 7) + 1
                    week_info = f"{current_semester.name} {current_week}주차"
                elif today < current_semester.start_date:
                    week_info = f"{current_semester.name} 개강 전"
                    progress_percent = 0
                else:
                    week_info = f"{current_semester.name} 종강"
                    progress_percent = 100
            except Exception:
                pass

        results = {
            "total_user_count": StudentMaster.objects.filter(status='재원생').count(),
            "total_leave_count": StudentMaster.objects.filter(status='휴원생').count(),
            "total_unreg_count": StudentMaster.objects.filter(status='미등록').count(),
            "total_consulting_count": StudentMaster.objects.filter(status='상담중').count(),
            
            "total_paid_count": StudentMaster.objects.filter(status='재원생', courses__term__isnull=False).distinct().count(),
            "total_unpaid_count": StudentMaster.objects.filter(status='재원생').exclude(courses__term__isnull=False).distinct().count(),
            "total_reservation_count": Attend.objects.filter(status__startswith='예약').count(),
            
            "semester_name": current_semester.name if current_semester else "설정 필요",
            "current_week": current_week,
            "week_info": week_info,
            "day_info": korean_day,
            "progress_percent": progress_percent,
            "new_student_count": new_student_count,
        }
        return Response(results)
