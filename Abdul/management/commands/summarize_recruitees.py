from django.core.management.base import BaseCommand
from ResearchSwipe.models import Recruitee

class Command(BaseCommand):
    help = 'Generates summaries for all recruitees in the database.'

    def handle(self, *args, **options):
        recruitees = Recruitee.objects.all()

        if recruitees.exists():
            for recruitee in recruitees:
                summary_paragraph = self.generate_paragraph(recruitee)  # Generate the paragraph
                self.update_summary(recruitee, summary_paragraph)  # Update the recruitee's summary
                self.stdout.write(self.style.SUCCESS(f'Summary updated for recruitee: {recruitee.user_id}'))
        else:
            self.stdout.write(self.style.WARNING('No recruitees found in the database.'))

    def generate_paragraph(self, recruitee):
        paragraph = f"""{recruitee.user.get_full_name()}, a {recruitee.age}-year-old {recruitee.biological_sex} 
        working as a {recruitee.profession} from a {recruitee.ethnicity} ethnic background. Height: {recruitee.height}cm, 
        Weight: {recruitee.weight}kg. Medical history: {recruitee.medical_history_details}, 
        Current medications: {recruitee.current_medication_details}, Medication history: {recruitee.medication_history_details}, 
        Allergies: {recruitee.allergy_details}, Family medical history: {recruitee.family_medical_history_details}, 
        Lifestyle: {recruitee.lifestyle_factors}, Socioeconomic status: {recruitee.socioeconomic_status}, 
        Work preferences: {recruitee.work_preference}."""

        return paragraph.replace('\n', ' ').strip()

    def update_summary(self, recruitee, summary_paragraph):
        recruitee.summary = summary_paragraph
        recruitee.save()

