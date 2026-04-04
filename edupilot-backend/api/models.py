from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, username, password):
        user = self.model(username=username)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, password):
        user = self.create_user(username, password)

        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "username"


class StudentMaster(models.Model):
    id = models.AutoField(primary_key=True)
    master_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=20, blank=True)
    name_parent = models.TextField(null=True, blank=True, max_length=10)
    phone_parent = models.TextField(null=False, blank=True, max_length=30)
    phone_user = models.TextField(null=True, blank=True, max_length=10)
    gender = models.TextField(null=True, blank=True, max_length=5)
    school = models.TextField(null=True, blank=True, max_length=30)
    grade = models.TextField(null=True, blank=True, max_length=10)
    input_path = models.TextField(null=True, blank=True, max_length=20)
    status = models.TextField(null=True, blank=True, max_length=20)
    counsel = models.TextField(null=True, blank=True, max_length=1000)
    memo = models.TextField(null=True, blank=True, max_length=1000)
    birth = models.TextField(null=True, blank=True, max_length=30)
    regdate = models.TextField(null=True, blank=True, max_length=30)
    opt_out = models.TextField(null=True, blank=True, max_length=30)
    imgfile = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f'UserMaster[name={self.name},phone_parent={self.phone_parent},...]'


class CourseMaster(models.Model):
    id = models.AutoField(primary_key=True)
    userid = models.ForeignKey(StudentMaster, on_delete=models.CASCADE, related_name='courses', db_column='userid')
    term = models.TextField(null=True, blank=True, max_length=20)
    course = models.TextField(null=False, blank=True, max_length=20)
    phone_parent = models.TextField(null=False, blank=True, max_length=30)
    subject = models.TextField(null=True, blank=True, max_length=20)
    time = models.TextField(null=True, blank=True, max_length=30)
    openlab = models.TextField(null=True, blank=True, max_length=30)
    pay = models.TextField(null=True, blank=True, max_length=10)
    memo = models.TextField(null=True, blank=True, max_length=1000)

    def __str__(self):
        return f'CourseMaster[userid={self.userid},id={self.id},phone_parent={self.phone_parent},...]'


class Attend(models.Model):
    id = models.AutoField(primary_key=True)
    userid = models.ForeignKey(StudentMaster, on_delete=models.CASCADE, related_name='attends', db_column='userid')
    term = models.TextField(null=True, blank=True, max_length=20)
    subject = models.TextField(null=True, blank=True, max_length=20)
    round = models.TextField(null=True, blank=True, max_length=20)
    status = models.TextField(null=True, blank=True, max_length=20)
    res_date = models.TextField(null=True, blank=True, max_length=30)
    memo = models.TextField(null=True, blank=True, max_length=1000)

    def __str__(self):
        return f'Attend[userid={self.userid},round={self.round},subject={self.subject},...]'


class History(models.Model):
    id = models.AutoField(primary_key=True)
    userid = models.ForeignKey(StudentMaster, on_delete=models.CASCADE, related_name='histories', db_column='userid')
    reg_date = models.TextField(null=True, blank=True, max_length=30)
    memo = models.TextField(null=True, blank=True, max_length=1000)

    def __str__(self):
        return f'History[userid={self.id},reg_date={self.reg_date},memo={self.memo},...]'


class SlackLogNew(models.Model):
    ts = models.CharField(max_length=30, unique=True)  # 슬랙 timestamp (중복 방지용)
    posted_dt = models.DateTimeField()  # 슬랙 기준 작성 시각
    message = models.TextField()  # 메시지 본문

    def __str__(self):
        return f"{self.posted_dt} - {self.message[:30]}"


class SemesterStatus(models.Model):
    current_semester = models.CharField(max_length=6)  # 예: 202506
    call_id = models.CharField(max_length=20, null=True, blank=True) # ✅ 추가
    new_count = models.IntegerField(default=0)  # ✅ 신규 등록 인원 수 저장용
    total_revenue = models.BigIntegerField(default=0)  # ✅ 총 매출액 저장용
    unpaid_amount = models.BigIntegerField(default=0)  # ✅ 미결제 총액 저장용
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"현재 학기: {self.current_semester}"


class AcademicSemester(models.Model):
    name = models.CharField(max_length=100)  # 예: 2026년 3월 봄학기
    start_date = models.DateField()
    end_date = models.DateField()
    vacation_start = models.DateField(null=True, blank=True)
    vacation_end = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# models.py

class CourseMain(models.Model):
    code = models.CharField(max_length=20, unique=True)
    title = models.CharField(max_length=100)
    level = models.CharField(max_length=20)  # 예: 초급, 중급, 고급
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.code} - {self.title}"


class CourseWeek(models.Model):
    course_main = models.ForeignKey(CourseMain, on_delete=models.CASCADE, related_name="weeks")
    week = models.PositiveIntegerField()
    topic = models.CharField(max_length=100)

    class Meta:
        unique_together = ("course_main", "week")
        ordering = ["week"]

    def __str__(self):
        return f"{self.course_main.code} - {self.week}주차: {self.topic}"


