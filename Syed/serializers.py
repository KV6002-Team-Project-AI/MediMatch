from rest_framework import serializers
from django.db import transaction
from .models import Study, MedicalHistory, MedicationHistory, CurrentMedication, FamilyMedicalHistory, Allergy, Lifestyle, BiologicalSex, HairColor, Profession, Ethnicity, Nationality, PregnancyStatus, LanguagePreference, ActivityLevel, SocioeconomicStatus, HealthStatus

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

class BiologicalSexSerializer(serializers.ModelSerializer):
    class Meta:
        model = BiologicalSex
        fields = ['name']

class HairColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = HairColor
        fields = ['name']

class ProfessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profession
        fields = ['name']

class EthnicitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Ethnicity
        fields = ['name']

class NationalitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Nationality
        fields = ['name']

class PregnancyStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = PregnancyStatus
        fields = ['name']

class LanguagePreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LanguagePreference
        fields = ['name']

class ActivityLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityLevel
        fields = ['name']

class SocioeconomicStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocioeconomicStatus
        fields = ['name']

class HealthStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthStatus
        fields = ['name']

class StudySerializer(serializers.ModelSerializer):
    medical_history = MedicalHistorySerializer(many=True, required=False)
    medication_history = MedicationHistorySerializer(many=True, required=False)
    current_medication = CurrentMedicationSerializer(many=True, required=False)
    family_medication_history = FamilyMedicalHistorySerializer(many=True, required=False)
    allergies = AllergySerializer(many=True, required=False)
    lifestyle = LifestyleSerializer(many=True, required=False)
    biological_sex = BiologicalSexSerializer(many=True, required=False)
    hair_color = HairColorSerializer(many=True, required=False)
    profession = ProfessionSerializer(many=True, required=False)
    ethnicity = EthnicitySerializer(many=True, required=False)
    nationality = NationalitySerializer(many=True, required=False)
    pregnancy_status = PregnancyStatusSerializer(many=True, required=False)
    language_preference = LanguagePreferenceSerializer(many=True, required=False)
    activity_level = ActivityLevelSerializer(many=True, required=False)
    socioeconomic_status = SocioeconomicStatusSerializer(many=True, required=False)
    health_status = HealthStatusSerializer(many=True, required=False)

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
            'min_age', 
            'max_age', 
            'min_height', 
            'max_height', 
            'min_weight', 
            'max_weight', 
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
            'medical_history', 
            'medication_history', 
            'current_medication', 
            'family_medication_history',
            'allergies', 
            'lifestyle', 
        ]

    def create(self, validated_data):
        related_data = {field: validated_data.pop(field, []) for field in [
            'medical_history', 'medication_history', 'current_medication',
            'family_medication_history', 'allergies', 'lifestyle',
            'biological_sex', 'hair_color', 'profession', 'ethnicity', 
            'nationality', 'pregnancy_status', 'language_preference',
            'activity_level', 'socioeconomic_status', 'health_status'
        ]}

        study = Study.objects.create(**validated_data)

        for field_name, items in related_data.items():
            field = getattr(study, field_name)
            for item_data in items:
                # For simplicity, assuming item_data contains the ID of existing items
                item_instance = field.model.objects.get(id=item_data['id'])
                field.add(item_instance)

        return study

    def update(self, instance, validated_data):
        # Update many-to-many fields similar to create method, and handle other updates as needed
        return super().update(instance, validated_data)