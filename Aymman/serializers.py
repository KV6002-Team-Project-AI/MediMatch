from rest_framework import serializers
from ResearchSwipe.models import User, Recruitee, Recruiter
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'is_recruitee', 'is_recruiter')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data.get('email')
        
        # Check if a user with this username (email) already exists
        if User.objects.filter(username=email).exists():
            raise serializers.ValidationError({'email': 'This email is already in use.'})
        
        # Hash the user's password
        validated_data['password'] = make_password(validated_data['password'])
        
        # Set the username as email
        validated_data['username'] = email

        # Create the new user
        return super().create(validated_data)
    

    


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

    class Meta:
        model = Recruitee
        fields = (
            'user',
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
            'bio'
        )

    def get_full_name(self, obj):
            return obj.user.get_full_name()

    def get_email(self, obj):
            return obj.user.email
        
        
    

class RecruiterSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = Recruiter
        fields = ('user', 'research_area', 'company_info')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        # The 'create' method will save the User.
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        
        profile = self.Meta.model.objects.create(user=user, **validated_data)
        return profile

class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('is_recruitee', 'is_recruiter', 'is_superuser')


from django.contrib.auth import authenticate
user = authenticate(email='booo@gmail.com', password='mum')
if user:
    print("User found!")
else:
    print("User not found.")