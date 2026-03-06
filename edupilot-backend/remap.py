import json

with open("db_filtered.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Step 1: StudentMaster의 master_id -> id 매핑 테이블 생성
master_id_map = {}
for obj in data:
    if obj["model"] == "api.studentmaster":
        master_id = obj["fields"]["master_id"]
        new_id = obj["pk"]
        master_id_map[master_id] = new_id

# Step 2: CourseMaster 등에서 userid 값 교체
for obj in data:
    if obj["model"] == "api.coursemaster":
        old_userid = obj["fields"]["userid"]
        obj["fields"]["userid"] = master_id_map.get(old_userid)
    if obj["model"] == "api.attend":
        old_userid = obj["fields"]["userid"]
        obj["fields"]["userid"] = master_id_map.get(old_userid)
    if obj["model"] == "api.history":
        old_userid = obj["fields"]["userid"]
        obj["fields"]["userid"] = master_id_map.get(old_userid)

# 저장
with open("db_final.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)