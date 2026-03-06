import json

with open("db_fixed.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# contenttypes와 auth.permission 제거
filtered = [
    obj for obj in data
    if not obj["model"].startswith("contenttypes.")
       and not obj["model"].startswith("auth.permission")
]

with open("db_filtered.json", "w", encoding="utf-8") as f:
    json.dump(filtered, f, ensure_ascii=False, indent=2)