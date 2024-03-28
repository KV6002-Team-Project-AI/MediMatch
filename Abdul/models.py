# Abdul/models.py

from django.db import models
from ResearchSwipe.models import Recruitee  # Adjust if your import path is different

class RecruiteeSummary(models.Model):
    user = models.OneToOneField(Recruitee, on_delete=models.CASCADE, primary_key=True)
    summary = models.TextField()

    def __str__(self):
        # This will return the email of the User associated with the Recruitee
        return f"Summary for {self.recruitee.user.email}"
