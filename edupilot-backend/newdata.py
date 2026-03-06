import csv
import json
import re
from datetime import datetime

# 날짜 포맷 정제 함수
def clean_date(raw_date):
    # print(raw_date)
    raw_date = raw_date.strip().replace(".", "-").replace(" ", "")
    if raw_date.endswith("-"):
        return datetime.strptime(raw_date, "%Y-%m-%d-").date().isoformat()
    try:
        return datetime.strptime(raw_date, "%Y-%m-%d").date().isoformat()
    except ValueError:
        return raw_date

# 1. db.json 읽어서 master_id → id 매핑
with open("db.json", encoding="utf-8") as f:
    db_data = json.load(f)

existing_students = {}  # id → fields
indexed_students = []   # 비교용 리스트

max_id = 0
for entry in db_data:
    if entry["model"] == "api.studentmaster":
        student_id = entry["pk"]
        fields = entry["fields"]
        max_id = max(max_id, student_id)

        # 일치 판단을 위해 이름과 연락처를 기록
        indexed_students.append({
            "id": student_id,
            "name": fields.get("name", "").strip(),
            "phone_parent": fields.get("phone_parent", ""),
            "phone_user": fields.get("phone_user", ""),
            "master_id": fields.get("master_id", "").strip()
        })

next_student_id = max_id + 1
student_csv_ids = {}
student_fixtures = []

with open("StudentMaster.csv", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        master_id = row["ID"].strip()
        name = row.get("학생이름", "").strip()
        phone_parent = row.get("학부모 연락처", "")
        phone_user = row.get("학생 연락처", "")

        matched = None
        for existing in existing_students:
            if (
                    existing["name"] == name and (
                    existing["phone_parent"] == phone_parent or
                    existing["phone_user"] == phone_user
            )
            ):
                matched = existing
                break

        if matched:
            student_id = matched["id"]
        else:
            student_id = next_student_id
            next_student_id += 1

        student_csv_ids[master_id] = student_id

        student_fixtures.append({
            "model": "api.studentmaster",
            "pk": student_id,
            "fields": {
                "master_id": master_id,
                "regdate": clean_date(row.get("등록일", "")),
                "phone_user": row.get("학생 연락처", "").strip(),
                "phone_parent": row.get("학부모 연락처", "").strip(),
                "name_parent": row.get("학부모성함", "").strip(),
                "name": name,
                "gender": row.get("학생 성별", "").strip(),
                "birth": clean_date(row.get("학생 생년월일", "")),
                "school": row.get("학교", "").strip(),
                "grade": row.get("학년", "").strip(),
                "input_path": row.get("유입경로", "").strip(),
                "status": row.get("등록구분", "").strip(),
                "memo": row.get("상담상태", "").strip(),
                "counsel": row.get("상담비고", "").strip(),
                "opt_out": row.get("수신거부", "").strip()
            }
        })


course_fixtures = []
next_course_id = 1

with open("CourseMaster.csv", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        master_id = row["ID"].strip()
        student_id = student_csv_ids.get(master_id)
        if not student_id:
            continue  # 누락된 학생이면 건너뜀

        course_fixtures.append({
            "model": "api.coursemaster",
            "pk": next_course_id,
            "fields": {
                "userid": student_id,
                "term": row.get("학기구분", "").strip(),
                "course": row.get("과정구분", "").strip(),
                "phone_parent": row.get("학부모 연락처", "").strip(),
                "subject": row.get("수강과목", "").strip(),
                "time": row.get("수강시간", "").strip(),
                "openlab": row.get("OpenLab", "").strip(),
                "pay": row.get("결제정보", "").strip(),
                "memo": row.get("메모", "").strip()
            }
        })
        next_course_id += 1

# 4. JSON 파일로 저장
with open("studentmaster.json", "w", encoding="utf-8") as f:
    json.dump(student_fixtures, f, ensure_ascii=False, indent=2)

with open("coursemaster.json", "w", encoding="utf-8") as f:
    json.dump(course_fixtures, f, ensure_ascii=False, indent=2)
