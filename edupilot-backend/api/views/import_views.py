import csv
import io
import re
from datetime import datetime
from django.db import transaction
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from ..models import StudentMaster, CourseClass, Enrollment, CourseMaster, SemesterStatus

class StudentImportView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        try:
            file = request.FILES.get('file')
            if not file:
                return Response({"error": "No file uploaded"}, status=400)

            current_semester_obj = SemesterStatus.objects.first()
            current_semester = current_semester_obj.current_semester if current_semester_obj else datetime.now().strftime('%y%m')

            try:
                content = file.read()
                try:
                    decoded_file = content.decode('utf-8-sig')
                except UnicodeDecodeError:
                    decoded_file = content.decode('cp949')
            except Exception as e:
                return Response({"error": f"파일 인코딩 오류: {str(e)}"}, status=400)

            io_string = io.StringIO(decoded_file)
            # DictReader 대신 일반 reader를 사용하여 첫 번째 열에 접근하기 쉽게 함
            raw_reader = csv.reader(io_string)
            header_row = next(raw_reader, None)
            
            if not header_row:
                return Response({"error": "CSV 파일에 데이터가 없습니다."}, status=400)

            # 데이터 행들을 리스트로 변환
            rows = list(raw_reader)
            
            # 헤더 이름 정규화 (DictReader처럼 사용하기 위해)
            headers_map = {re.sub(r'\s+', '', h): i for i, h in enumerate(header_row) if h}
            
            def get_row_val(row_data, *keys):
                for k in keys:
                    norm_k = re.sub(r'\s+', '', k)
                    if norm_k in headers_map:
                        idx = headers_map[norm_k]
                        if idx < len(row_data):
                            return row_data[idx].strip()
                return ''

            success_count = 0
            new_count = 0
            total_revenue = 0 # ✅ 매출액 합계용
            total_unpaid = 0  # ✅ 미결제 총액용
            
            with transaction.atomic():
                # 1. 기존 재원생을 미처리로 변경 (학기 전환 대비)
                StudentMaster.objects.filter(status='재원생').update(status='미처리')
                
                # 2. 이번 학기의 기존 수강 기록 삭제 (중복 방지)
                CourseMaster.objects.filter(term=current_semester).delete()

                for row in rows:
                    if not row: continue

                    # 매출액 계산 (결제금액 + 키트결제)
                    payment_val = get_row_val(row, '결제금액', '금액')
                    kit_val = get_row_val(row, '키트결제', '키트')
                    
                    try:
                        p_amt = int(re.sub(r'[^\d]', '', payment_val)) if payment_val else 0
                        k_amt = int(re.sub(r'[^\d]', '', kit_val)) if kit_val else 0
                        current_row_total = p_amt + k_amt
                        total_revenue += current_row_total
                        
                        # 결제 상태 확인 후 미결제 총액 합산
                        pay_status_tmp = get_row_val(row, '수강료결제', '결제상태', '결제여부', '결제')
                        if pay_status_tmp == '미결제':
                            total_unpaid += current_row_total
                    except ValueError:
                        pass

                    # 첫 번째 열(index 0)의 값을 직접 확인 (신규/얼리버드/결제선생 컬럼)
                    first_col_val = row[0] if len(row) > 0 else ""
                    is_new_in_csv = "신규" in first_col_val

                    name = get_row_val(row, '학생이름', '이름', '학생명단')
                    phone_parent = get_row_val(row, '학부모연락처', '연락처', '학부모 연락처', '전화번호', '부모연락처')
                    school = get_row_val(row, '학교')
                    grade = get_row_val(row, '학년')
                    
                    if not name: continue
                    
                    # (이하 중복 체크 및 등록 로직 동일)
                    student = None
                    is_new_student = False

                    if phone_parent:
                        student = StudentMaster.objects.filter(name=name, phone_parent=phone_parent).first()

                    if not student and school and grade:
                        student = StudentMaster.objects.filter(name=name, school=school, grade=grade).first()

                    if student:
                        student.status = '재원생'
                        if phone_parent: student.phone_parent = phone_parent
                        # CSV에 '신규' 표시가 있으면 해당 학기 신규 태그 추가
                        if is_new_in_csv:
                            current_memo = student.memo or ""
                            term_tag = f"[신규등록-{current_semester}]"
                            if term_tag not in current_memo:
                                student.memo = f"{current_memo} {term_tag}".strip()
                        student.save()
                    else:
                        is_new_student = True
                        duplicates = StudentMaster.objects.filter(name=name).exclude(status='재원생')
                        
                        # master_id 생성 로직 개선 (중복 방지 강화)
                        base_id = phone_parent if phone_parent and len(phone_parent) > 5 else name
                        target_id = base_id
                        counter = 1
                        while StudentMaster.objects.filter(master_id=target_id).exists():
                            target_id = f"{base_id}-{counter}"
                            counter += 1
                        
                        student = StudentMaster.objects.create(
                            name=name, phone_parent=phone_parent, school=school, grade=grade,
                            status='재원생', master_id=target_id,
                            regdate=datetime.now().strftime('%Y-%m-%d'),
                            memo=f"[신규등록-{current_semester}]"
                        )
                        if duplicates.exists(): duplicates.update(status='확인필요')

                    if is_new_in_csv or is_new_student:
                        new_count += 1

                    course_raw = get_row_val(row, '수강과목', '과목', '수강과정')
                    time_info = get_row_val(row, '수강시간', '시간', '수업시간')
                    pay_status = get_row_val(row, '수강료결제', '결제상태', '결제여부', '결제')
                    if not pay_status: pay_status = '결제완료' # 기본값

                    if course_raw:
                        CourseMaster.objects.create(
                            userid=student, term=current_semester, course='정규과정',
                            subject=course_raw, phone_parent=student.phone_parent,
                            time=time_info, openlab='정규', pay=pay_status
                        )
                    success_count += 1

                # 3. 신규 인원수 및 총 매출액을 SemesterStatus에 영구 저장
                if current_semester_obj:
                    current_semester_obj.new_count = new_count
                    current_semester_obj.total_revenue = total_revenue
                    current_semester_obj.unpaid_amount = total_unpaid
                    current_semester_obj.save()
                else:
                    SemesterStatus.objects.create(
                        current_semester=current_semester,
                        new_count=new_count,
                        total_revenue=total_revenue,
                        unpaid_amount=total_unpaid
                    )

            return Response({
                "message": f"데이터 처리가 완료되었습니다. (총 {success_count}명, 신규 {new_count}명, 매출액 {total_revenue:,}원, 미결제 {total_unpaid:,}원)",
                "success_count": success_count,
                "new_count": new_count,
                "total_revenue": total_revenue,
                "unpaid_amount": total_unpaid
            })

        except Exception as e:
            import traceback
            print("❌ [IMPORT ERROR]")
            traceback.print_exc()
            return Response({"error": str(e)}, status=500)

