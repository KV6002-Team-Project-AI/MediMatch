from rest_framework import serializers
from .models import Matches
from ResearchSwipe.serializers import RecruiteeSerializer, RecruiterSerializer
from Syed.serializers import StudySerializer

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
            'bio'
        )


class CustomRecruiterSerializer(RecruiterSerializer):
    class Meta(RecruiterSerializer.Meta):
        fields = (
            'user_id', 
            'research_area',
            'company_info'
        )


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

class ProfileInteractionSerializer(serializers.ModelSerializer):
    study_id = serializers.ReadOnlyField(source='study.study_id')
    study_name = serializers.ReadOnlyField(source='study.name')
    user_id = serializers.ReadOnlyField(source='user.user_id')
    recruitee_status = serializers.ChoiceField(choices=Matches.STATUS_CHOICES, default='pending')
    study_status = serializers.ChoiceField(choices=Matches.STATUS_CHOICES, default='pending')
    recruitee = CustomRecruiteeSerializer(source='user', read_only=True)
    recruiter = CustomStudySerializer(source='study', read_only=True)
    recruiter_info = CustomRecruiterSerializer(source='recruiter', read_only=True)


    class Meta:
        model = Matches
        fields = ('match_id', 'study_id', 'study_name', 'user_id', 'recruiter', 'recruitee_status', 'study_status', 'recruitee', 'recruiter_info')


    def update(self, instance, validated_data):
        instance.recruitee_status = validated_data.get('recruitee_status', instance.recruitee_status)
        instance.study_status = validated_data.get('study_status', instance.study_status)
        instance.save()
        return instance
