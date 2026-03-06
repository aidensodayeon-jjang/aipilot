import json

# 1. 새 studentmaster.json 읽기
with open("studentmaster.json", encoding="utf-8") as f:
    new_students = json.load(f)

# 2. 기존 db.json 읽기
with open("db.json", encoding="utf-8") as f:
    old_data = json.load(f)

# 3. old_id → master_id 매핑
old_id_to_master_id = {}
for entry in old_data:
    if entry["model"] == "api.studentmaster":
        old_id_to_master_id[entry["pk"]] = entry["fields"].get("master_id", "").strip()

# 4. master_id → new_id 매핑
master_id_to_new_id = {}
for entry in new_students:
    if entry["model"] == "api.studentmaster":
        master_id = entry["fields"].get("master_id", "").strip()
        master_id_to_new_id[master_id] = entry["pk"]

# 5. old_id → new_id 최종 매핑
old_id_to_new_id = {
    old_id: master_id_to_new_id.get(master_id)
    for old_id, master_id in old_id_to_master_id.items()
    if master_id in master_id_to_new_id
}

# 6. attend / history 생성
attend_fixtures = []
history_fixtures = []
attend_id = 1
history_id = 1

for entry in old_data:
    model = entry.get("model", "")
    fields = entry.get("fields", {})
    old_userid = fields.get("userid")
    new_userid = old_id_to_new_id.get(old_userid)

    if not new_userid:
        continue  # 매핑 실패 시 건너뜀

    if model == "api.attend":
        attend_fixtures.append({
            "model": "api.attend",
            "pk": attend_id,
            "fields": {
                "userid": new_userid,
                "term": fields.get("term", ""),
                "subject": fields.get("subject", ""),
                "round": fields.get("round", ""),
                "status": fields.get("status", ""),
                "res_date": fields.get("res_date", ""),
                "memo": fields.get("memo", "")
            }
        })
        attend_id += 1

    elif model == "api.history":
        history_fixtures.append({
            "model": "api.history",
            "pk": history_id,
            "fields": {
                "userid": new_userid,
                "reg_date": fields.get("reg_date", ""),
                "memo": fields.get("memo", "")
            }
        })
        history_id += 1

# 7. 결과 저장
with open("attend.json", "w", encoding="utf-8") as f:
    json.dump(attend_fixtures, f, ensure_ascii=False, indent=2)

with open("history.json", "w", encoding="utf-8") as f:
    json.dump(history_fixtures, f, ensure_ascii=False, indent=2)