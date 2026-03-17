from datetime import date
from django.utils import timezone
from django.db.models import Count, Q
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from api.models import Attend, StudentMaster, AcademicSemester, SemesterStatus, CourseMaster, DashboardTask
from api.serializers import DashboardTaskSerializer


from rest_framework.decorators import authentication_classes, permission_classes

class DashboardTaskView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request):
        tasks = DashboardTask.objects.all()
        serializer = DashboardTaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DashboardTaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        try:
            task = DashboardTask.objects.get(pk=pk)
        except DashboardTask.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = DashboardTaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            task = DashboardTask.objects.get(pk=pk)
        except DashboardTask.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class DashboardView(APIView):
    # 인증과 권한을 명시적으로 비움
    permission_classes = [AllowAny]
    authentication_classes = [] 

    def get(self, request):
        # 1. 학기 및 요일 정보 (한국 시간 기준)
        now_local = timezone.localtime()
        today = now_local.date()

        current_semester = AcademicSemester.objects.filter(is_current=True).first()
        semester_status = SemesterStatus.objects.first()

        week_info = "학기 정보 없음"
        day_info = now_local.strftime("%A")
        day_map = {
            'Monday': '월요일', 'Tuesday': '화요일', 'Wednesday': '수요일',
            'Thursday': '목요일', 'Friday': '금요일', 'Saturday': '토요일', 'Sunday': '일요일'
        }
        korean_day = day_map.get(day_info, day_info)

        current_week = None
        progress_percent = 0
        new_student_count = 0
        total_revenue = 0
        unpaid_amount = 0

        # 저장된 신규 인원수 및 총 매출액 가져오기
        if semester_status:
            new_student_count = semester_status.new_count
            total_revenue = semester_status.total_revenue
            unpaid_amount = semester_status.unpaid_amount

        # 2. 상세 통계 집계 (DB 기반)
        # 2-1. 결제 상태 비중 (StudentMaster 기준 - 중복 제거)
        active_students = StudentMaster.objects.filter(status='재원생').prefetch_related('courses')
        
        payment_data = {
            "labels": ["결제완료", "미결제", "PASS"],
            "series": [0, 0, 0]
        }
        
        for student in active_students:
            student_courses = student.courses.all()
            if not student_courses:
                continue
                
            pay_statuses = [c.pay for c in student_courses]
            
            if '미결제' in pay_statuses:
                payment_data["series"][1] += 1 # 미결제
            elif '결제완료' in pay_statuses:
                payment_data["series"][0] += 1 # 결제완료
            elif 'PASS' in pay_statuses:
                payment_data["series"][2] += 1 # PASS

        # 2-2. 학교별 재원생 Top 8 (StudentMaster 기준)
        school_stats = StudentMaster.objects.filter(status='재원생').exclude(school='').values('school').annotate(count=Count('school')).order_by('-count')[:8]
        school_data = {
            "labels": [item['school'] for item in school_stats],
            "series": [item['count'] for item in school_stats]
        }

        # 2-3. 학년별 구성비 (StudentMaster 기준)
        grade_stats = StudentMaster.objects.filter(status='재원생').values('grade').annotate(count=Count('grade'))
        elem_high = 0 # 초5-6
        middle = 0    # 중등
        others = 0    # 기타
        total_students = StudentMaster.objects.filter(status='재원생').count() or 1

        for item in grade_stats:
            g = item['grade'] or ''
            c = item['count']
            if '초5' in g or '초6' in g: elem_high += c
            elif '중' in g: middle += c
            else: others += c
        
        grade_data = [
            {"label": "초등 고학년 (5-6학년)", "count": elem_high, "percent": round((elem_high / total_students) * 100, 1)},
            {"label": "중등부 (1-3학년)", "count": middle, "percent": round((middle / total_students) * 100, 1)},
            {"label": "기타", "count": others, "percent": round((others / total_students) * 100, 1)},
        ]

        # 2-4. 미결제 학생 리스트 (DB 기반) - 학생별 중복 제거
        unpaid_students_query = CourseMaster.objects.filter(pay='미결제', userid__status='재원생').select_related('userid').order_by('userid', 'id')
        
        # 학생별로 한 번씩만 리스트에 추가
        seen_students = set()
        unpaid_list = []
        for item in unpaid_students_query:
            if item.userid_id not in seen_students:
                unpaid_list.append({
                    "studentName": item.userid.name,
                    "school": item.userid.school,
                    "grade": item.userid.grade,
                    "course": item.subject,
                    "paymentAmount": 0,
                    "paymentStatus": "미결제"
                })
                seen_students.add(item.userid_id)
            if len(unpaid_list) >= 20: # 최대 20명까지만
                break

        if current_semester:
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

        # 3. 태스크 데이터 가져오기
        tasks = DashboardTask.objects.all()
        task_data = {
            "short": [],
            "mid": [],
            "feedback": []
        }
        for task in tasks:
            task_data[task.type].append({
                "id": str(task.id),
                "name": task.content,
                "completed": task.completed
            })

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
            "total_revenue": total_revenue,
            "unpaid_amount": unpaid_amount,
            # 추가된 통계 데이터
            "payment_data": payment_data,
            "school_data": school_data,
            "grade_data": grade_data,
            "unpaid_list": unpaid_list,
            # 태스크 데이터 추가
            "tasks": task_data,
        }
        return Response(results)
