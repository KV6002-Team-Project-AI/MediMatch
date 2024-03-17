from django.contrib.auth.models import AbstractUser
from django.db import models
from DataValidation import (NATIONALITY_CHOICES, ETHNICITY_CHOICES, ACTIVITY_LEVEL_CHOICES, HAIR_COLOR_CHOICES, 
                            HEALTH_STATUS_CHOICES, SOCIOECONOMIC_STATUS_CHOICES, MEASUREMENT_CHOICES, GROUP_CHOICES, 
                            PREGNANCY_STATUS_CHOICES, LANGUAGE_CHOICES, PROFESSION_CHOICES, SEX_CHOICES, DURATION_CHOICES)



class User(AbstractUser):
    # Common fields
    is_recruitee = models.BooleanField(default=False)
    is_recruiter = models.BooleanField(default=False)
    # Add other common fields if needed

class Recruitee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    contact_information = models.TextField(null=True, blank=True)
    emergency_contact = models.TextField(null=True, blank=True)

    # NLP related TextFeilds
    # Conditional detail fields
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
    #End of Conditional detail fields
    lifestyle_factors = models.TextField(null=True, blank=True)
    #End of NLP related TextFeilds

    #DropDown Specific
    health_status = models.CharField(max_length=50, choices=HEALTH_STATUS_CHOICES, null=True, blank=True)
    activity_level = models.CharField(max_length=50, choices=ACTIVITY_LEVEL_CHOICES, null=True, blank=True)
    socioeconomic_status = models.CharField(max_length=50, choices=SOCIOECONOMIC_STATUS_CHOICES, null=True, blank=True)
    hair_color = models.CharField(max_length=50, choices=HAIR_COLOR_CHOICES, null=True, blank=True)
    ethnicity = models.CharField(max_length=100, choices=ETHNICITY_CHOICES, null=True, blank=True)
    work_preference = models.CharField(max_length=50, choices=GROUP_CHOICES, null=True, blank=True)
    nationality = models.CharField(max_length=100, choices=NATIONALITY_CHOICES, null=True, blank=True)
    language_preferences = models.CharField(max_length=255, choices=LANGUAGE_CHOICES, null=True, blank=True)
    profession = models.CharField(max_length=255, choices=PROFESSION_CHOICES, null=True, blank=True)
    duration_of_participation = models.CharField(max_length=20, choices=DURATION_CHOICES, null=True, blank=True)
    biological_sex = models.CharField(max_length=50, choices=SEX_CHOICES, null=True, blank=True)
    pregnancy_status = models.CharField(max_length=3,choices=PREGNANCY_STATUS_CHOICES ,null=True, blank=True)
    # Measurement system preference
    measurement_system = models.CharField(max_length=20, choices=MEASUREMENT_CHOICES, default='metric')
    #End of DropDown

    #Dependant on measurment choice
    height = models.PositiveIntegerField(null=True, blank=True)  # Store based on the measurement system preference
    weight = models.PositiveIntegerField(null=True, blank=True)  # Store based on the measurement system preference
    #End of measurment choice dependants
    
    #This is when the recuiter confirms if the user attended 
    participation_history = models.IntegerField(default=0, null=True, blank=True)



    # Add other recruitee-specific fields if needed

class Recruiter(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    research_area = models.TextField()
    company_info = models.TextField()
    # Add other recruiter-specific fields


