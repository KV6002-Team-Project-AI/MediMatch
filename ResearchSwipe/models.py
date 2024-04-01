# This is All Jeds code
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from .datavalidation import *
from django.utils import timezone
from django.conf import settings




class UserManager(BaseUserManager):
    use_in_migrations = True
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email=email, password=password, **extra_fields)




class Report(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('resolved', 'Resolved'),
    )

    reporter = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='reported', on_delete=models.CASCADE)
    reported_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='reports', on_delete=models.CASCADE)
    reason = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    message = models.TextField(null=True, blank=True)
    screenshot = models.ImageField(upload_to='report_screenshots/', blank=True, null=True)

class User(AbstractUser):
   
    is_recruitee = models.BooleanField(default=False)
    is_recruiter = models.BooleanField(default=False)
    email = models.EmailField(unique=True)
    is_verified = models.BooleanField(default=False)

    # New field for profile image
    profile_image = models.ImageField(upload_to='profile_images/',null=True, blank=True,)
    
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
    summary = models.TextField(max_length=200, blank=True, null=True)

class Recruiter(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    research_area = models.TextField()
    company_info = models.TextField()
    # Add other recruiter-specific fields


# For tracking individual page views and visit durations
class PageView(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='page_views')
    page_url = models.URLField()
    entry_time = models.DateTimeField(default=timezone.now)
    exit_time = models.DateTimeField(null=True, blank=True)
    duration = models.DurationField(null=True, blank=True)  # Calculated automatically

    def save(self, *args, **kwargs):
        if self.entry_time and self.exit_time:
            self.duration = self.exit_time - self.entry_time
        super(PageView, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.email} viewed {self.page_url}"

# For tracking user actions like clicks, scrolls, etc.
class UserAction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='actions')
    action_type = models.CharField(max_length=50)  # e.g., 'click', 'scroll'
    element_id = models.CharField(max_length=100, null=True, blank=True)  # The HTML element interacted with
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} {self.action_type} on {self.element_id}"

# For tracking performance metrics like page load times
class PerformanceMetric(models.Model):
    page_url = models.URLField()
    metric_type = models.CharField(max_length=50)  # e.g., 'load_time', 'first_byte', 'time_to_interactive'
    value = models.FloatField()  # The measured value for this metric
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.metric_type} for {self.page_url} = {self.value}"
    
class TrafficSource(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='traffic_sources')
    source = models.CharField(max_length=100)  # e.g., 'Google', 'Facebook', 'Direct'
    timestamp = models.DateTimeField(auto_now_add=True)

class ContentInteraction(models.Model):
    content_type = models.CharField(max_length=100)  # e.g., 'Article', 'Video'
    action = models.CharField(max_length=50)  # e.g., 'Like', 'Share', 'Comment'
    timestamp = models.DateTimeField(auto_now_add=True)

class ErrorLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    error_message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)


