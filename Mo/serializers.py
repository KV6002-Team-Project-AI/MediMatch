from rest_framework import serializers
from .models import Matches
from ResearchSwipe.serializers import RecruiteeSerializer


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

class ProfileInteractionSerializer(serializers.ModelSerializer):
    study_id = serializers.ReadOnlyField(source='study.study_id')
    study_name = serializers.ReadOnlyField(source='study.name')
    user_id = serializers.ReadOnlyField(source='user.user_id')
    recruitee_status = serializers.ChoiceField(choices=Matches.STATUS_CHOICES, default='pending')
    study_status = serializers.ChoiceField(choices=Matches.STATUS_CHOICES, default='pending')
    recruitee = CustomRecruiteeSerializer(source='user', read_only=True)

    class Meta:
        model = Matches
        fields = ('match_id', 'study_id', 'study_name', 'user_id', 'recruitee_status', 'study_status', 'recruitee')


    def update(self, instance, validated_data):
        instance.recruitee_status = validated_data.get('recruitee_status', instance.recruitee_status)
        instance.study_status = validated_data.get('study_status', instance.study_status)
        instance.save()
        return instance
