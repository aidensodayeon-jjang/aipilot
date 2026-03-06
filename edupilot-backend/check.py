import json
import re

# 날짜 형식 검증 (yyyy-mm-dd)
def is_valid_date(date_str):
    return bool(re.match(r"\d{4}-\d{2}-\d{2}", date_str.strip()))

# 전화번호 검증 (예: 010-1234-5678 또는 숫자만)
def is_valid_phone(phone_str):
    phone_str = phone_str.strip().replace("-", "")
    return len(phone_str) >= 10 and phone_str.isdigit()

# 불러올 파일들
with open("studentmaster.json", encoding="utf-8") as f:
    students = json.load(f)
with open("coursemaster.json", encoding="utf-8") as f:
    courses = json.load(f)
with open("attend.json", encoding="utf-8") as f:
    attends = json.load(f)
with open("history.json", encoding="utf-8") as f:
    histories = json.load(f)

# 결과 저장
errors = {
    "studentmaster": [],
    "coursemaster": [],
    "attend": [],
    "history": []
}

# 검사 함수
def check_required(fields, required_keys, label):
    missing = {}
    for key in required_keys:
        value = fields.get(key, "").strip() if isinstance(fields.get(key), str) else fields.get(key)
        if not value:
            missing[key] = value
    if missing:
        return missing
    return None

# 1. StudentMaster
for entry in students:
    fields = entry["fields"]
    pk = entry["pk"]
    required = ["name", "master_id", "phone_parent", "regdate"]
    invalid = check_required(fields, required, "studentmaster")

    if not is_valid_phone(fields.get("phone_parent", "")):
        invalid = invalid or {}
        invalid["phone_parent_format"] = fields.get("phone_parent", "")

    if not is_valid_date(fields.get("regdate", "")):
        invalid = invalid or {}
        invalid["regdate_format"] = fields.get("regdate", "")

    if invalid:
        errors["studentmaster"].append({"id": pk, "errors": invalid})

# 2. CourseMaster
for entry in courses:
    fields = entry["fields"]
    pk = entry["pk"]
    required = ["userid", "term", "course", "subject", "phone_parent"]
    invalid = check_required(fields, required, "coursemaster")

    if not is_valid_phone(fields.get("phone_parent", "")):
        invalid = invalid or {}
        invalid["phone_parent_format"] = fields.get("phone_parent", "")

    if invalid:
        errors["coursemaster"].append({"id": pk, "errors": invalid})

# 3. Attend
for entry in attends:
    fields = entry["fields"]
    pk = entry["pk"]
    required = ["userid", "term", "subject", "round", "res_date", "status"]
    invalid = check_required(fields, required, "attend")

    if not is_valid_date(fields.get("res_date", "")):
        invalid = invalid or {}
        invalid["res_date_format"] = fields.get("res_date", "")

    if invalid:
        errors["attend"].append({"id": pk, "errors": invalid})

# 4. History
for entry in histories:
    fields = entry["fields"]
    pk = entry["pk"]
    required = ["userid", "reg_date", "memo"]
    invalid = check_required(fields, required, "history")

    if not is_valid_date(fields.get("reg_date", "")):
        invalid = invalid or {}
        invalid["reg_date_format"] = fields.get("reg_date", "")

    if invalid:
        errors["history"].append({"id": pk, "errors": invalid})

# 출력
for table, problems in errors.items():
    if problems:
        print(f"\n❗ {table.upper()} 오류 항목:")
        for item in problems:
            print(f" - ID {item['id']}: {item['errors']}")
    else:
        print(f"\n✅ {table.upper()}: 모든 항목 유효")