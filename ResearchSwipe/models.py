from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from .datavalidation import *



class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        """
        Create and save a regular User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.username = email  # Assuming you want to keep username same as email
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Create and save a Superuser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    # Use the custom user manager
    objects = UserManager()

    # Your custom fields
    is_recruitee = models.BooleanField(default=False)
    is_recruiter = models.BooleanField(default=False)

    # Make sure email is unique
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.email

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
    bio = models.TextField(null=True, blank=True)
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
    study_preference = models.CharField(max_length=100,choices=STUDY_PREFERENCE_CHOICES, null=True, blank=True)
    interest_1 = models.CharField(max_length=50, choices=INTEREST_CHOICES, null=True, blank=True)
    interest_2 = models.CharField(max_length=50, choices=INTEREST_CHOICES, null=True, blank=True)
    interest_3 = models.CharField(max_length=50, choices=INTEREST_CHOICES, null=True, blank=True)
    interest_4 = models.CharField(max_length=50, choices=INTEREST_CHOICES, null=True, blank=True)
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


