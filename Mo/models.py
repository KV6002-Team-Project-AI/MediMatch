from django.db import models, transaction
from ResearchSwipe.models import Recruitee
from Syed.models import Study

class Matches(models.Model):
    match_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Recruitee, on_delete=models.CASCADE, related_name='user_interactions', null=True)
    study = models.ForeignKey(Study, on_delete=models.CASCADE, related_name='study_interactions')

    recruitee_status = models.BooleanField(default=False, help_text='True if the recruitee has accepted the match')
    study_status = models.BooleanField(default=False, help_text='True if the study has accepted the match')

    # In your Matches model:
    def accept_match(self, user):
        with transaction.atomic():
            if user.is_recruitee and self.user == user.recruitee:
                self.recruitee_status = True
            elif user.is_recruiter and self.study.user == user:
                self.study_status = True
            self.save()

    def reject_match(self, user):
        with transaction.atomic():
            if user.is_recruitee and self.user == user.recruitee:
                self.recruitee_status = False
            elif user.is_recruiter and self.study.user == user:
                self.study_status = False
            self.save()

