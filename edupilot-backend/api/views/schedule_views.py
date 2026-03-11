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
        # 프론트엔드 키(MON) - DB 저장값(Monday) 매핑
        day_map = {
            'MON': 'Monday', 'TUE': 'Tuesday', 'WED': 'Wednesday',
            'THU': 'Thursday', 'FRI': 'Friday', 'SAT': 'Saturday', 'SUN': 'Sunday'
        }
        structure = {}
        
        for eng, full_name in day_map.items():
            classes = CourseClass.objects.filter(
                day_of_week=full_name
            ).prefetch_related(
                Prefetch('enrolled_students', queryset=Enrollment.objects.select_related('student'))
            )
            
            slots = {}
            for c in classes:
                # 시간 형식 처리 (09:00:00 -> 09:00)
                time_val = c.start_time
                if hasattr(time_val, 'strftime'):
                    time_key = time_val.strftime('%H:%M')
                else:
                    time_key = str(time_val)[:5]

                if time_key not in slots:
                    slots[time_key] = {"time": time_key, "rooms": {}}
                
                slots[time_key]["rooms"][str(c.classroom)] = {
                    "classId": c.id,
                    "className": c.subject_name,
                    "instructor": c.teacher_name,
                    "students": [{"id": e.student.id, "name": e.student.name} for e in c.enrolled_students.all()]
                }
            
            # 시간순 정렬 후 리스트로 변환
            structure[eng] = sorted(slots.values(), key=lambda x: x['time'])
            
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
            "status": log.status, # ✅ 저장된 상태 그대로 반환
            "check_in_time": log.check_in_time
        } for log in logs]
        
        return Response(result)

    def post(self, request):
        student_id = request.data.get('student_id')
        class_id = request.data.get('class_id')
        action = request.data.get('action') # 'present', 'absent', 'reset'
        date_str = request.data.get('date') # ✅ 프론트엔드에서 받은 날짜
        
        if not date_str:
            date_str = timezone.now().strftime('%Y-%m-%d')
            
        target_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        
        try:
            student = StudentMaster.objects.get(id=student_id)
            course_class = CourseClass.objects.get(id=class_id)
            
            if action == 'reset':
                AttendanceLog.objects.filter(student=student, course_class=course_class, check_in_time__date=target_date).delete()
                return Response({"message": "Reset successful"})
                
            # 상태 매핑
            status_val = 'present' if action == 'present' else 'absent'
            
            # 시간까지 포함한 DateTime 생성 (수업 시작 시간 기준)
            check_in_dt = timezone.make_aware(datetime.combine(target_date, course_class.start_time))

            log, created = AttendanceLog.objects.update_or_create(
                student=student,
                course_class=course_class,
                check_in_time__date=target_date,
                defaults={
                    'status': status_val,
                    'method': 'Manual',
                    'check_in_time': check_in_dt
                }
            )
            return Response({"message": "Updated successful", "status": status_val})
        except Exception as e:
            return Response({"error": str(e)}, status=400)

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