class Announcement(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True, null=True)
    date = models.DateField(auto_now_add=True)
    short_url = models.CharField(max_length=255, blank=True, null=True)
    response_url = models.CharField(max_length=255, blank=True, null=True)
    link_url = models.CharField(max_length=255, blank=True, null=True)
    edit_url = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'announcement'
        ordering = ['-date']

    def __str__(self):
        return f"[{self.date}] {self.title}"


class RecommendedNextCourse(models.Model):
    student = models.ForeignKey(StudentMaster, on_delete=models.CASCADE)
    term = models.CharField(max_length=6)  # 예: '202509'
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    class Meta:
        unique_together = ('student', 'term')


class Achievement(models.Model):
    KIND_CHOICES = (
        ('자격증', '자격증'),
        ('수상', '수상'),
    )

    student = models.ForeignKey('StudentMaster', on_delete=models.CASCADE)
    kind = models.CharField(max_length=10, choices=KIND_CHOICES)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    date = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ['-date']


class RecommendedItem(models.Model):
    KIND_CHOICES = (
        ('자격증', '자격증'),
        ('대회', '대회'),
    )

    student = models.ForeignKey('StudentMaster', on_delete=models.CASCADE)
    kind = models.CharField(max_length=10, choices=KIND_CHOICES)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    term = models.CharField(max_length=6)  # 예: '202509'
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']


# api/models.py

# api/models.py

class TeacherFeedback(models.Model):
    student = models.ForeignKey('StudentMaster', on_delete=models.CASCADE)
    semester = models.CharField(max_length=6)  # 예: '202509'
    week = models.PositiveIntegerField(null=True, blank=True)  # 주차 정보
    content = models.TextField(blank=True)
    teacher = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)  # 생성일만 유지

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.student.name} ({self.semester} - {self.week}주차) - {self.teacher}"


class DashboardTask(models.Model):
    TASK_TYPES = (
        ('short', '단기업무'),
        ('mid', '중기업무'),
        ('feedback', '학생피드백'),
    )
    type = models.CharField(max_length=20, choices=TASK_TYPES)
    content = models.CharField(max_length=500)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.get_type_display()}] {self.content[:20]}"


# --- Timetable & Attendance Integration ---

class CourseClass(models.Model):
    DAY_CHOICES = (
        ('Monday', '월요일'),
        ('Tuesday', '화요일'),
        ('Wednesday', '수요일'),
        ('Thursday', '목요일'),
        ('Friday', '금요일'),
        ('Saturday', '토요일'),
        ('Sunday', '일요일'),
    )

    class_code = models.CharField(max_length=50, unique=True)  # 길이를 50으로 증가
    subject_name = models.CharField(max_length=100)
    day_of_week = models.CharField(max_length=20, choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField(null=True, blank=True)
    classroom = models.CharField(max_length=50, null=True, blank=True)
    teacher_name = models.CharField(max_length=50, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.class_code}] {self.subject_name} ({self.day_of_week})"


class Enrollment(models.Model):
    student = models.ForeignKey(StudentMaster, on_delete=models.CASCADE, related_name='enrollments')
    course_class = models.ForeignKey(CourseClass, on_delete=models.CASCADE, related_name='enrolled_students')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'course_class')

    def __str__(self):
        return f"{self.student.name} - {self.course_class.subject_name}"


class AttendanceLog(models.Model):
    METHOD_CHOICES = (
        ('Kiosk', '키오스크'),
        ('Manual', '수동'),
    )
    STATUS_CHOICES = (
        ('present', '출석'),
        ('absent', '결석'),
    )

    student = models.ForeignKey(StudentMaster, on_delete=models.SET_NULL, null=True, related_name='attendance_logs')
    course_class = models.ForeignKey(CourseClass, on_delete=models.SET_NULL, null=True, related_name='attendance_logs')
    check_in_time = models.DateTimeField() # auto_now_add 제거
    method = models.CharField(max_length=10, choices=METHOD_CHOICES, default='Kiosk')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='present') # ✅ 추가
    notification_sent = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.student.name if self.student else 'Unknown'} - {self.status} ({self.check_in_time})"

class Notification(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    avatar = models.CharField(max_length=255, null=True, blank=True)
    type = models.CharField(max_length=50, default='attendance')
    is_unread = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} - {self.created_at}"

class MessageLog(models.Model):
    student = models.ForeignKey(StudentMaster, on_delete=models.SET_NULL, null=True, blank=True)
    sender = models.CharField(max_length=20)
    receiver = models.CharField(max_length=20)
    content = models.TextField()
    status = models.CharField(max_length=20, default='success')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.receiver} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"

class MessageTemplate(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class StudentTier(models.Model):
    student = models.ForeignKey(StudentMaster, on_delete=models.CASCADE, related_name='tiers')
    semester = models.CharField(max_length=6)  # 예: '202509'
    tier = models.CharField(max_length=20, default='Bronze')
    points = models.IntegerField(default=0)  # ✅ 추가: 누적 포인트
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('student', 'semester')

    def __str__(self):
        return f"{self.student.name} - {self.semester} ({self.tier})"
