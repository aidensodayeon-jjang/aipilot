import os
import django
import pandas as pd
from datetime import datetime

# Django 설정
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from api.models import StudentMaster, CourseMain, RecommendedNextCourse

# CSV 파일 경로
csv_path = "next12.csv"
df = pd.read_csv(csv_path)

# 다음 학기 코드 (예: 202509)
next_term = "202512"

# 결과 누적용
updated_records = []

for _, row in df.iterrows():
    name = str(row["학생이름"]).strip()
    phone_suffix = str(row["학부모 연락처"]).replace("-", "").strip()[-4:]
    recommended_code = str(row["12월추천과정"]).strip()

    if not recommended_code or recommended_code.lower() == "nan":
        continue

    # 학생 찾기
    student = StudentMaster.objects.filter(name=name, phone_parent__endswith=phone_suffix).first()
    if not student:
        print(f"[!] 학생 찾을 수 없음: {name} ({phone_suffix})")
        continue

    # 추천과정 정보 찾기
    course = CourseMain.objects.filter(code=recommended_code).first()
    if not course:
        print(f"[!] 추천과정 없음: {recommended_code}")
        continue

    # 저장 또는 업데이트
    obj, created = RecommendedNextCourse.objects.update_or_create(
        student=student,
        term=next_term,
        defaults={
            "title": recommended_code,
            "description": course.description or ""
        }
    )

    updated_records.append({
        "학생이름": name,
        "추천과정": recommended_code,
        "설명": course.description or "",
        "상태": "생성" if created else "업데이트"
    })
