from rest_framework import serializers
from .models import Matches
from ResearchSwipe.serializers import RecruiteeSerializer
from Syed.serializers import StudySerializer

class ProfileInteractionSerializer(serializers.ModelSerializer):
    study_id = serializers.ReadOnlyField(source='study.study_id')
    user_id = serializers.ReadOnlyField(source='user.user_id')
    recruitee_status = serializers.ChoiceField(choices=Matches.STATUS_CHOICES, default='pending')
    study_status = serializers.ChoiceField(choices=Matches.STATUS_CHOICES, default='pending')

    class Meta:
        model = Matches
        fields = ('match_id', 'study_id', 'user_id', 'recruitee_status', 'study_status')  # Include 'user_id' here

    def update(self, instance, validated_data):
        instance.recruitee_status = validated_data.get('recruitee_status', instance.recruitee_status)
        instance.study_status = validated_data.get('study_status', instance.study_status)
        instance.save()
        return instance
