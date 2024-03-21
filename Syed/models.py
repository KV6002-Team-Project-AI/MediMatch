from django.db import models
from django.conf import settings
from ResearchSwipe.datavalidation import *

class Study(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    study_id = models.AutoField(primary_key=True)
    name = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    expiry_date = models.DateField(null=True, blank=True)

    # Trivial
    min_age = models.PositiveIntegerField(null=True, blank=True)
    max_age = models.PositiveIntegerField(null=True, blank=True)
    min_height = models.PositiveIntegerField(null=True, blank=True)
    max_height = models.PositiveIntegerField(null=True, blank=True)
    min_weight = models.PositiveIntegerField(null=True, blank=True)
    max_weight = models.PositiveIntegerField(null=True, blank=True)
    
    #DropDown Specific
    category = models.TextField(null=True, blank=True)
    work_preference = models.CharField(max_length=50, null=True, blank=True)
    duration = models.CharField(max_length=100, null=True, blank=True)

    # Checkbox Specific
    biological_sex = models.CharField(max_length=100, null=True, blank=True)
    hair_color = models.CharField(max_length=100, null=True, blank=True)
    profession = models.CharField(max_length=100, null=True, blank=True)
    ethnicity = models.CharField(max_length=100, null=True, blank=True)
    nationality = models.CharField(max_length=100, null=True, blank=True)
    pregnancy_status = models.CharField(max_length=100, null=True, blank=True)
    language_preference = models.CharField(max_length=255, null=True, blank=True)
    activity_level = models.CharField(max_length=100, null=True, blank=True)
    socioeconomic_status = models.CharField(max_length=100, null=True, blank=True)
    health_status = models.CharField(max_length=50, null=True, blank=True)

    # NLP related
    medical_history = models.ManyToManyField('MedicalHistory', blank=True)
    medication_history = models.ManyToManyField('MedicationHistory', blank=True)
    current_medication = models.ManyToManyField('CurrentMedication', blank=True)
    family_medication_history = models.ManyToManyField('FamilyMedicalHistory', blank=True)
    allergies = models.ManyToManyField('Allergy', blank=True)
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