import os
import django

# Django 환경 설정
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.local')
django.setup()

from api.models import CourseClass, Enrollment

def merge_class_data():
    print("Merging student enrollments into classes with room info...")
    
    # 1. 강의실이 지정된 수업들 가져오기
    classes_with_rooms = CourseClass.objects.exclude(classroom='미지정')
    
    merged_count = 0
    for target_class in classes_with_rooms:
        # 2. 동일한 요일, 시간에 강의실이 '미지정'인 수업 찾기 (과목명 유사도 체크)
        duplicate_classes = CourseClass.objects.filter(
            day_of_week=target_class.day_of_week,
            start_time=target_class.start_time,
            classroom='미지정',
            subject_name__icontains=target_class.subject_name[:5] # 앞부분 일부 일치 체크
        )
        
        for dup in duplicate_classes:
            # 3. 중복 수업에 등록된 학생들을 실제 강의실 수업으로 이동
            dup_enrollments = Enrollment.objects.filter(course_class=dup)
            for enrollment in dup_enrollments:
                # 이미 등록되어 있는지 확인 후 이동
                exists = Enrollment.objects.filter(student=enrollment.student, course_class=target_class).exists()
                if not exists:
                    enrollment.course_class = target_class
                    enrollment.save()
                    merged_count += 1
            
            # 4. 학생을 모두 옮겼으면 빈 중복 수업 삭제
            if not Enrollment.objects.filter(course_class=dup).exists():
                dup.delete()

    print(f"Merge finished. {merged_count} students moved to correctly assigned rooms.")

if __name__ == "__main__":
    merge_class_data()
