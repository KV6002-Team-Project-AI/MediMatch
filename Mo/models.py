from django.db import models
from ResearchSwipe.models import Recruitee
<<<<<<< Updated upstream
from Syed.models import Study

class Matches(models.Model):
    match_id = models.AutoField(primary_key=True)
    study = models.ForeignKey(Study, on_delete=models.CASCADE, related_name='study_interactions', null=True, blank=True)
    recruitee = models.ForeignKey(Recruitee, on_delete=models.CASCADE, related_name='recruitee_interactions')

    STATUS_CHOICES = [
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]

    recruitee_status = models.CharField(
        max_length=8,
        choices=STATUS_CHOICES,
        default='rejected',  # Default to 'rejected'
        help_text='Accepted/Rejected status of the recruitee'
    )
    study_status = models.CharField(
        max_length=8,
        choices=STATUS_CHOICES,
        default='rejected',  # Default to 'rejected'
        help_text='Accepted/Rejected status of the study'
    )

    class Meta:
        unique_together = ('study', 'recruitee')
=======
from Syed.models import Study 

class Matches(models.Model):
    match_id = models.AutoField(primary_key=True)
    study = models.ForeignKey(Study, on_delete=models.CASCADE, related_name='interactions', null=True, blank=True)
    recruitee = models.ForeignKey(Recruitee, on_delete=models.CASCADE, related_name='interactions')
    recruitee_status = models.BooleanField(default=False, help_text='True for accepted, False for rejected')
    study_status = models.BooleanField(default=False, help_text='True for accepted, False for rejected')
    # Prevent duplicate interactions for simplicity
    class Meta:
        unique_together = ('study', 'recruitee')
>>>>>>> Stashed changes
