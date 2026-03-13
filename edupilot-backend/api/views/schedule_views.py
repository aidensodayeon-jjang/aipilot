from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import datetime
from ..models import StudentMaster, CourseClass, Enrollment, AttendanceLog, MessageLog, SemesterStatus
from django.db.models import Prefetch
from api.utils.message import send_one
from api.utils.config import callId

class ScheduleStructureView(APIView):
    """전체 시간표 구조 및 수업 정보를 반환"""
    def get(self, request):
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
                time_val = c.start_time
                time_key = time_val.strftime('%H:%M') if hasattr(time_val, 'strftime') else str(time_val)[:5]

                if time_key not in slots:
                    slots[time_key] = {"time": time_key, "rooms": {}}
                
                slots[time_key]["rooms"][str(c.classroom)] = {
                    "classId": c.id,
                    "className": c.subject_name,
                    "instructor": c.teacher_name,
                    "students": [{"id": e.student.id, "name": e.student.name, "phone": e.student.phone_parent} for e in c.enrolled_students.all()]
                }
            
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
            "status": log.status,
            "check_in_time": log.check_in_time
        } for log in logs]
        
        return Response(result)

    def post(self, request):
        student_id = request.data.get('student_id')
        class_id = request.data.get('class_id')
        action = request.data.get('action')
        date_str = request.data.get('date') or timezone.now().strftime('%Y-%m-%d')
        target_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        
        try:
            student = StudentMaster.objects.get(id=student_id)
            course_class = CourseClass.objects.get(id=class_id)
            
            if action == 'reset':
                AttendanceLog.objects.filter(student=student, course_class=course_class, check_in_time__date=target_date).delete()
                return Response({"message": "Reset successful"})
                
            status_val = 'present' if action == 'present' else 'absent'
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
    permission_classes = []
    
    def post(self, request):
        input_val = request.data.get('input', '')
        if not input_val or len(input_val) < 4:
            return Response({"error": "전화번호 4자리를 입력해주세요."}, status=status.HTTP_400_BAD_REQUEST)
            
        base_query = StudentMaster.objects.filter(status='재원생')
        students = base_query.filter(phone_parent__endswith=input_val) | \
                   base_query.filter(phone_user__endswith=input_val)
        
        if not students.exists():
            return Response({"error": "학생을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)
            
        now = timezone.now()
        day_of_week = now.strftime('%A')
            
        result = []
        for s in students.distinct():
            has_today_class = Enrollment.objects.filter(
                student=s, 
                course_class__day_of_week=day_of_week
            ).exists()
            
            result.append({
                "id": s.id,
                "name": s.name,
                "phone_parent": s.phone_parent,
                "has_today_class": has_today_class
            })
            
        return Response(result)

class KioskCheckInView(APIView):
    """키오스크에서 학생 출석 체크 실행"""
    permission_classes = []
    
    def post(self, request):
        student_id = request.data.get('student_id')
        now = timezone.now()
        day_of_week = now.strftime('%A')
        
        try:
            student = StudentMaster.objects.get(id=student_id)
            enrollments = Enrollment.objects.filter(student=student, course_class__day_of_week=day_of_week).select_related('course_class')
            
            current_class = enrollments.first().course_class if enrollments.exists() else None
            class_name = current_class.subject_name if current_class else "자습/방문"
            check_in_time_str = now.strftime('%H:%M')

            log, created = AttendanceLog.objects.get_or_create(
                student=student,
                course_class=current_class,
                check_in_time__date=now.date(),
                defaults={'check_in_time': now, 'method': 'Kiosk', 'status': 'present'}
            )

            if student.phone_parent:
                # DB에서 발신번호(call_id) 동적 로드
                sem_status = SemesterStatus.objects.first()
                final_call_id = sem_status.call_id if sem_status and sem_status.call_id else callId
                
                content = f"[D-LAB] {student.name} 학생이 출석하였습니다. ({check_in_time_str})"
                message_data = {
                    'message': {
                        'to': student.phone_parent.replace("-", "").strip(),
                        'from': final_call_id.replace("-", "").strip(),
                        'text': content
                    }
                }
                try:
                    send_one(message_data)
                    MessageLog.objects.create(student=student, sender=final_call_id, receiver=student.phone_parent, content=content, status='success')
                except: pass
            
            return Response({"success": True, "class_name": class_name, "check_in_time": check_in_time_str})
        except Exception as e:
            return Response({"error": str(e)}, status=500)
