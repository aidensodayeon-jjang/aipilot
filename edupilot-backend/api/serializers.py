from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from api.models import User, StudentMaster, CourseMaster, Attend, History, SlackLogNew, RecommendedItem, TeacherFeedback


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
    class Meta:
        model = StudentMaster
        fields = '__all__'


class CourseMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseMaster
        fields = '__all__'


class StudentCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseMaster
        fields = '__all__'


class AttendSerializer(serializers.ModelSerializer):
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
