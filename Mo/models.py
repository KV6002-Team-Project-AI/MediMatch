from django.db import models
from ResearchSwipe.models import Recruitee
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

