from rest_framework import serializers
from .models import User, Recruitee, Recruiter

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'is_recruitee', 'is_recruiter')
        extra_kwargs = {'password': {'write_only': True}}

class RecruiteeSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = Recruitee
        fields = ('user', 'age', 'ethnicity', 'height')

class RecruiterSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = Recruiter
        fields = ('user', 'research_area', 'company_info')
