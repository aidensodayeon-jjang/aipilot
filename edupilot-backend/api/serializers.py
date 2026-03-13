from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from api.models import User, StudentMaster, CourseMaster, Attend, History, SlackLogNew, RecommendedItem, TeacherFeedback, Announcement


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password")

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password")

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserLoginSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["is_staff"] = user.is_staff

        return token


class StudentMasterSerializer(serializers.ModelSerializer):
    current_course = serializers.SerializerMethodField()

    class Meta:
        model = StudentMaster
        fields = '__all__'

    def get_current_course(self, obj):
        # 가장 최근 등록된 수강 정보를 가져옴
        course = obj.courses.order_by('-id').first()
        if course:
            return {
                'course': course.course,
                'subject': course.subject,
                'time': course.time,
                'teacher': course.subject, # subject 필드에 담당자 정보가 들어가는 구조 고려
                'memo': course.memo
            }
        return None


class CourseMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseMaster
        fields = '__all__'


class StudentCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseMaster
        fields = '__all__'


class AttendSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True) # ✅ 명시적 추가
    name = serializers.CharField(source="userid.name", read_only=True)
    phone_parent = serializers.CharField(source="userid.phone_parent", read_only=True)

    class Meta:
        model = Attend
        fields = '__all__'


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = '__all__'


class SlackLogNewSerializer(serializers.ModelSerializer):
    class Meta:
        model = SlackLogNew
        fields = '__all__'


class RecommendedItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecommendedItem
        fields = '__all__'


class TeacherFeedbackSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.name', read_only=True)

    class Meta:
        model = TeacherFeedback
        fields = ['id', 'student', 'student_name', 'semester', 'week', 'teacher', 'content']


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'