class TimetableImportView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        try:
            file = request.FILES.get('file')
            if not file: return Response({"error": "No file uploaded"}, status=400)

            try:
                content = file.read()
                try:
                    decoded_file = content.decode('utf-8-sig')
                except UnicodeDecodeError:
                    decoded_file = content.decode('cp949')
            except Exception as e: return Response({"error": f"Encoding error: {str(e)}"}, status=400)

            io_string = io.StringIO(decoded_file)
            reader = csv.reader(io_string)
            rows = list(reader)

            # 현재 학기 정보 가져오기
            current_semester_obj = SemesterStatus.objects.first()
            current_semester = current_semester_obj.current_semester if current_semester_obj else datetime.now().strftime('%y%m')

            success_count = 0
            current_day = "SAT" # 기본값 (첫 섹션)
            
            with transaction.atomic():
                # 기존 CourseClass를 삭제하지 않고, 현재 학기의 Enrollment만 초기화하여 
                # 과거 출석 로그와 CourseClass 간의 연결(Foreign Key)을 보존합니다.
                Enrollment.objects.filter(course_class__class_code__startswith=current_semester).delete()

                for i, row in enumerate(rows):
                    if not row or not any(row): continue
                    
                    # 1. 요일 감지 (TUE, WED, THU, FRI, SAT, SUN 등)
                    first_cell = row[0].strip().upper()
                    if first_cell in ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']:
                        current_day = first_cell[:3]
                        continue

                    # 2. 시간대 행 감지 (예: 9:00 ~ 11:00)
                    if '~' in row[0]:
                        time_range = row[0].strip()
                        # '9:00 ~ 11:00' -> '09:00'
                        try:
                            start_time_str = time_range.split('~')[0].strip()
                            if ':' in start_time_str:
                                h, m = start_time_str.split(':')
                                start_time_obj = f"{int(h):02d}:{int(m):02d}"
                            else:
                                start_time_obj = "09:00"
                        except:
                            start_time_obj = "09:00"

                        # 과목명 행
                        for col_idx in range(1, len(row)):
                            subject = row[col_idx].strip()
                            if subject and subject not in ['1','2','3','4','5','6','7','8','MS']:
                                room = str(col_idx)
                                
                                teacher = ""
                                if i + 2 < len(rows):
                                    if "담당연구원" in rows[i+2][0] or "선생님" in rows[i+2][0]:
                                        teacher = rows[i+2][col_idx].strip()

                                # 요일 변환 (SAT -> Saturday)
                                day_map_full = {
                                    'MON': 'Monday', 'TUE': 'Tuesday', 'WED': 'Wednesday',
                                    'THU': 'Thursday', 'FRI': 'Friday', 'SAT': 'Saturday', 'SUN': 'Sunday'
                                }
                                full_day = day_map_full.get(current_day, 'Saturday')

                                # 1. 수업 생성
                                # 중복 방지를 위해 class_code 생성 (학기-요일-방-시간)
                                class_code = f"{current_semester}-{current_day}-{room}-{start_time_obj.replace(':','')}"
                                
                                course_class, created = CourseClass.objects.update_or_create(
                                    class_code=class_code,
                                    defaults={
                                        'subject_name': subject,
                                        'day_of_week': full_day,
                                        'start_time': start_time_obj,
                                        'teacher_name': teacher,
                                        'classroom': room,
                                    }
                                )
                                
                                # 2. 학생 배정 로직 고도화 (Enrollment)
                                Enrollment.objects.filter(course_class=course_class).delete()
                                
                                # 요일 한글 글자 (Monday -> 월)
                                kor_day_char = {'Monday': '월', 'Tuesday': '화', 'Wednesday': '수', 'Thursday': '목', 'Friday': '금', 'Saturday': '토', 'Sunday': '일'}.get(full_day)
                                
                                # 1) '재원생' 상태인 학생만 필터링
                                # 2) 과목명이 포함되어 있고
                                # 3) 수강 시간(time)에 해당 요일과 '시간'이 모두 포함되어야 함 (중복 방지)
                                # 예: subject='DM103-1', time='토요일 11:00'
                                
                                # 과목명에서 핵심 키워드 추출 (예: 'DM103-1(1:1)' -> 'DM103-1')
                                base_subject = subject.split('(')[0].strip()
                                
                                students_in_course = CourseMaster.objects.filter(
                                    userid__status='재원생', # ✅ 재원생 필터
                                    term=current_semester
                                ).filter(
                                    Q(subject__icontains=base_subject)
                                ).filter(
                                    Q(time__icontains=kor_day_char)
                                )
                                
                                for cm in students_in_course:
                                    # 시간까지 체크 (예: '11:00' 이 cm.time에 있는지)
                                    # DB의 start_time_obj는 '09:00' 형태, cm.time은 '토요일 09:00' 형태
                                    target_time = start_time_obj.replace('09:00', '9:00') # 9:00와 09:00 모두 대응
                                    
                                    if start_time_obj in str(cm.time) or target_time in str(cm.time):
                                        Enrollment.objects.get_or_create(
                                            student=cm.userid,
                                            course_class=course_class
                                        )

                                success_count += 1

            return Response({"message": f"{success_count}개의 수업이 시간표에 등록되었습니다."})

        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response({"error": str(e)}, status=500)
