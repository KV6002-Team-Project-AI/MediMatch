from django.db import models
from django.conf import settings
from ResearchSwipe.datavalidation import *

class Study(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    expiry_date = models.DateField(null=True, blank=True)

    # Trivial
    age = models.PositiveIntegerField(null=True, blank=True)
    height = models.PositiveIntegerField(null=True, blank=True)
    weight = models.PositiveIntegerField(null=True, blank=True)

    #DropDown Specific
    category = models.TextField(null=True, choices=STUDY_PREFERENCE_CHOICES, blank=True)
    sex = models.CharField(max_length=100, choices=SEX_CHOICES, null=True, blank=True)
    hair_color = models.CharField(max_length=100, choices=HAIR_COLOR_CHOICES, null=True, blank=True)
    profession = models.CharField(max_length=100, choices=PROFESSION_CHOICES, null=True, blank=True)
    ethnicity = models.CharField(max_length=100, choices=ETHNICITY_CHOICES, null=True, blank=True)
    nationality = models.CharField(max_length=100, choices=NATIONALITY_CHOICES, null=True, blank=True)
    pregnancy_status = models.CharField(max_length=100, choices=PREGNANCY_STATUS_CHOICES, null=True, blank=True)
    language_preference = models.CharField(max_length=255, choices=LANGUAGE_CHOICES, null=True, blank=True)
    activity_level = models.CharField(max_length=100, choices=ACTIVITY_LEVEL_CHOICES, null=True, blank=True)
    socioeconomic_status = models.CharField(max_length=100, choices=SOCIOECONOMIC_STATUS_CHOICES, null=True, blank=True)
    duration = models.PositiveIntegerField(null=True, choices=DURATION_CHOICES, blank=True)
    health_status = models.CharField(max_length=50, choices=HEALTH_STATUS_CHOICES, null=True, blank=True)
    work_preference = models.CharField(max_length=50, choices=GROUP_CHOICES, null=True, blank=True)

    # NLP related
    has_medical_history = models.BooleanField(default=False)
    medical_history = models.ManyToManyField('MedicalHistory', blank=True)
    has_medication_history = models.BooleanField(default=False)
    medication_history = models.ManyToManyField('MedicationHistory', blank=True)
    has_current_medication = models.BooleanField(default=False)
    current_medication = models.ManyToManyField('CurrentMedication', blank=True)
    has_family_medication_history = models.BooleanField(default=False)
    family_medication_history = models.ManyToManyField('FamilyMedicalHistory', blank=True)
    has_allergies = models.BooleanField(default=False)
    allergies = models.ManyToManyField('Allergy', blank=True)
    has_lifestyle = models.BooleanField(default=False) 
    lifestyle = models.ManyToManyField('Lifestyle', blank=True)

class MedicalHistory(models.Model):
    name = models.CharField(max_length=100)

class MedicationHistory(models.Model):
    name = models.CharField(max_length=100)

class CurrentMedication(models.Model):
    name = models.CharField(max_length=100)

class FamilyMedicalHistory(models.Model):
    name = models.CharField(max_length=100)

class Allergy(models.Model):
    name = models.CharField(max_length=100)

class Lifestyle(models.Model):
    name = models.CharField(max_length=100)