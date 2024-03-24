from django.db import models, transaction
from ResearchSwipe.models import Recruitee
from Syed.models import Study

class Matches(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]

    match_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Recruitee, on_delete=models.CASCADE, related_name='user_interactions', null=True)
    study = models.ForeignKey(Study, on_delete=models.CASCADE, related_name='study_interactions')
    recruitee_status = models.CharField(max_length=8, choices=STATUS_CHOICES, default='pending')
    study_status = models.CharField(max_length=8, choices=STATUS_CHOICES, default='pending')

    # In your Matches model:
    def accept_match(self, user):
        with transaction.atomic():
            if user.is_recruitee and self.user == user.recruitee:
                self.recruitee_status = 'accepted'
            elif user.is_recruiter and self.study.user == user:
                self.study_status = 'accepted'
            self.save()

    def reject_match(self, user):
        with transaction.atomic():
            if user.is_recruitee and self.user == user.recruitee:
                self.recruitee_status = 'rejected'
            elif user.is_recruiter and self.study.user == user:
                self.study_status = 'rejected'
            self.save()

