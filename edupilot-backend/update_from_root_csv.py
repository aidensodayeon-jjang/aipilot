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
    'THU': 'Thursday', 'FRI': 'Friday', 'SAT': 'Saturday', 'SUN': 'Sunday',
    '월요일': 'Monday', '화요일': 'Tuesday', '수요일': 'Wednesday',
    '목요일': 'Thursday', '금요일': 'Friday', '토요일': 'Saturday', '일요일': 'Sunday'
}

def parse_time(time_str):
    match = re.search(r'(\d{1,2}:\d{2})', time_str)
    if match:
        t = match.group(1)
        if len(t.split(':')[0]) == 1:
            t = '0' + t
        return t
    return None

def update_classroom_data(csv_file_path):
    print(f"Starting final classroom update from {csv_file_path}...")
    
    # 첫 섹션에 요일이 없는 경우를 대비해 기본값 설정 (현재 맥락상 토요일)
    current_day = 'Saturday' 
    rooms = ['1', '2', '3', '4', '5', '6', '7', 'MS']
    
    with open(csv_file_path, mode='r', encoding='utf-8') as f:
        reader = list(csv.reader(f))
        
        for i, row in enumerate(reader):
            if not row: continue
            
            # 1. 요일 확인
            first_cell = row[0].strip().upper()
            if first_cell in DAY_MAP:
                current_day = DAY_MAP[first_cell]
                print(f"Switched to day: {current_day}")
                continue
            
            # 2. 시간대 행 찾기
            start_time = parse_time(row[0])
            if start_time:
                for idx, room_key in enumerate(rooms):
                    col_idx = idx + 1
                    if col_idx < len(row):
                        subject_raw = row[col_idx].strip()
                        # '현재인원', '담당연구원' 행을 건너뛰기 위한 필터링
                        if subject_raw and not any(x in subject_raw for x in ['인원', '연구원', '강의실']):
                            subject_name = subject_raw.split('(')[0].strip()
                            
                            # 담당자 정보 찾기 (아래 2번째 행)
                            teacher = ""
                            if i + 2 < len(reader) and col_idx < len(reader[i+2]):
                                t_val = reader[i+2][col_idx].strip()
                                if t_val and not t_val.startswith('담당'):
                                    teacher = t_val
                            
                            class_code = f"{subject_name}-{current_day}-{start_time}"
                            classroom_display = f"{room_key}" # 프론트엔드 ROOM_IDS ['1','2',...] 와 매칭
                            
                            obj, created = CourseClass.objects.update_or_create(
                                class_code=class_code,
                                defaults={
                                    'subject_name': subject_name,
                                    'day_of_week': current_day,
                                    'start_time': datetime.strptime(start_time, '%H:%M').time(),
                                    'teacher_name': teacher,
                                    'classroom': classroom_display
                                }
                            )
                            # print(f"[{'Created' if created else 'Updated'}] {current_day} {start_time} Room {classroom_display}: {subject_name}")

    print("Final update finished.")

if __name__ == "__main__":
    csv_path = "/Users/aiden/Desktop/프로젝트/aipilot-main/1.csv"
    update_classroom_data(csv_path)
