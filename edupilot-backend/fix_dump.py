import json

with open("db.json", "r", encoding="utf-8") as f:
    data = json.load(f)

pk_counter = 1
for obj in data:
    if obj["model"] == "api.studentmaster":
        original_pk = obj["pk"]
        obj["fields"]["master_id"] = original_pk  # 👉 기존 문자열 pk → master_id로 이동
        obj["pk"] = pk_counter  # 👉 pk는 정수값으로 대체
        pk_counter += 1

with open("db_fixed.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
