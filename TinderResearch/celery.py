
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab
from Aymman.tasks import run_ranking_update

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'TinderResearch.settings')

app = Celery('TinderResearch')


app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

@app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    # Calls run_ranking_update() every 5 minutes
    sender.add_periodic_task(
        crontab(minute='*/5'),
        run_ranking_update.s(),
    )
