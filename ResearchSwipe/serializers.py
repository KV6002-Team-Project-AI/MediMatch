from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from django.conf import settings
from .token import email_verification_token_generator
from .email_service import EmailService
from django.core.exceptions import ValidationError
from django.db.models import Count

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'is_recruitee', 'is_recruiter', 'profile_image')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data.get('email')
        
        # Check if a user with this email (as username) already exists
        if User.objects.filter(username=email).exists():
            raise serializers.ValidationError({'email': 'This email is already in use.'})
        
        # Hash the user's password
        validated_data['password'] = make_password(validated_data['password'])
        
        # Set the username as email
        validated_data['username'] = email

        # Create the new user
        user = super().create(validated_data)

        # Send verification email after creating the user
        EmailService.send_verification_email(user)

        return user



class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'is_recruitee', 'is_recruiter', 'is_superuser', 'profile_image')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data.get('email')
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({'email': 'This email is already in use.'})

        password = validated_data.pop('password')
        user = User.objects.create_superuser(email=email, password=password, **validated_data)

        EmailService.send_verification_email(user)

        return user


class MyAuthTokenSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        # Use 'username' parameter for email because Django's authenticate method expects 'username'
        user = authenticate(username=email, password=password)

        if user is None:
            raise serializers.ValidationError('A user with this email and password is not found.')

        # Check if the user has completed the additional information forms
        has_filled_recruitee_form = Recruitee.objects.filter(user=user).exists()
        has_filled_recruiter_form = Recruiter.objects.filter(user=user).exists()

        # Update the last login time for the user
        update_last_login(None, user)

        return {
            'user_instance': user,  # Return the user instance for token generation
            'user_info': {  # Return additional info for response
                'id': user.id,
                'name': user.get_full_name(),
                'email': user.email,
                'is_recruitee': getattr(user, 'is_recruitee', False),
                'is_recruiter': getattr(user, 'is_recruiter', False),
                'is_superuser': user.is_superuser, 
                'has_filled_recruitee_form': has_filled_recruitee_form,
                'has_filled_recruiter_form': has_filled_recruiter_form,
            },
            'refresh': str(RefreshToken.for_user(user)),
            'access': str(RefreshToken.for_user(user).access_token),
        }
    


class RecruiteeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    full_name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    profile_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Recruitee
        fields = (
            'user',
            'full_name',
            'email',
            'profile_image_url',
            'age',
            'date_of_birth',
            'biological_sex',
            'contact_information',
            'emergency_contact',
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
            'measurement_system',
            'height',
            'weight',
            'hair_color',
            'profession',
            'duration_of_participation',
            'work_preference',
            'health_status',
            'lifestyle_factors',
            'socioeconomic_status',
            'ethnicity',
            'nationality',
            'pregnancy_status',
            'language_preferences',
            'participation_history',
            'activity_level',
            'study_preference',
            'interest_1',
            'interest_2',
            'interest_3',
            'interest_4',
            'bio',
            'summary'
        )

    def get_full_name(self, obj):
            return obj.user.get_full_name()

    def get_email(self, obj):
            return obj.user.email

    def get_profile_image_url(self, obj):
        request = self.context.get('request')
        if obj.user.profile_image and hasattr(obj.user.profile_image, 'url'):
            return request.build_absolute_uri(obj.user.profile_image.url)
        return None

    def create(self, validated_data):
        user = self.context['request'].user
        if Recruitee.objects.filter(user=user).exists():
            raise serializers.ValidationError('Recruitee profile already exists for this user.')
        recruitee = Recruitee.objects.create(user=user, **validated_data)
        return recruitee
    

class RecruiterSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    full_name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    profile_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Recruiter
        fields = ('user', 
                  'full_name',
                  'email',
                  'profile_image_url',
                  'research_area', 
                  'company_info')

    def get_full_name(self, obj):
            return obj.user.get_full_name()

    def get_email(self, obj):
            return obj.user.email

    def get_profile_image_url(self, obj):
        request = self.context.get('request')
        if obj.user.profile_image and hasattr(obj.user.profile_image, 'url'):
            return request.build_absolute_uri(obj.user.profile_image.url)
        return None

    def create(self, validated_data):
    # Access the current authenticated user from the request context
        user = self.context['request'].user

        # Check if the user already exists in validated_data and remove it
        validated_data.pop('user', None)  # Remove 'user' if it exists to prevent conflict

        # Now proceed with creating the Recruiter object
        recruiter = Recruiter.objects.create(user=user, **validated_data)
        return recruiter


class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('is_recruitee', 'is_recruiter', 'is_superuser', 'is_verified')


class ReportSerializer(serializers.ModelSerializer):
    reported_user_name = serializers.CharField(source='reported_user.username', read_only=True)
    reported_user_report_count = serializers.SerializerMethodField()
    reported_user_warn_count = serializers.SerializerMethodField()

    class Meta:
        model = Report
        fields = ('id', 'reporter', 'reported_user', 'reported_user_name', 'reported_user_report_count', 'reported_user_warn_count', 'reason', 'status', 'created_at', 'updated_at', 'message')
        # if you want all fields from the model plus the extra fields, use '__all__' and then declare extra fields separately

    def get_reported_user_report_count(self, obj):
        return Report.objects.filter(reported_user=obj.reported_user).count()

    def get_reported_user_warn_count(self, obj):
        return Report.objects.filter(reported_user=obj.reported_user, status='warn').count()





