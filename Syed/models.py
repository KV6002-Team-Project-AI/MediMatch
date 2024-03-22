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

# Define models for each checkbox specific field
class BiologicalSex(models.Model):
    name = models.CharField(max_length=100)

class HairColor(models.Model):
    name = models.CharField(max_length=100)

class Profession(models.Model):
    name = models.CharField(max_length=100)

class Ethnicity(models.Model):
    name = models.CharField(max_length=100)

class Nationality(models.Model):
    name = models.CharField(max_length=100)

class PregnancyStatus(models.Model):
    name = models.CharField(max_length=100)

class LanguagePreference(models.Model):
    name = models.CharField(max_length=255)

class ActivityLevel(models.Model):
    name = models.CharField(max_length=100)

class SocioeconomicStatus(models.Model):
    name = models.CharField(max_length=100)

class HealthStatus(models.Model):
    name = models.CharField(max_length=50)

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

