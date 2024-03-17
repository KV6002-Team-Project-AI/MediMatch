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
            'user', 'name', 'category', 'description', 'age', 'sex', 'height', 'weight',
            'hair_color', 'profession', 'ethnicity', 'nationality', 'pregnancy_status',
            'language_preference', 'activity_level', 'socioeconomic_status', 'start_date',
            'duration', 'expiry_date', 'has_medical_history', 'medical_history',
            'has_medication_history', 'medication_history', 'has_current_medication',
            'current_medication', 'has_family_medication_history', 'family_medication_history',
            'has_allergies', 'allergies', 'has_lifestyle', 'lifestyle'
        ]





