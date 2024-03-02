from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Common fields
    is_recruitee = models.BooleanField(default=False)
    is_recruiter = models.BooleanField(default=False)
    # Add other common fields if needed

class Recruitee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    age = models.PositiveIntegerField()
    ethnicity = models.CharField(max_length=100)
    height = models.PositiveIntegerField()
    # Add other recruitee-specific fields

class Recruiter(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    research_area = models.TextField()
    company_info = models.TextField()
    # Add other recruiter-specific fields
