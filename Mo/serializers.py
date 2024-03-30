from rest_framework import serializers

from ResearchSwipe.models import User

from .models import Matches
from ResearchSwipe.serializers import RecruiteeSerializer, RecruiterSerializer, UserSerializer
from Syed.serializers import StudySerializer


# Recruitee serializer that uses specific data from the Recruitee class
class CustomRecruiteeSerializer(RecruiteeSerializer):
    class Meta(RecruiteeSerializer.Meta):
        fields = (
            'user_id',
            'full_name',
            'age',
            'biological_sex',
            'height',
            'weight',
            'profession',
            'work_preference',
            'health_status',
            'socioeconomic_status',
            'ethnicity',
            'activity_level',
            'study_preference',
            'interest_1',
            'interest_2',
            'interest_3',
            'interest_4',
            'bio',
            'summary'
        )

# Recruiter serializer that uses specific data from the Recruiter class
class CustomRecruiterSerializer(RecruiterSerializer):
    class Meta(RecruiterSerializer.Meta):
        fields = (
            'user_id', 
            'profile_image_url',
            'research_area',
            'company_info'
        )

# Study serializer that uses specific data from the Study class
class CustomStudySerializer(StudySerializer):
    class Meta(StudySerializer.Meta):
        fields = (
            'user',  
            'category', 
            'description', 
            'start_date',
            'duration', 
            'work_preference',
            'min_age', 
            'max_age', 
            'min_height', 
            'max_height', 
            'min_weight', 
            'max_weight', 
            'biological_sex', 
            'profession', 
            'ethnicity',
            'activity_level', 
            'socioeconomic_status', 
            'health_status'
        )

# Matches serializer that uses all information in the Match class including the study, recruitee and recruiter serializers
class ProfileInteractionSerializer(serializers.ModelSerializer):
    # Specific study information (ID and name)
    study_id = serializers.ReadOnlyField(source='study.study_id')
    study_name = serializers.ReadOnlyField(source='study.name')
    study_info = StudySerializer(source='study', read_only=True)
    # Recruitee information (ID)
    user_id = serializers.ReadOnlyField(source='user.user_id')
    # Statuses of both studies and recruitees
    
    recruitee_status = serializers.ChoiceField(choices=Matches.STATUS_CHOICES, default='pending')
    study_status = serializers.ChoiceField(choices=Matches.STATUS_CHOICES, default='pending')
    # Recruitee information 
    recruitee = CustomRecruiteeSerializer(source='user', read_only=True)
    # Recruiter information 
    recruiter_info = CustomRecruiterSerializer(source='recruiter', read_only=True)

    class Meta:
        model = Matches
        fields = ('match_id', 'study_id', 'study_name', 'user_id', 'study_info', 'recruitee_status', 'study_status', 'recruitee', 'recruiter_info')
