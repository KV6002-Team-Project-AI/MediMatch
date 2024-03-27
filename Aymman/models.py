from django.db import models
from ResearchSwipe.models import * 
from Syed.models import Study


class Rank(models.Model):
    rank_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Recruitee, on_delete=models.CASCADE, null=True)
    study = models.ForeignKey(Study, on_delete=models.CASCADE)
    ranking = models.PositiveSmallIntegerField(default=0)

