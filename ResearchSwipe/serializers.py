from rest_framework import serializers
from .models import User, Recruitee, Recruiter
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'is_recruitee', 'is_recruiter')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Hash the user's password when creating a new user
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

class MyAuthTokenSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('email')  # This should match the field name you use on the front end
        password = data.get('password')
        user = authenticate(username=username, password=password)
        if user is None:
            raise serializers.ValidationError(
                'A user with this email and password is not found.'
            )
        # No need for a try-except block here, because if authenticate() 
        # doesn't raise an exception, the user exists.
        refresh = RefreshToken.for_user(user)
        update_last_login(None, user)  # Make sure update_last_login is imported
        return {
            'user': user,  # Set the user in validated_data
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }


class RecruiteeSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = Recruitee
        fields = (
            'user',
            'personal_id',
            'name',
            'age',
            'date_of_birth',
            'biological_sex',
            'contact_information',
            'emergency_contact',
            'informed_consent_status',
            'has_medical_history',
            'medical_history_details',
            'taking_current_medications',
            'current_medication_details',
            'has_medication_history',
            'medication_history_details',
            'has_allergies',
            'allergy_details',
            'has_family_medical_history',
            'family_medical_history_details',
            'health_status',
            'lifestyle_factors',
            'socioeconomic_status',
            'ethnicity',
            'race',
            'pregnancy_status',
            'language_preferences',
            'participation_history',
            'consent_form_version',
            'date_of_consent',
            'study_ids'
        )

    def create(self, validated_data):
        user_data = validated_data.pop('user')
    # The 'create' method should already save the User.
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
    # At this point, the user instance is already saved.
        profile = self.Meta.model.objects.create(user=user, **validated_data)
        return profile


class RecruiterSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = Recruiter
        fields = ('user', 'research_area', 'company_info')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        # The 'create' method should already save the User.
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        # At this point, the user instance is already saved.
        profile = self.Meta.model.objects.create(user=user, **validated_data)
        return profile

