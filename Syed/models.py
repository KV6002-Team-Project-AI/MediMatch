from django.db import models
from django.conf import settings
from ResearchSwipe.datavalidation import (NATIONALITY_CHOICES, ETHNICITY_CHOICES, ACTIVITY_LEVEL_CHOICES, HAIR_COLOR_CHOICES, 
                            HEALTH_STATUS_CHOICES, SOCIOECONOMIC_STATUS_CHOICES, MEASUREMENT_CHOICES, GROUP_CHOICES, 
                            PREGNANCY_STATUS_CHOICES, LANGUAGE_CHOICES, PROFESSION_CHOICES, SEX_CHOICES, DURATION_CHOICES)


class Study(models.Model):
    # Trivial
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    height = models.PositiveIntegerField(null=True, blank=True)
    weight = models.PositiveIntegerField(null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    duration = models.PositiveIntegerField(null=True, blank=True)
    expiry_date = models.DateField(null=True, blank=True)

    #DropDown Specific
    category = models.TextField(null=True, blank=True)
    sex = models.CharField(max_length=100, null=True, blank=True)
    hair_color = models.CharField(max_length=100, null=True, blank=True)
    profession = models.CharField(max_length=100, null=True, blank=True)
    ethnicity = models.CharField(max_length=100, null=True, blank=True)
    nationality = models.CharField(max_length=100, null=True, blank=True)
    pregnancy_status = models.CharField(max_length=100, null=True, blank=True)
    language_preference = models.CharField(max_length=255, null=True, blank=True)
    activity_level = models.CharField(max_length=100, null=True, blank=True)
    socioeconomic_status = models.CharField(max_length=100, null=True, blank=True)
    
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