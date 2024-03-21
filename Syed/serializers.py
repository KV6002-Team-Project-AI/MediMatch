from rest_framework import serializers
from .models import Study, MedicalHistory, MedicationHistory, CurrentMedication, FamilyMedicalHistory, Allergy, Lifestyle

class MedicalHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalHistory
        fields = ['name']

class MedicationHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicationHistory
        fields = ['name']

class CurrentMedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentMedication
        fields = ['name']

class FamilyMedicalHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FamilyMedicalHistory
        fields = ['name']

class AllergySerializer(serializers.ModelSerializer):
    class Meta:
        model = Allergy
        fields = ['name']

class LifestyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lifestyle
        fields = ['name']

class StudySerializer(serializers.ModelSerializer):
    medical_history = MedicalHistorySerializer(many=True, read_only=True)
    medication_history = MedicationHistorySerializer(many=True, read_only=True)
    current_medication = CurrentMedicationSerializer(many=True, read_only=True)
    family_medication_history = FamilyMedicalHistorySerializer(many=True, read_only=True)
    allergies = AllergySerializer(many=True, read_only=True)
    lifestyle = LifestyleSerializer(many=True, read_only=True)

    class Meta:
        model = Study
        fields = [
            'user', 
            'study_id',
            'name', 
            'category', 
            'description', 
            'start_date',
            'duration', 
            'expiry_date', 
            'work_preference',

            # numericals
            'min_age', 
            'max_age', 
            'min_height', 
            'max_height', 
            'min_weight', 
            'max_weight', 
            
            # trivial
            'biological_sex', 
            'hair_color', 
            'profession', 
            'ethnicity', 
            'nationality', 
            'pregnancy_status',
            'language_preference', 
            'activity_level', 
            'socioeconomic_status', 
            'health_status', 

            # NLP 
            'medical_history', 
            'medication_history', 
            'current_medication', 
            'family_medication_history',
            'allergies', 
            'lifestyle', 
        ]

    def create(self, validated_data):
        medical_history_data = validated_data.pop('medical_history', [])
        medication_history_data = validated_data.pop('medication_history', [])
        current_medication_data = validated_data.pop('current_medication', [])
        family_medication_history_data = validated_data.pop('family_medication_history', [])
        allergies_data = validated_data.pop('allergies', [])
        lifestyle_data = validated_data.pop('lifestyle', [])

        study = Study.objects.create(**validated_data)

        for history_data in medical_history_data:
            MedicalHistory.objects.create(study=study, **history_data)

        for history_data in medication_history_data:
            MedicationHistory.objects.create(study=study, **history_data)

        for medication_data in current_medication_data:
            CurrentMedication.objects.create(study=study, **medication_data)

        for history_data in family_medication_history_data:
            FamilyMedicalHistory.objects.create(study=study, **history_data)

        for allergy_data in allergies_data:
            Allergy.objects.create(study=study, **allergy_data)

        for lifestyle_data in lifestyle_data:
            Lifestyle.objects.create(study=study, **lifestyle_data)

        return study





