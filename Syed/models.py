# Author: Syed Wajahat Quadri (w21043564)
from django.db import models
from django.conf import settings
from ResearchSwipe.datavalidation import *


class Study(models.Model):
    """
    Represents a study model.

    Attributes:
        user (ForeignKey): The user associated with the study.
        study_id (AutoField): The unique identifier for the study.
        name (TextField): The name of the study.
        description (TextField): The description of the study.
        start_date (DateField): The start date of the study.
        expiry_date (DateField): The expiry date of the study.
        isExpired (BooleanField): Indicates if the study has expired.
        category (TextField): The category of the study.
        work_preference (CharField): The work preference for the study.
        duration (CharField): The duration of the study.
        min_age (PositiveIntegerField): The minimum age requirement for participants.
        max_age (PositiveIntegerField): The maximum age requirement for participants.
        min_height (PositiveIntegerField): The minimum height requirement for participants.
        max_height (PositiveIntegerField): The maximum height requirement for participants.
        min_weight (PositiveIntegerField): The minimum weight requirement for participants.
        max_weight (PositiveIntegerField): The maximum weight requirement for participants.
        biological_sex (ManyToManyField): The biological sexes applicable to the study.
        hair_color (ManyToManyField): The hair colors applicable to the study.
        profession (ManyToManyField): The professions applicable to the study.
        ethnicity (ManyToManyField): The ethnicities applicable to the study.
        nationality (ManyToManyField): The nationalities applicable to the study.
        pregnancy_status (ManyToManyField): The pregnancy statuses applicable to the study.
        language_preference (ManyToManyField): The language preferences applicable to the study.
        activity_level (ManyToManyField): The activity levels applicable to the study.
        socioeconomic_status (ManyToManyField): The socioeconomic statuses applicable to the study.
        health_status (ManyToManyField): The health statuses applicable to the study.
        medical_history (ManyToManyField): The medical histories applicable to the study.
        medication_history (ManyToManyField): The medication histories applicable to the study.
        current_medication (ManyToManyField): The current medications applicable to the study.
        family_medication_history (ManyToManyField): The family medical histories applicable to the study.
        allergies (ManyToManyField): The allergies applicable to the study.
        lifestyle (ManyToManyField): The lifestyles applicable to the study.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    study_id = models.AutoField(primary_key=True)
    name = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    expiry_date = models.DateField(null=True, blank=True)
    isExpired = models.BooleanField(default=False)

    #DropDown Specific
    category = models.TextField(null=True, blank=True)
    work_preference = models.CharField(max_length=50, null=True, blank=True)
    duration = models.CharField(max_length=100, null=True, blank=True)

    # Trivial
    min_age = models.PositiveIntegerField(null=True, blank=True)
    max_age = models.PositiveIntegerField(null=True, blank=True)
    min_height = models.PositiveIntegerField(null=True, blank=True)
    max_height = models.PositiveIntegerField(null=True, blank=True)
    min_weight = models.PositiveIntegerField(null=True, blank=True)
    max_weight = models.PositiveIntegerField(null=True, blank=True)

    # Checkbox Specific
    biological_sex = models.ManyToManyField('BiologicalSex', blank=True)
    hair_color = models.ManyToManyField('HairColor', blank=True)
    profession = models.ManyToManyField('Profession', blank=True)
    ethnicity = models.ManyToManyField('Ethnicity', blank=True)
    nationality = models.ManyToManyField('Nationality', blank=True)
    pregnancy_status = models.ManyToManyField('PregnancyStatus', blank=True)
    language_preference = models.ManyToManyField('LanguagePreference', blank=True)
    activity_level = models.ManyToManyField('ActivityLevel', blank=True)
    socioeconomic_status = models.ManyToManyField('SocioeconomicStatus', blank=True)
    health_status = models.ManyToManyField('HealthStatus', blank=True)

    # NLP related
    medical_history = models.ManyToManyField('MedicalHistory', blank=True)
    medication_history = models.ManyToManyField('MedicationHistory', blank=True)
    current_medication = models.ManyToManyField('CurrentMedication', blank=True)
    family_medication_history = models.ManyToManyField('FamilyMedicalHistory', blank=True)
    allergies = models.ManyToManyField('Allergy', blank=True)
    lifestyle = models.ManyToManyField('Lifestyle', blank=True)


class BiologicalSex(models.Model):
    """
    Represents biological sexes.

    Attributes:
        name (CharField): The name of the biological sex.
    """
    name = models.CharField(max_length=100)


class HairColor(models.Model):
    """
    Represents hair colors.

    Attributes:
        name (CharField): The name of the hair color.
    """
    name = models.CharField(max_length=100)


class Profession(models.Model):
    """
    Represents professions.

    Attributes:
        name (CharField): The name of the profession.
    """
    name = models.CharField(max_length=100)


class Ethnicity(models.Model):
    """
    Represents ethnicities.

    Attributes:
        name (CharField): The name of the ethnicity.
    """
    name = models.CharField(max_length=100)


class Nationality(models.Model):
    """
    Represents nationalities.

    Attributes:
        name (CharField): The name of the nationality.
    """
    name = models.CharField(max_length=100)


class PregnancyStatus(models.Model):
    """
    Represents pregnancy statuses.

    Attributes:
        name (CharField): The name of the pregnancy status.
    """
    name = models.CharField(max_length=100)


class LanguagePreference(models.Model):
    """
    Represents language preferences.

    Attributes:
        name (CharField): The name of the language preference.
    """
    name = models.CharField(max_length=255)


class ActivityLevel(models.Model):
    """
    Represents activity levels.

    Attributes:
        name (CharField): The name of the activity level.
    """
    name = models.CharField(max_length=100)


class SocioeconomicStatus(models.Model):
    """
    Represents socioeconomic statuses.

    Attributes:
        name (CharField): The name of the socioeconomic status.
    """
    name = models.CharField(max_length=100)


class HealthStatus(models.Model):
    """
    Represents health statuses.

    Attributes:
        name (CharField): The name of the health status.
    """
    name = models.CharField(max_length=50)


class MedicalHistory(models.Model):
    """
    Represents medical histories.

    Attributes:
        name (CharField): The name of the medical history.
    """
    name = models.CharField(max_length=100)


class MedicationHistory(models.Model):
    """
    Represents medication histories.

    Attributes:
        name (CharField): The name of the medication history.
    """
    name = models.CharField(max_length=100)


class CurrentMedication(models.Model):
    """
    Represents current medications.

    Attributes:
        name (CharField): The name of the current medication.
    """
    name = models.CharField(max_length=100)


class FamilyMedicalHistory(models.Model):
    """
    Represents family medical histories.

    Attributes:
        name (CharField): The name of the family medical history.
    """
    name = models.CharField(max_length=100)


class Allergy(models.Model):
    """
    Represents allergies.

    Attributes:
        name (CharField): The name of the allergy.
    """
    name = models.CharField(max_length=100)


class Lifestyle(models.Model):
    """
    Represents lifestyles.

    Attributes:
        name (CharField): The name of the lifestyle.
    """
    name = models.CharField(max_length=100)
