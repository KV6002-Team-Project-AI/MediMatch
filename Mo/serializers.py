from rest_framework import serializers
from .models import Matches
from ResearchSwipe.serializers import RecruiteeSerializer
from Syed.serializers import StudySerializer

class ProfileInteractionSerializer(serializers.ModelSerializer):
    study = StudySerializer(read_only=True)
    recruitee = RecruiteeSerializer(read_only=True)

    class Meta:
        model = Matches
        fields = ('match_id', 'study', 'recruitee', 'recruitee_status', 'study_status')

    def update(self, instance, validated_data):
        instance.recruitee_status = validated_data.get('recruitee_status', instance.recruitee_status)
        instance.study_status = validated_data.get('study_status', instance.study_status)
        instance.save()
        return instance