import csv
import io
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from ..models import StudentMaster, CourseClass, Enrollment, CourseMaster, SemesterStatus

# ... (DAY_MAP 동일) ...

class StudentImportView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({"error": "No file uploaded"}, status=400)

        # 1. 현재 학기 정보 가져오기 (형식: YYMM, 예: 2603)
        current_semester_obj = SemesterStatus.objects.first()
        if current_semester_obj:
            current_semester = current_semester_obj.current_semester
        else:
            # DB에 설정이 없으면 현재 날짜 기준 생성 (2026-03-07 -> 2603)
            current_semester = datetime.now().strftime('%y%m') 

        decoded_file = file.read().decode('utf-8')
        io_string = io.StringIO(decoded_file)
        reader = csv.DictReader(io_string)
        
        success_count = 0
        for row in reader:
            name = (row.get('학생이름') or row.get('\ufeff학생이름') or '').strip()
            phone_parent = row.get('학부모 연락처', '').strip()
            if not name: continue

            # 2. 학생 정보 DB화 (StudentMaster)
            student, created = StudentMaster.objects.update_or_create(
                name=name,
                phone_parent=phone_parent,
                defaults={
                    'school': row.get('학교', ''),
                    'grade': row.get('학년', ''),
                    'status': '재원생',
                    'master_id': row.get('타임스탬프', datetime.now().strftime('%Y%m%d%H%M%S')) + name
                }
            )
            
            # 3. 수강 정보 및 과정 등록 (CourseMaster)
            course_raw = row.get('수강과목', '').strip()
            time_info = row.get('수강시간', '').strip()
            
            if course_raw:
                # CourseMaster에 현재 학기(2603) 및 과정 구분(정규) 등록
                CourseMaster.objects.update_or_create(
                    userid=student,
                    term=current_semester,
                    course=course_raw,
                    defaults={
                        'subject': course_raw,
                        'phone_parent': phone_parent,
                        'time': time_info,
                        'openlab': '정규', # 과정을 '정규'로 명시
                        'pay': '결제완료' if row.get('수강료결제') == '결제완료' else '미결제'
                    }
                )

                # 4. 시간표(Enrollment) 연결
                if time_info:
                    try:
                        parts = time_info.split(' ')
                        if len(parts) >= 2:
                            day_kr = parts[0]
                            time_str = parts[1]
                            day_en = DAY_MAP.get(day_kr)
                            
                            if day_en:
                                subject_clean = course_raw.split('(')[0].strip()
                                course_class = CourseClass.objects.filter(
                                    subject_name__icontains=subject_clean,
                                    day_of_week=day_en
                                ).filter(start_time__icontains=time_str).first()
                                
                                if not course_class:
                                    course_class = CourseClass.objects.filter(
                                        subject_name__icontains=subject_clean,
                                        day_of_week=day_en
                                    ).first()

                                if course_class:
                                    Enrollment.objects.get_or_create(student=student, course_class=course_class)
                    except Exception as e:
                        print(f"Enrollment matching error for {name}: {e}")
            
            success_count += 1

        return Response({"message": f"{success_count}명의 학생 정보 및 {current_semester} 학기 수강 기록이 반영되었습니다."})

class TimetableImportView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({"error": "No file uploaded"}, status=400)

        decoded_file = file.read().decode('utf-8')
        io_string = io.StringIO(decoded_file)
        reader = list(csv.reader(io_string))
        
        current_day = 'Saturday'
        rooms = ['1', '2', '3', '4', '5', '6', '7', 'MS']
        update_count = 0

        for i, row in enumerate(reader):
            if not row: continue
            first_cell = row[0].strip().upper()
            if first_cell in DAY_MAP:
                current_day = DAY_MAP[first_cell]
                continue
            
            # 시간 파싱
            time_match = re.search(r'(\d{1,2}:\d{2})', row[0])
            if time_match:
                start_time = time_match.group(1)
                if len(start_time.split(':')[0]) == 1: start_time = '0' + start_time
                
                for idx, room_key in enumerate(rooms):
                    col_idx = idx + 1
                    if col_idx < len(row):
                        subject_raw = row[col_idx].strip()
                        if subject_raw and not any(x in subject_raw for x in ['인원', '연구원', '강의실']):
                            subject_name = subject_raw.split('(')[0].strip()
                            teacher = reader[i+2][col_idx].strip() if i+2 < len(reader) else ""
                            
                            CourseClass.objects.update_or_create(
                                class_code=f"{subject_name}-{current_day}-{start_time}",
                                defaults={
                                    'subject_name': subject_name,
                                    'day_of_week': current_day,
                                    'start_time': datetime.strptime(start_time, '%H:%M').time(),
                                    'teacher_name': teacher,
                                    'classroom': room_key
                                }
                            )
                            update_count += 1
        
        return Response({"message": f"{update_count}개의 수업 정보가 업데이트되었습니다."})

import re # re 임포트 누락 방지
