from rest_framework import serializers
from .models import Study

class StudySerializer(serializers.ModelSerializer):

    class Meta:
        model = Study
        fields = ('user', 
                  'name',
                  'category',
                  'description',
                  'age',
                  'sex',
                  'height',
                  'weight',
                  'hair_color',
                  'profession',
                  'race',
                  'ethnicity',
                  'nationality',
                  'pregnancy_status',
                  'language_preference',
                  'activity_level',
                  'socioeconomic_status',
                  'start_date',
                  'duration',
                  'expiry_date',
                  'has_medical_history',
                  'medical_history',
                  'has_medication_history',
                  'medication_history',
                  'has_current_medication',
                  'current_medication',
                  'has_family_medication_history',
                  'family_medication_history',
                  'has_allergies',
                  'allergies',
                  'has_liftstyle',
                  'liftstyle'
                 )
        
        def create(self, validated_data):
            ...
        
