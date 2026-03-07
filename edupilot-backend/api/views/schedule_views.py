from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import datetime
from ..models import StudentMaster, CourseClass, Enrollment, AttendanceLog
from django.db.models import Prefetch

class ScheduleStructureView(APIView):
    """전체 시간표 구조 및 수업 정보를 반환"""
    def get(self, request):
        # 실제 운영 데이터에 맞춰 요일별로 그룹화하여 반환
        # 여기서는 샘플 구조를 반환하며, 실제 DB의 CourseClass 데이터를 기반으로 구성하도록 확장 가능합니다.
        days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
        structure = {}
        
        for day in days:
            classes = CourseClass.objects.filter(day_of_week__icontains=day).prefetch_related(
                Prefetch('enrolled_students', queryset=Enrollment.objects.select_related('student'))
            )
            
            # 시간대별로 묶기
            slots = {}
            for c in classes:
                time_key = c.start_time.strftime('%H:%M')
                if time_key not in slots:
                    slots[time_key] = {"time": time_key, "rooms": {}}
                
                slots[time_key]["rooms"][c.classroom or "기타"] = {
                    "classId": c.id,
                    "className": c.subject_name,
                    "instructor": c.teacher_name,
                    "students": [{"id": e.student.id, "name": e.student.name} for e in c.enrolled_students.all()]
                }
            
            structure[day] = sorted(slots.values(), key=lambda x: x['time'])
            
        return Response(structure)

class AttendanceLogView(APIView):
    """특정 날짜의 출결 로그 조회 및 기록"""
    def get(self, request):
        date_str = request.query_params.get('date')
        if not date_str:
            return Response({"error": "Date is required"}, status=400)
        
        target_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        logs = AttendanceLog.objects.filter(check_in_time__date=target_date)
        
        result = [{
            "id": log.id,
            "student_id": log.student.id if log.student else None,
            "student_name": log.student.name if log.student else "Unknown",
            "class_id": log.course_class.id if log.course_class else None,
            "status": "present" if log.method == 'Kiosk' or log.method == 'Manual' else "absent",
            "check_in_time": log.check_in_time
        } for log in logs]
        
        return Response(result)

    def post(self, request):
        # 수동 출결 처리 등
        student_id = request.data.get('student_id')
        class_id = request.data.get('class_id')
        action = request.data.get('action') # 'present', 'absent', 'reset'
        
        student = StudentMaster.objects.get(id=student_id)
        course_class = CourseClass.objects.get(id=class_id)
        
        if action == 'reset':
            AttendanceLog.objects.filter(student=student, course_class=course_class, check_in_time__date=timezone.now().date()).delete()
            return Response({"message": "Reset successful"})
            
        log, created = AttendanceLog.objects.update_or_create(
            student=student,
            course_class=course_class,
            check_in_time__date=timezone.now().date(),
            defaults={'method': 'Manual'}
        )
        return Response({"message": "Updated successful"})

class KioskLookupView(APIView):
    """키오스크에서 전화번호로 학생 및 오늘 수업 조회"""
    def post(self, request):
        phone = request.data.get('phone') # '01012345678'
        # 뒷자리 4자리 검색 가능하도록 처리
        students = StudentMaster.objects.filter(phone_parent__contains=phone[-4:]) | \
                   StudentMaster.objects.filter(phone_user__contains=phone[-4:])
        
        if not students.exists():
            return Response({"error": "Student not found"}, status=404)
            
        # 오늘 요일 확인
        today_day = timezone.now().strftime('%A') # e.g. 'Monday'
        
        result = []
        for student in students:
            # 해당 학생의 오늘 수업 찾기
            enrollments = Enrollment.objects.filter(student=student, course_class__day_of_week__icontains=today_day)
            classes = [{
                "classId": e.course_class.id,
                "className": e.course_class.subject_name,
                "time": e.course_class.start_time.strftime('%H:%M')
            } for e in enrollments]
            
            result.append({
                "studentId": student.id,
                "studentName": student.name,
                "classes": classes
            })
            
        return Response(result)
