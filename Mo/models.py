"""
Models module for managing matches between recruitees and studies.

This module defines the Matches model, which is central to tracking and managing the relationships between recruitees and studies within the platform.
The model includes fields for status, ranking, and foreign keys linking to the recruitee, recruiter, and study models.

Class Matches:
- Represents a many-to-many relationship between recruitees and studies with additional information about the match status and ranking.
- `STATUS_CHOICES`: A list of possible statuses for a match, including pending, accepted, rejected, and expired, to reflect the current state of the match.
- `match_id`: An auto-incrementing primary key that serves as a unique identifier for each match.
- `user`: A foreign key link to the Recruitee model, indicating the recruitee involved in the match. Null values are allowed to enable certain database operations.
- `recruiter`: A foreign key link to the Recruiter model, indicating the recruiter responsible for the match. Null values are allowed for flexibility in match management.
- `study`: A foreign key link to the Study model, specifying the study involved in the match.
- `recruitee_status` and `study_status`: CharFields that store the status of the match from the perspective of the recruitee and the study, respectively.
- `ranking`: A PositiveIntegerField that represents the match's ranking, used to prioritize matches. It is validated to be within 1 and 100, inclusively, with a default value of 0.

Dependencies:
- django.db.models: Base model class and field types from Django's ORM.
- django.core.validators.MinValueValidator, MaxValueValidator: Validator functions to enforce minimum and maximum values on the ranking field.
- ResearchSwipe.models.Recruitee, Recruiter: Models representing recruitees and recruiters.
- Syed.models.Study: Model representing studies.

Usage:
The Matches model is intended to be used in the platform's backend to facilitate the matchmaking process between recruitees and studies. 
It can be utilized in views and services that require access to match data, such as generating match lists, updating match statuses, and computing match rankings.
"""

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from ResearchSwipe.models import Recruitee, Recruiter
from Syed.models import Study


class Matches(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ('expired', 'Expired'),
    ]


    match_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Recruitee, on_delete=models.CASCADE, related_name='user_interactions', null=True)
    recruiter = models.ForeignKey(Recruiter, on_delete=models.CASCADE, related_name='recruiter_interactions', null=True)
    study = models.ForeignKey(Study, on_delete=models.CASCADE, related_name='study_interactions')
    recruitee_status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    study_status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    ranking = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)], default=0)
