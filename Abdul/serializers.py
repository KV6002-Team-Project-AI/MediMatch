from rest_framework import serializers
from ResearchSwipe.serializers import RecruiteeSerializer
from .models import RecruiteeSummary
from django.db import models
from ResearchSwipe.models import Recruitee

# Fields I need
class CustomRecruiteeSerializer(RecruiteeSerializer):
    class Meta(RecruiteeSerializer.Meta):
        fields = (
            'user',
            'full_name',
            'age',
            'biological_sex',
            'profession',
            'nationality',
            'height',
            'weight',
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
            'lifestyle_factors',
            'work_preference',
            'socioeconomic_status'
        )

class summarySerializer (models.Model):
    summary = serializers.ReadOnlyField(source="recruitee")

    recruitee_info = CustomRecruiteeSerializer(source='recruitee', read_only=True)

    class Meta:
        model = RecruiteeSummary
        fields = ('id', 'summary', 'recruitee_info')
    