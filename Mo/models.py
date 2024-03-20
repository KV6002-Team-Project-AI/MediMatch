from django.db import models
from ResearchSwipe.models import Recruitee
from Syed.models import Study

class Matches(models.Model):
    study = models.ForeignKey(Study, on_delete=models.CASCADE, related_name='study_interactions')
    recruitee = models.ForeignKey(Recruitee, on_delete=models.CASCADE, related_name='recruitee_interactions')

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]

    recruitee_status = models.CharField(
        max_length=8,
        choices=STATUS_CHOICES,
        default='pending',
        help_text='Accepted/Rejected status of the recruitee'
    )
    study_status = models.CharField(
        max_length=8,
        choices=STATUS_CHOICES,
        default='pending',
        help_text='Accepted/Rejected status of the study'
    )

    def accept_match(self, acceptor_type):
        if acceptor_type == 'recruitee':
            self.recruitee_status = 'accepted'
        elif acceptor_type == 'study':
            self.study_status = 'accepted'
        # Check if both sides have accepted
        if self.recruitee_status == 'accepted' and self.study_status == 'accepted':
            self.complete_match()
        self.save()

    def reject_match(self, rejector_type):
        if rejector_type == 'recruitee':
            self.recruitee_status = 'rejected'
        elif rejector_type == 'study':
            self.study_status = 'rejected'
        self.save()

