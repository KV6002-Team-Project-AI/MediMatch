from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from ResearchSwipe.models import Recruitee, Recruiter
from Syed.models import Study

# Matches model to track and manage the relationships between Recruitees and Studies.

class Matches(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]


    # Unique identifier for each match
    match_id = models.AutoField(primary_key=True)
    # Link to Recruitee class 
    user = models.ForeignKey(Recruitee, on_delete=models.CASCADE, related_name='user_interactions', null=True)
    recruiter = models.ForeignKey(Recruiter, on_delete=models.CASCADE, related_name='recruiter_interactions', null=True)
    # Link to Study class 
    study = models.ForeignKey(Study, on_delete=models.CASCADE, related_name='study_interactions')
    # Match status from recruitee's view
    recruitee_status = models.CharField(max_length=8, choices=STATUS_CHOICES, default='pending')
    # Match status from study's view
    study_status = models.CharField(max_length=8, choices=STATUS_CHOICES, default='pending')
    # Get reruitee rank 
    recruitee_rank = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)], default=0)
    study_rank = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)], default=0)
