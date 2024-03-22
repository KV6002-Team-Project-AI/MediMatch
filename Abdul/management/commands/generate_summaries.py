from django.core.management.base import BaseCommand
from ResearchSwipe.models import Recruitee
from Abdul.models import RecruiteeSummary
from Abdul.utils import generate_paragraph  # Ensure this utility function is correctly implemented and imported

class Command(BaseCommand):
    help = 'Generate and store summaries for all recruitees'

    def handle(self, *args, **options):
        recruitees = Recruitee.objects.all()
        for recruitee in recruitees:
            # Assuming generate_paragraph takes a Recruitee object and returns a string
            summary_text = generate_paragraph(recruitee)
            RecruiteeSummary.objects.update_or_create(
                recruitee=recruitee,
                defaults={'summary': summary_text},
            )
            self.stdout.write(self.style.SUCCESS(f'Successfully generated summary for {recruitee.user.email}'))


