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
                    "students": [{"id": e.student.id, "name": e.student.name, "phone": e.student.phone_parent} for e in c.enrolled_students.all()]
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
    permission_classes = [] # AllowAny
    
    def post(self, request):
        input_val = request.data.get('input', '') # 키오스크에서 'input'으로 보냄
        if not input_val or len(input_val) < 4:
            return Response({"error": "전화번호 4자리를 입력해주세요."}, status=status.HTTP_400_BAD_REQUEST)
            
        # 1. 기본적인 전화번호 매칭 (휴원생/퇴원생 제외)
        # '재원생'이거나 status가 비어 있는 경우만 검색 대상으로 한정
        base_query = StudentMaster.objects.exclude(status__in=['휴원생', '퇴원생', '퇴원'])
        
        students = base_query.filter(phone_parent__endswith=input_val) | \
                   base_query.filter(phone_user__endswith=input_val)
        
        if not students.exists():
            return Response({"error": "학생을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)
            
        # 2. 오늘 요일 확인
        now = timezone.now()
        day_of_week = now.strftime('%A')
            
        result = []
        for student in students.distinct():
            # (선택 사항) 오늘 수업이 있는지 여부 확인 (표시 우선순위나 정보 제공용)
            has_today_class = Enrollment.objects.filter(
                student=student, 
                course_class__day_of_week=day_of_week
            ).exists()
            
            # 오늘 수업이 있는 학생 위주로 노출하거나, 수업이 없더라도 '재원생'이면 노출
            result.append({
                "id": student.id,
                "name": student.name,
                "parent_phone": student.phone_parent,
                "has_today_class": has_today_class
            })
            
        return Response(result)

from api.utils.message import send_one
from api.models import StudentMaster, CourseClass, Enrollment, AttendanceLog, MessageLog
from api.utils.config import callId

class KioskCheckInView(APIView):
    """키오스크에서 학생 출석 체크 실행"""
    permission_classes = [] # AllowAny
    
    def post(self, request):
        student_id = request.data.get('student_id')
        now = timezone.now()
        day_of_week = now.strftime('%A') # e.g. 'Monday'
        
        try:
            student = StudentMaster.objects.get(id=student_id)
            
            # 오늘 수업 찾기
            enrollments = Enrollment.objects.filter(
                student=student, 
                course_class__day_of_week=day_of_week
            ).select_related('course_class')
            
            current_class = enrollments.first().course_class if enrollments.exists() else None
            class_name = current_class.subject_name if current_class else "자습/방문"
            check_in_time_str = now.strftime('%H:%M')

            # 1. 출석 로그 생성 (중복 방지: 같은 학생, 같은 날짜)
            log, created = AttendanceLog.objects.get_or_create(
                student=student,
                course_class=current_class,
                check_in_time__date=now.date(),
                defaults={
                    'check_in_time': now,
                    'method': 'Kiosk',
                    'status': 'present'
                }
            )

            # 2. SMS 발송 로직 추가
            if student.phone_parent:
                content = f"[D-LAB] {student.name} 학생이 출석하였습니다. ({check_in_time_str})"
                message_data = {
                    'to': student.phone_parent.replace("-", "").strip(),
                    'from': callId.replace("-", "").strip(),
                    'text': content
                }
                
                try:
                    # 실제 발송
                    send_one(message_data)
                    
                    # 3. 메시지 로그 저장
                    MessageLog.objects.create(
                        student=student,
                        sender=callId,
                        receiver=student.phone_parent,
                        content=content,
                        status='success'
                    )
                except Exception as sms_err:
                    print(f"SMS 발송 실패: {str(sms_err)}")
            
            return Response({
                "success": True,
                "log_id": log.id,
                "student_name": student.name,
                "parent_phone": student.phone_parent,
                "class_name": class_name,
                "check_in_time": check_in_time_str
            })
            
        except StudentMaster.DoesNotExist:
            return Response({"error": "학생 정보를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
