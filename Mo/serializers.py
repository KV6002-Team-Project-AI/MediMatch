from rest_framework import serializers
from .models import Matches
<<<<<<< Updated upstream
from ResearchSwipe.serializers import RecruiteeSerializer
from Syed.serializers import StudySerializer

class ProfileInteractionSerializer(serializers.ModelSerializer):
    study = StudySerializer(read_only=True)
    recruitee = RecruiteeSerializer(read_only=True)

    class Meta:
        model = Matches
        fields = ('match_id', 'study', 'recruitee', 'recruitee_status', 'study_status')
=======

class MatchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matches
        fields = ('match_id', 'study', 'recruitee', 'status')
>>>>>>> Stashed changes
