from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Common fields
    is_recruitee = models.BooleanField(default=False)
    is_recruiter = models.BooleanField(default=False)
    # Add other common fields if needed

class Recruitee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    personal_id = models.CharField(max_length=100, unique=True, null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    biological_sex = models.CharField(max_length=50, null=True, blank=True)
    contact_information = models.TextField(null=True, blank=True)
    emergency_contact = models.TextField(null=True, blank=True)
    informed_consent_status = models.BooleanField(null=True, blank=True)

    # Fields with conditional details
    has_medical_history = models.BooleanField(default=False)
    medical_history_details = models.TextField(null=True, blank=True)

    taking_current_medications = models.BooleanField(default=False)
    current_medication_details = models.TextField(null=True, blank=True)

    has_medication_history = models.BooleanField(default=False)
    medication_history_details = models.TextField(null=True, blank=True)

    has_allergies = models.BooleanField(default=False)
    allergy_details = models.TextField(null=True, blank=True)

    has_family_medical_history = models.BooleanField(default=False)
    family_medical_history_details = models.TextField(null=True, blank=True)

    # Additional fields
    health_status = models.TextField(null=True, blank=True)
    lifestyle_factors = models.TextField(null=True, blank=True)
    socioeconomic_status = models.TextField(null=True, blank=True)
    ethnicity = models.CharField(max_length=100, null=True, blank=True)
    race = models.CharField(max_length=100, null=True, blank=True)
    pregnancy_status = models.CharField(max_length=100, null=True, blank=True)
    language_preferences = models.CharField(max_length=255, null=True, blank=True)
    participation_history = models.TextField(null=True, blank=True)
    consent_form_version = models.CharField(max_length=100, null=True, blank=True)
    date_of_consent = models.DateField(null=True, blank=True)
    study_ids = models.TextField(null=True, blank=True)

    # Add other recruitee-specific fields if needed

class Recruiter(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    research_area = models.TextField()
    company_info = models.TextField()
    # Add other recruiter-specific fields
