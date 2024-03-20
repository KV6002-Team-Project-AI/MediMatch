from rest_framework import serializers
from .models import Matches
from ResearchSwipe.serializers import RecruiteeSerializer
from Syed.serializers import StudySerializer

class ProfileInteractionSerializer(serializers.ModelSerializer):
    study = StudySerializer(read_only=True)
    recruitee = RecruiteeSerializer(read_only=True)

    class Meta:
        model = Matches
        fields = ('id', 'study', 'recruitee', 'recruitee_status', 'study_status')
