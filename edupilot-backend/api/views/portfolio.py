from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import RecommendedNextCourse  # ✅ 추가
from api.models import Achievement  # ✅ import 추가
from api.models import RecommendedItem
from api.models import SemesterStatus, StudentMaster, CourseMaster, CourseMain, CourseWeek, Announcement, \
    TeacherFeedback


def get_next_term(term: str) -> str:
    year = int(term[:4])
    month = int(term[4:])
    next_month = {3: 6, 6: 9, 9: 12, 12: 3}[month]
    next_year = year + 1 if next_month == 3 else year
    return f"{next_year:04d}{next_month:02d}"


@api_view(['GET'])
def portfolio_student(request):
    name = request.query_params.get('name')
    password = request.query_params.get('password')

    data = generate_student_data(name, password)

    return Response(data)


@api_view(['GET'])
def portfolio_announcement(_):
    announcement_qs = Announcement.objects.all().order_by("-date")
    announcements = [
        {
            "id": f"announce-{ann.id}",
            "title": ann.title,
            "content": ann.content,
            "short_url": ann.short_url,
            "response_url": ann.response_url,
            "link_url": ann.link_url,
            "edit_url": ann.edit_url,
            "date": ann.date.isoformat()
        } for ann in announcement_qs
    ]

    return Response(announcements)


from datetime import datetime


def birth_to_grade(birth_year) -> str:
    current_year = datetime.now().year

    try:
        # 문자열 형태의 날짜 처리: "YYYY-MM-DD"
        if isinstance(birth_year, str) and "-" in birth_year:
            birth_year = datetime.strptime(birth_year, "%Y-%m-%d").year
        else:
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


