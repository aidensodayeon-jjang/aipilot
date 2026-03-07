import os
import csv
import django
from datetime import datetime

# Django 환경 설정
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.local')
django.setup()

from api.models import StudentMaster, CourseClass, Enrollment

DAY_MAP = {
    '월요일': 'Monday', '화요일': 'Tuesday', '수요일': 'Wednesday',
    '목요일': 'Thursday', '금요일': 'Friday', '토요일': 'Saturday', '일요일': 'Sunday',
}

def fix_enrollments(csv_file_path):
    print("Re-syncing students with improved logic...")
    Enrollment.objects.all().delete()
    
    with open(csv_file_path, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        count = 0
        for row in reader:
            name = row.get('학생이름', '').strip()
            course = row.get('수강과목', '').strip()
            time_info = row.get('수강시간', '').strip()
            
            if not name or not course or not time_info: continue
            
            try:
                parts = time_info.split(' ')
                if len(parts) < 2: continue
                day_en = DAY_MAP.get(parts[0])
                time_str = parts[1]
                
                if not day_en: continue
                
                # 과목명 정규화 (괄호 제거 등)
                subject_clean = course.split('(')[0].strip()
                
                # 1. 학생 찾기 (이름으로)
                student = StudentMaster.objects.filter(name=name).first()
                if not student:
                    # 학생이 없으면 임시 생성
                    student = StudentMaster.objects.create(
                        name=name, master_id=f"TEMP_{name}_{datetime.now().microsecond}",
                        phone_parent=row.get('학부모 연락처', '')
                    )

                # 2. 수업 찾기 (정확한 매칭을 위해 여러 필드로 시도)
                # 현재 DB에 있는 CourseClass 들 중에서 가장 유사한 것을 찾습니다.
                course_class = CourseClass.objects.filter(
                    subject_name__icontains=subject_clean,
                    day_of_week=day_en,
                    start_time__strftime='%H:%M' if hasattr(CourseClass.objects, 'strftime') else None # 단순 필터
                ).first()
                
                # strftime 대안
                if not course_class:
                    all_classes = CourseClass.objects.filter(subject_name__icontains=subject_clean, day_of_week=day_en)
                    for c in all_classes:
                        if c.start_time.strftime('%H:%M') == time_str:
                            course_class = c
                            break

                if student and course_class:
                    Enrollment.objects.get_or_create(student=student, course_class=course_class)
                    count += 1
            except Exception as e:
                pass

    print(f"Sync finished. {count} students linked.")

if __name__ == "__main__":
    fix_enrollments('../edupilot-frontend/src/data/raw_data.csv')
