from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.utils import timezone
from ..models import StudentMaster, CourseClass, Enrollment, AttendanceLog
from datetime import datetime
import json

@api_view(['POST'])
@permission_classes([AllowAny])
def kiosk_search_students(request):
    """학부모 전화번호 뒷 4자리로 학생 검색"""
    phone_suffix = request.data.get('input', '')
    if len(phone_suffix) < 4:
        return Response({"error": "전화번호 4자리를 입력해주세요."}, status=status.HTTP_400_BAD_REQUEST)

    # phone_parent 필드가 문자열이므로 끝자리가 일치하는 학생들을 찾음
    # [중요] '재원생' 상태인 학생만 검색하여 중복 노출(미처리 상태 등) 방지
    students = StudentMaster.objects.filter(status='재원생')
    
    # 검색된 학생 목록 반환
    data = []
    for s in students:
        # DB에 저장된 전화번호에서 숫자만 추출하여 뒷 4자리 비교
        normalized_phone = "".join(filter(str.isdigit, s.phone_parent))
        if normalized_phone.endswith(phone_suffix):
            data.append({
                "id": s.id,
                "name": s.name,
                "parent_phone": s.phone_parent
            })
    
    return Response(data)

@api_view(['POST'])
@permission_classes([AllowAny])
def kiosk_check_in(request):
    """학생 출석 체크 실행"""
    student_id = request.data.get('student_id')
    now = timezone.now()
    
    # 요일 이름 매핑 (Monday, Tuesday, ...)
    day_of_week = now.strftime('%A')
    
    try:
        student = StudentMaster.objects.get(id=student_id)
        
        # 해당 학생이 오늘 수강하는 수업 찾기
        enrollments = Enrollment.objects.filter(
            student=student,
            course_class__day_of_week=day_of_week
        ).select_related('course_class')
        
        current_class = None
        if enrollments.exists():
            # 여러 개일 경우 현재 시간과 가장 가까운 수업을 선택하거나 첫 번째 수업 선택
            current_class = enrollments.first().course_class
            
        # 출석 로그 생성
        log = AttendanceLog.objects.create(
            student=student,
            course_class=current_class,
            check_in_time=now,
            method='Kiosk',
            status='present'
        )
        
        return Response({
            "success": True,
            "log_id": log.id,
            "student_name": student.name,
            "class_name": current_class.subject_name if current_class else "자습/방문",
            "check_in_time": now.strftime('%H:%M')
        })
        
    except StudentMaster.DoesNotExist:
        return Response({"error": "학생 정보를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
