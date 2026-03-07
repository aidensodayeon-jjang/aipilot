import os
import csv
import django
from datetime import datetime

# Django 환경 설정
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.local')
django.setup()

from api.models import StudentMaster, CourseClass, Enrollment

DAY_MAP = {
    '월요일': 'Monday',
    '화요일': 'Tuesday',
    '수요일': 'Wednesday',
    '목요일': 'Thursday',
    '금요일': 'Friday',
    '토요일': 'Saturday',
    '일요일': 'Sunday',
}

def fix_enrollments(csv_file_path):
    print(f"Re-syncing students from {csv_file_path} to current timetable...")
    
    # 기존 수강 정보 초기화 (정확한 재연결을 위해)
    Enrollment.objects.all().delete()
    print("Cleared existing enrollments.")

    with open(csv_file_path, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        count = 0
        for row in reader:
            student_name = row.get('학생이름', '').strip()
            course_code = row.get('수강과목', '').strip()
            time_info = row.get('수강시간', '').strip()
            
            if not student_name or not time_info or not course_code:
                continue
                
            try:
                # 1. 수강시간 파싱 (예: "목요일 14:30")
                parts = time_info.split(' ')
                if len(parts) < 2: continue
                
                day_kr = parts[0]
                start_time_str = parts[1]
                day_en = DAY_MAP.get(day_kr)
                
                if not day_en: continue
                
                # 2. 현재 화면에 사용 중인 영어 요일 기반의 class_code 생성
                # 과목명에서 괄호 제거 로직 포함 (update_from_root_csv.py와 일치)
                subject_clean = course_code.split('(')[0].strip()
                target_class_code = f"{subject_clean}-{day_en}-{start_time_str}"
                
                # 3. 해당 수업 찾기
                course_class = CourseClass.objects.filter(class_code=target_class_code).first()
                
                # 4. 학생 찾기 및 연결
                student = StudentMaster.objects.filter(name=student_name).first()
                
                if student and course_class:
                    Enrollment.objects.get_or_create(
                        student=student,
                        course_class=course_class
                    )
                    count += 1
                elif not course_class:
                    # 수업을 못 찾은 경우, 혹시 모르니 생성 시도 (강의실은 미지정)
                    new_class, created = CourseClass.objects.get_or_create(
                        class_code=target_class_code,
                        defaults={
                            'subject_name': subject_clean,
                            'day_of_week': day_en,
                            'start_time': datetime.strptime(start_time_str, '%H:%M').time(),
                            'classroom': '미지정'
                        }
                    )
                    Enrollment.objects.get_or_create(student=student, course_class=new_class)
                    count += 1
                    
            except Exception as e:
                pass

    print(f"Sync finished. {count} students successfully linked to the timetable.")

if __name__ == "__main__":
    csv_path = '../edupilot-frontend/src/data/raw_data.csv'
    fix_enrollments(csv_path)
