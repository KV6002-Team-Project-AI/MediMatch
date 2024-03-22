from rest_framework import serializers
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
    medical_history = MedicalHistorySerializer(many=True, read_only=True)
    medication_history = MedicationHistorySerializer(many=True, read_only=True)
    current_medication = CurrentMedicationSerializer(many=True, read_only=True)
    family_medication_history = FamilyMedicalHistorySerializer(many=True, read_only=True)
    allergies = AllergySerializer(many=True, read_only=True)
    lifestyle = LifestyleSerializer(many=True, read_only=True)
    biological_sex = BiologicalSexSerializer(many=True, read_only=True)
    hair_color = HairColorSerializer(many=True, read_only=True)
    profession = ProfessionSerializer(many=True, read_only=True)
    ethnicity = EthnicitySerializer(many=True, read_only=True)
    nationality = NationalitySerializer(many=True, read_only=True)
    pregnancy_status = PregnancyStatusSerializer(many=True, read_only=True)
    language_preference = LanguagePreferenceSerializer(many=True, read_only=True)
    activity_level = ActivityLevelSerializer(many=True, read_only=True)
    socioeconomic_status = SocioeconomicStatusSerializer(many=True, read_only=True)
    health_status = HealthStatusSerializer(many=True, read_only=True)

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
        medical_history_data = validated_data.pop('medical_history', [])
        medication_history_data = validated_data.pop('medication_history', [])
        current_medication_data = validated_data.pop('current_medication', [])
        family_medication_history_data = validated_data.pop('family_medication_history', [])
        allergies_data = validated_data.pop('allergies', [])
        lifestyle_data = validated_data.pop('lifestyle', [])
        biological_sex_data = validated_data.pop('biological_sex', [])
        hair_color_data = validated_data.pop('hair_color', [])
        profession_data = validated_data.pop('profession', [])
        ethnicity_data = validated_data.pop('ethnicity', [])
        nationality_data = validated_data.pop('nationality', [])
        pregnancy_status_data = validated_data.pop('pregnancy_status', [])
        language_preference_data = validated_data.pop('language_preference', [])
        activity_level_data = validated_data.pop('activity_level', [])
        socioeconomic_status_data = validated_data.pop('socioeconomic_status', [])
        health_status_data = validated_data.pop('health_status', [])

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

        for sex_data in biological_sex_data:
            BiologicalSex.objects.create(study=study, **sex_data)

        for color_data in hair_color_data:
            HairColor.objects.create(study=study, **color_data)

        for profession_data in profession_data:
            Profession.objects.create(study=study, **profession_data)

        for ethnicity_data in ethnicity_data:
            Ethnicity.objects.create(study=study, **ethnicity_data)

        for nationality_data in nationality_data:
            Nationality.objects.create(study=study, **nationality_data)

        for pregnancy_data in pregnancy_status_data:
            PregnancyStatus.objects.create(study=study, **pregnancy_data)

        for language_data in language_preference_data:
            LanguagePreference.objects.create(study=study, **language_data)

        for activity_data in activity_level_data:
            ActivityLevel.objects.create(study=study, **activity_data)

        for socioeconomic_data in socioeconomic_status_data:
            SocioeconomicStatus.objects.create(study=study, **socioeconomic_data)

        for health_data in health_status_data:
            HealthStatus.objects.create(study=study, **health_data)

        return study