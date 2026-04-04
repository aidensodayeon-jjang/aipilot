from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.utils import timezone
from ..models import StudentMaster, CourseClass, Enrollment, AttendanceLog, StudentTier, SemesterStatus, MessageLog # MessageLog 추가
from ..utils.message import send_one # send_message 대신 send_one 사용 (기존과 동일)
from ..utils.config import callId 
from datetime import datetime
import json

@api_view(['POST'])
@permission_classes([AllowAny])
def attend_search_v2(request):
    """PIN(전화번호 뒷 4자리)으로 학생 검색 및 최신 정보 반환"""
    pin = request.data.get('pin', '')
    semester = request.data.get('semester', '202509')
    
    if len(pin) < 4:
        return Response({"error": "PIN 4자리를 입력해주세요."}, status=status.HTTP_400_BAD_REQUEST)

    students = StudentMaster.objects.filter(status='재원생')
    matched_students = []
    
    now = timezone.localtime() # localtime 사용
    day_of_week = now.strftime('%A')

    for s in students:
        normalized_phone = "".join(filter(str.isdigit, s.phone_parent))
        if normalized_phone.endswith(pin):
            tier_obj, created = StudentTier.objects.get_or_create(
                student=s, 
                semester=semester,
                defaults={'tier': 'Bronze', 'points': 0}
            )
            
            enrollment = Enrollment.objects.filter(student=s, course_class__day_of_week=day_of_week).first()
            classroom = enrollment.course_class.classroom if enrollment and enrollment.course_class.classroom else "자습실"
            
            matched_students.append({
                "id": str(s.id),
                "name": s.name,
                "pin": pin,
                "tier": tier_obj.tier,
                "points": tier_obj.points,
                "classroom": classroom
            })
            
    if not matched_students:
        return Response({"error": "일치하는 학생이 없습니다."}, status=status.HTTP_404_NOT_FOUND)
        
    return Response(matched_students)

@api_view(['POST'])
@permission_classes([AllowAny])
def kiosk_check_in(request):
    """학생 출석 체크 실행 (기존 시스템과 동일한 메시지/발신번호 로직 적용)"""
    student_id = request.data.get('student_id')
    semester = request.data.get('semester', '202509')
    now = timezone.localtime()
    
    try:
        student = StudentMaster.objects.get(id=student_id)
        
        # 1. 오늘 수업 조회
        day_of_week = now.strftime('%A')
        enrollment = Enrollment.objects.filter(student=student, course_class__day_of_week=day_of_week).first()
        current_class = enrollment.course_class if enrollment else None
        class_name = current_class.subject_name if current_class else "자습/방문"
        check_in_time_str = now.strftime('%H:%M')
        
        # 2. 출석 로그 생성 (중복 방지 로직 포함)
        start_dt = timezone.make_aware(datetime.combine(now.date(), datetime.min.time()))
        end_dt = timezone.make_aware(datetime.combine(now.date(), datetime.max.time()))

        log, created = AttendanceLog.objects.update_or_create(
            student=student,
            course_class=current_class,
            check_in_time__range=(start_dt, end_dt),
            defaults={'check_in_time': now, 'method': 'Kiosk', 'status': 'present'}
        )
        
        # 3. 포인트 적립 및 티어 갱신
        tier_obj, _ = StudentTier.objects.get_or_create(
            student=student, 
            semester=semester,
            defaults={'tier': 'Bronze', 'points': 0}
        )
        tier_obj.points += 100
        if tier_obj.points >= 3000: tier_obj.tier = "Gold"
        elif tier_obj.points >= 1500: tier_obj.tier = "Silver"
        else: tier_obj.tier = "Bronze"
        tier_obj.save()
        
        # 4. 학부모님께 출석 알림 문자 발송 (기존 형식 준수)
        if student.phone_parent:
            sem_status = SemesterStatus.objects.first()
            final_call_id = sem_status.call_id if sem_status and sem_status.call_id else callId
            
            # 기존 메시지 형식 적용
            content = f"[D-LAB] {student.name} 학생이 출석하였습니다. ({check_in_time_str})"
            
            message_data = {
                'message': {
                    'to': student.phone_parent.replace("-", "").strip(),
                    'from': final_call_id.replace("-", "").strip(),
                    'text': content
                }
            }
            
            try:
                # 기존과 동일하게 send_one 사용
                send_one(message_data)
                # 발송 로그 기록
                MessageLog.objects.create(
                    student=student, 
                    sender=final_call_id, 
                    receiver=student.phone_parent, 
                    content=content, 
                    status='success'
                )
                log.notification_sent = True
                log.save()
            except Exception as e:
                print(f"SMS 발송 실패: {e}")

        return Response({
            "success": True,
            "student_name": student.name,
            "points": tier_obj.points,
            "tier": tier_obj.tier,
            "classroom": current_class.classroom if current_class else "1",
            "check_in_time": check_in_time_str
        })
        
    except StudentMaster.DoesNotExist:
        return Response({"error": "학생 정보를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([AllowAny])
def kiosk_search_students(request):
    """기존 키오스크용 학생 검색"""
    phone_suffix = request.data.get('input', '')
    if len(phone_suffix) < 4:
        return Response({"error": "전화번호 4자리를 입력해주세요."}, status=status.HTTP_400_BAD_REQUEST)

    students = StudentMaster.objects.filter(status='재원생')
    data = []
    for s in students:
        normalized_phone = "".join(filter(str.isdigit, s.phone_parent))
        if normalized_phone.endswith(phone_suffix):
            data.append({
                "id": s.id,
                "name": s.name,
                "parent_phone": s.phone_parent
            })
    return Response(data)
