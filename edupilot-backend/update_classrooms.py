import os
import csv
import django
import re
from datetime import datetime

# Django 환경 설정
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.local')
django.setup()

from api.models import CourseClass

DAY_MAP = {
    'MON': 'Monday', 'TUE': 'Tuesday', 'WED': 'Wednesday',
    'THU': 'Thursday', 'FRI': 'Friday', 'SAT': 'Saturday', 'SUN': 'Sunday'
}

def parse_time(time_str):
    # "9:00 ~11:00" -> "09:00"
    match = re.search(r'(\d{1,2}:\d{2})', time_str)
    if match:
        t = match.group(1)
        if len(t.split(':')[0]) == 1:
            t = '0' + t
        return t
    return None

def update_classroom_data(csv_file_path):
    print(f"Starting classroom update from {csv_file_path}...")
    
    current_day = None
    rooms = ['1', '2', '3', '4', '5', '6', '7', 'MS']
    
    with open(csv_file_path, mode='r', encoding='utf-8') as f:
        reader = list(csv.reader(f))
        
        for i, row in enumerate(reader):
            if not row: continue
            
            # 1. 요일 확인 (행의 처음에 SAT, SUN 등이 있는 경우)
            first_cell = row[0].strip().upper()
            if first_cell in DAY_MAP:
                current_day = DAY_MAP[first_cell]
                print(f"Processing day: {current_day}")
                continue
            
            if not current_day: continue
            
            # 2. 시간대 행 찾기 (예: "9:00 ~11:00")
            start_time = parse_time(row[0])
            if start_time:
                # 다음 두 행은 '현재인원', '담당연구원'일 확률이 높음
                # 현재 행에서 수업명 추출 (1번 인덱스부터 rooms 순서대로)
                for idx, room_name in enumerate(rooms):
                    col_idx = idx + 1 # 0번 컬럼은 시간이므로
                    if col_idx < len(row):
                        subject_raw = row[col_idx].strip()
                        if subject_raw and not subject_raw.startswith('현재인원') and not subject_raw.startswith('담당연구원'):
                            # 괄호 등 군더더기 제거 (예: "DM-AICE-2(미정)" -> "DM-AICE-2")
                            subject_name = subject_raw.split('(')[0].strip()
                            
                            # 담당자 정보 찾기 (아래 2번째 행)
                            teacher = ""
                            if i + 2 < len(reader):
                                teacher = reader[i+2][col_idx].strip()
                            
                            # DB 업데이트 또는 생성
                            class_code = f"{subject_name}-{current_day}-{start_time}"
                            
                            # 기존에 import_timetable.py에서 만든 데이터가 있을 수 있으므로 매칭 시도
                            # 없으면 새로 생성
                            obj, created = CourseClass.objects.update_or_create(
                                class_code=class_code,
                                defaults={
                                    'subject_name': subject_name,
                                    'day_of_week': current_day,
                                    'start_time': datetime.strptime(start_time, '%H:%M').time(),
                                    'teacher_name': teacher,
                                    'classroom': f"{room_name} 강의실"
                                }
                            )
                            status = "Created" if created else "Updated"
                            # print(f"[{status}] {current_day} {start_time} {room_name}R: {subject_name}")

    print("Classroom update finished.")

if __name__ == "__main__":
    # 파일 경로 (공백 처리 주의)
    csv_path = "/Users/aiden/Desktop/프로젝트/timetable/참고자료/DLAB_목동_2512등록학생관리(소다연) - 1.시간표.csv"
    update_classroom_data(csv_path)
