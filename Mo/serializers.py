from rest_framework import serializers
from .models import Matches
from ResearchSwipe.serializers import RecruiteeSerializer, RecruiterSerializer
from Syed.serializers import StudySerializer


# Recruitee serializer that uses specific data from the Recruitee class
class CustomRecruiteeSerializer(RecruiteeSerializer):
    class Meta(RecruiteeSerializer.Meta):
        fields = (
            'user',
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
        )




# Matches serializer that uses all information in the Match class including the study, recruitee and recruiter serializers
class ProfileInteractionSerializer(serializers.ModelSerializer):
    # Specific study information (ID and name)
    study_info = StudySerializer(source='study')
    # Recruitee information (ID)
    user_id = serializers.ReadOnlyField(source='user.user_id')
    # Statuses of both studies and recruitees
    recruitee_status = serializers.ChoiceField(choices=Matches.STATUS_CHOICES, default='pending')
    study_status = serializers.ChoiceField(choices=Matches.STATUS_CHOICES, default='pending')
    # Recruitee information 
    recruitee = CustomRecruiteeSerializer(source='user', read_only=True)
    # Recruiter information 
    recruiter_info = RecruiterSerializer(source='recruiter')


    class Meta:
        model = Matches
        fields = ('match_id', 'user_id', 'study_info', 'recruitee_status', 'study_status', 'recruitee', 'recruiter_info')