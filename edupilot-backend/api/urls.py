from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenBlacklistView

from api.views.attend_views import AttendView
from api.views.course_master_views import CourseMasterView
from api.views.dashboard_views import DashboardView
from api.views.history_views import HistoryView
from api.views.message_views import MessageView
from api.views.portfolio import portfolio_student, portfolio_announcement
from api.views.slack_views import SlackLogView, SyncSlackView
from api.views.student_course_views import StudentCourseView
from api.views.student_master_views import StudentMasterView, StudentMergeView
from api.views.student_master_views import upload_photo
from api.views.status_views import StudentStatusView
from api.views.user_views import UserLoginView, UserRegisterView
from api.views.UserRecommend_views import RecommendedItemView
from api.views.TeacherFeedbackView import TeacherFeedbackView
from api.views.schedule_views import ScheduleStructureView, AttendanceLogView, KioskLookupView
from api.views.import_views import StudentImportView, TimetableImportView
from api.views.semester_views import AcademicSemesterView

app_name = "api"

urlpatterns = [
    path("semester/", AcademicSemesterView.as_view()),
    path("import/students/", StudentImportView.as_view()),
    path("import/timetable/", TimetableImportView.as_view()),
    path("schedule/structure/", ScheduleStructureView.as_view()),
    path("schedule/logs/", AttendanceLogView.as_view()),
    path("kiosk/lookup/", KioskLookupView.as_view()),
    path("user/register/", UserRegisterView.as_view()),
    path("user/login/", UserLoginView.as_view()),
    path("user/login/update/", TokenRefreshView.as_view()),
    path("user/logout/", TokenBlacklistView.as_view()),

    path("dashboard/", DashboardView.as_view()),
    path("attend/", AttendView.as_view()),
    path("history/", HistoryView.as_view()),
    path("slacklog/", SlackLogView.as_view()),
    path("slack/sync/", SyncSlackView.as_view()),

    path("recommend-items/", RecommendedItemView.as_view()),
    path("teacher-feedback/", TeacherFeedbackView.as_view()),

    path("students/statuses/", StudentStatusView.as_view()),
    path("students/", StudentMasterView.as_view()),
    path("student/register/", StudentMasterView.as_view()),
    path("student/update/<str:pk>/", StudentMasterView.as_view()),
    path("student/merge/", StudentMergeView.as_view()), # 추가
    path("student/upload_photo/", upload_photo),

    path("student/course/", StudentCourseView.as_view()),

    path("course/", CourseMasterView.as_view()),
    path("course/<int:pk>/", CourseMasterView.as_view()),  # DELETE 방식


    path("message/", MessageView.as_view()),

    path("portfolio/student/", portfolio_student),
    path("portfolio/announcement/", portfolio_announcement),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  #