def generate_student_data(name, password):
    semester_status = SemesterStatus.objects.first()
    if not semester_status:
        return {}

    current_semester = semester_status.current_semester
    if not current_semester:
        return {}

    _student = StudentMaster.objects.filter(status="재원생", name=name)
    student = [s for s in _student if str(s.phone_parent[-4:] if s.phone_parent else "0000") == password]

    if not student:
        return {}

    student = student[0]

    phone_suffix = student.phone_parent[-4:] if student.phone_parent else "0000"
    grade_info = birth_to_grade(student.birth)

    if student.imgfile:
        photo_url = f"/media/{student.imgfile}"

    else:
        photo_url = (
            "/public/images/profile-default-boy.png" if student.gender == "남" else "/public/images/profile-default-girl.png")

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
                "description": course_main.description,
                "term": record.term  # 학기 정보 포함
            })
        else:
            course_history.append({
                "id": record.subject,
                "title": f"{record.subject} (미등록 과목)",
                "level": "",
                "description": "",
                "term": record.term  # 미등록 과목도 학기 포함
            })

    MAX_SCORE = 100
    skills = [
        {"subject": "코딩기초", "score": 10, "fullMark": MAX_SCORE},
        {"subject": "알고리즘", "score": 10, "fullMark": MAX_SCORE},
        {"subject": "게임개발", "score": 10, "fullMark": MAX_SCORE},
        {"subject": "AI", "score": 10, "fullMark": MAX_SCORE},
        {"subject": "로봇", "score": 10, "fullMark": MAX_SCORE},
        {"subject": "하드웨어", "score": 10, "fullMark": MAX_SCORE},
        {"subject": "웹", "score": 10, "fullMark": MAX_SCORE},
    ]

    # 과목명 키워드 기반 스킬 매핑 규칙
    subject_to_skill_map = {
        "파이썬기초": [("코딩기초", 60)],
        "파이썬기본": [("코딩기초", 30)],
        "파이썬심화": [("코딩기초", 30)],
        "C언어기초": [("코딩기초", 30)],
        "앱인벤터기초": [("코딩기초", 20)],
        "앱인벤터심화": [("코딩기초", 20)],
        "스크래치기초": [("코딩기초", 20)],
        "스크래치심화": [("코딩기초", 20)],
        "마인크래프트파이썬": [("코딩기초", 20)],
        "파이썬알고리즘4": [("알고리즘", 25), ("코딩기초", 10)],
        "파이썬알고리즘3": [("알고리즘", 25), ("코딩기초", 10)],
        "파이썬알고리즘2": [("알고리즘", 25), ("코딩기초", 10)],
        "파이썬알고리즘1": [("알고리즘", 25), ("코딩기초", 10)],
        "C언어알고리즘1": [("알고리즘", 25)],
        "C언어알고리즘2": [("알고리즘", 25)],
        "C언어알고리즘3": [("알고리즘", 25)],
        "C언어알고리즘4": [("알고리즘", 25)],
        "C언어알고리즘5": [("알고리즘", 25)],

        "파이게임": [("게임개발", 20), ("코딩기초", 10)],
        "로블록스기본": [("게임개발", 20), ("코딩기초", 10)],
        "로블록스메이커": [("게임개발", 20), ("코딩기초", 10)],

        "AI": [("AI", 30)],
        "AI자율주행대회반2": [("AI", 30)],
        "AI자율주행대회반1": [("AI", 30)],

        "로봇": [("로봇", 30)],

        "마이크로비트기초": [("하드웨어", 20), ("코딩기초", 10)],
        "마이크로비트심화": [("하드웨어", 20), ("코딩기초", 10)],
        "아두이노": [("하드웨어", 20)],

        "웹": [("웹", 50)],
        "WEB-1": [("웹", 50)],
        "WEB-2": [("웹", 50)],
        "HTML": [("웹", 30)],
        "Javascript": [("웹", 30)],

        "루키즈레고코딩6": [("코딩기초", 5), ("로봇", 5)],
        "루키즈레고코딩5": [("코딩기초", 5), ("로봇", 5)],
        "루키즈레고코딩4": [("코딩기초", 5), ("로봇", 5)],
        "루키즈레고코딩3": [("코딩기초", 5), ("로봇", 5)],
        "루키즈레고코딩2": [("코딩기초", 5), ("로봇", 5)],
        "루키즈레고코딩1": [("코딩기초", 5), ("로봇", 5)],
    }

    # 누적 점수 계산 (과목명 기반)
    added_skills = set()

    for course in course_history:
        title = course["title"]

        for keyword, skill_list in subject_to_skill_map.items():
            if keyword in title:
                for skill_name, score_add in skill_list:
                    if (skill_name, keyword) not in added_skills:
                        for skill in skills:
                            if skill["subject"] == skill_name:
                                skill["score"] = min(skill["score"] + score_add, MAX_SCORE)
                                added_skills.add((skill_name, keyword))
                                break

    # ✅ 추천 다음 과정 조회
    next_term = get_next_term(current_semester)
    next_course_obj = RecommendedNextCourse.objects.filter(student=student, term=next_term).first()
    next_course_data = {
        "title": next_course_obj.title if next_course_obj else "다음 추천 과정",
        "description": next_course_obj.description if next_course_obj else "아직 다음학기 추천과정이 없습니다."
    }
    recommended_certificates = RecommendedItem.objects.filter(
        student=student, term=next_term, kind='자격증'
    )

    recommended_competitions = RecommendedItem.objects.filter(
        student=student, term=next_term, kind='대회'
    )

    certificate_list = [
        {
            "title": item.title,
            "description": item.description
        } for item in recommended_certificates
    ]

    competition_list = [
        {
            "title": item.title,
            "description": item.description
        } for item in recommended_competitions
    ]

    # ✅ 보유 자격증/수상 조회
    achievement_qs = Achievement.objects.filter(student=student)
    achievement_list = [
        {
            "title": a.title,
            "description": a.description,
            "date": a.date.isoformat() if a.date else None,
            "kind": a.kind
        }
        for a in achievement_qs
    ]

    feedback_qs = TeacherFeedback.objects.filter(
        student=student,
        semester=current_semester  # 🎯 이번 학기만 필터링
    ).order_by('-created_at')

    feedback_list = [
        {
            "id": fb.id,
            "content": fb.content,
            "teacher": fb.teacher,
            "week": fb.week,
            "created_at": fb.created_at.isoformat()
        }
        for fb in feedback_qs
    ]
    print(feedback_list)
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
            "nextCourse": next_course_data,
            "certificates": certificate_list,
            "competitions": competition_list
        },
        "feedbacks": feedback_list,
        "achievements": achievement_list
    }

    return student_dict
