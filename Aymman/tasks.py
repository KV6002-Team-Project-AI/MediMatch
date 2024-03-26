from celery import shared_task
from django.core.management import call_command

@shared_task
def run_ranking_update():
    call_command('rank_volunteers')