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

def import_data(csv_file_path):
    print(f"Starting import from {csv_file_path}...")
    
    # 기존 데이터 삭제 (중복 방지 및 최신화)
    print("Clearing existing enrollment and course class data...")
    Enrollment.objects.all().delete()
    CourseClass.objects.all().delete()
    
    with open(csv_file_path, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        count = 0
        for row in reader:
            student_name = row.get('학생이름', '').strip()
            course_code = row.get('수강과목', '').strip()
            time_info = row.get('수강시간', '').strip()
            teacher = row.get('담당', '').strip()
            
            if not student_name or not time_info or not course_code:
                continue
                
            try:
                # 1. 수강시간 파싱 (예: "목요일 14:30")
                parts = time_info.split(' ')
                if len(parts) < 2:
                    continue
                
                day_kr = parts[0]
                start_time_str = parts[1]
                day_en = DAY_MAP.get(day_kr)
                
                if not day_en:
                    continue
                
                # 2. 수업(CourseClass) 생성 또는 가져오기
                # class_code는 과목코드와 시간을 조합하여 유니크하게 생성
                class_code = f"{course_code}-{day_kr}-{start_time_str}"
                
                course_class, created = CourseClass.objects.get_or_create(
                    class_code=class_code,
                    defaults={
                        'subject_name': course_code,
                        'day_of_week': day_en,
                        'start_time': datetime.strptime(start_time_str, '%H:%M').time(),
                        'teacher_name': teacher,
                        'classroom': "미지정"
                    }
                )
                
                # 3. 학생(StudentMaster) 찾기
                # 이름으로 검색 (중복 이름 주의가 필요하지만 일단 단순 구현)
                student = StudentMaster.objects.filter(name=student_name).first()
                
                if student:
                    # 4. 수강 등록(Enrollment) 생성
                    Enrollment.objects.get_or_create(
                        student=student,
                        course_class=course_class
                    )
                    count += 1
                else:
                    print(f"Warning: Student '{student_name}' not found in DB.")
                    
            except Exception as e:
                print(f"Error processing row {student_name}: {e}")

    print(f"Import finished. {count} enrollments processed.")

if __name__ == "__main__":
    csv_path = '../edupilot-frontend/src/data/raw_data.csv'
    import_data(csv_path)
