import os
import django
import json
from datetime import datetime

# Django 설정
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from api.models import (
    StudentMaster,
    SemesterStatus,
    CourseMaster,
    CourseMain,
    CourseWeek,
    Announcement,  # ✅ 추가
)


def birth_to_grade(birth_year) -> str:
    current_year = datetime.now().year
    try:
        birth_year = int(birth_year)
        school_age = current_year - birth_year + 1

        if 8 <= school_age <= 13:
            return f"초{school_age - 7}"
        elif 14 <= school_age <= 16:
            return f"중{school_age - 13}"
        elif 17 <= school_age <= 19:
            return f"고{school_age - 16}"
        else:
            return f"{school_age}세"
    except (ValueError, TypeError):
        return "연령 미입력"


def generate_combined_data():
    semester_status = SemesterStatus.objects.first()
    current_semester = semester_status.current_semester if semester_status else None
    if not current_semester:
        print("⚠️ 현재 학기 정보가 없습니다.")
        return

    students = StudentMaster.objects.filter(status="재원생")
    student_output = []

    for student in students:
        phone_suffix = student.phone_parent[-4:] if student.phone_parent else "0000"
        grade_info = birth_to_grade(student.birth)

        if student.imgfile:
            photo_url = f"/media/{student.imgfile}"
        else:
            photo_url = (
                "/public/images/profile-default-boy.png" if student.gender == "남" else "/public/images/profile-default-girl.png"
            )

        course_record = CourseMaster.objects.filter(userid=student, term=current_semester).first()
        current_course_data = {
            "id": "",
            "title": "수강 중인 과정 없음",
            "level": "",
            "description": "",
            "progress": []
        }

        if course_record:
            course_main = CourseMain.objects.filter(code=course_record.subject).first()
            if course_main:
                course_weeks = CourseWeek.objects.filter(course_main=course_main).order_by("week")
                if course_weeks.exists():
                    progress_data = [
                        {
                            "week": week.week,
                            "topic": week.topic,
                            "status": "pending"
                        } for week in course_weeks
                    ]
                else:
                    progress_data = [
                        {
                            "week": 0,
                            "topic": "주차 정보 없음",
                            "status": "unavailable"
                        }
                    ]

                current_course_data = {
                    "id": course_main.code,
                    "title": course_main.title,
                    "level": course_main.level,
                    "description": course_main.description,
                    "progress": progress_data
                }

        history_records = CourseMaster.objects.filter(userid=student).exclude(term=current_semester).order_by("term")
        course_history = []
        for record in history_records:
            course_main = CourseMain.objects.filter(code=record.subject).first()
            if course_main:
                course_history.append({
                    "id": course_main.code,
                    "title": course_main.title,
                    "level": course_main.level,
                    "description": course_main.description
                })
            else:
                course_history.append({
                    "id": record.subject,
                    "title": f"{record.subject} (미등록 과목)",
                    "level": "",
                    "description": ""
                })

        MAX_SCORE = 100
        course_count = len(course_history)
        skills = [
            {"subject": "코딩기초", "score": 20, "fullMark": MAX_SCORE},
            {"subject": "알고리즘", "score": 0, "fullMark": MAX_SCORE},
            {"subject": "게임개발", "score": 0, "fullMark": MAX_SCORE},
            {"subject": "AI", "score": 20, "fullMark": MAX_SCORE},
            {"subject": "로봇", "score": 0, "fullMark": MAX_SCORE},
            {"subject": "하드웨어", "score": 0, "fullMark": MAX_SCORE},
            {"subject": "웹", "score": 40, "fullMark": MAX_SCORE},
        ]
        if course_count >= 4:
            for skill in skills:
                if skill["subject"] == "코딩기초":
                    skill["score"] = MAX_SCORE

        student_dict = {
            "id": f"student-{student.id}",
            "name": student.name,
            "password": phone_suffix,
            "age": grade_info,
            "school": student.school or "",
            "photoUrl": photo_url,
            "currentCourse": current_course_data,
            "courseHistory": course_history,
            "skills": skills,
            "recommendations": {
                "nextCourse": {
                    "title": "다음 추천 과정",
                    "description": "추천 과정을 수동으로 채워주세요."
                },
                "certificates": [],
                "competitions": []
            },
            "feedbacks": [],
            "achievements": []
        }

        student_output.append(student_dict)

    # ✅ DB에서 공지사항 가져오기
    announcement_qs = Announcement.objects.all().order_by("-date")
    announcements = [
        {
            "id": f"announce-{ann.id}",
            "title": ann.title,
            "content": ann.content,
            "date": ann.date.isoformat()
        } for ann in announcement_qs
    ]

    with open("data.ts", "w", encoding="utf-8") as f:
        f.write("import type { Student, Announcement } from './types';\n\n")
        f.write("export const studentsData: Student[] = ")
        json.dump(student_output, f, ensure_ascii=False, indent=2)
        f.write(";\n\n")
        f.write("export const announcementsData: Announcement[] = ")
        json.dump(announcements, f, ensure_ascii=False, indent=2)
        f.write(";")

    print(f"✅ {len(student_output)}명 학생 + {len(announcements)}건 공지사항이 data.ts에 저장되었습니다.")


if __name__ == "__main__":
    generate_combined_data()
