from django.core.management.base import BaseCommand
from ResearchSwipe.models import Recruitee

class Command(BaseCommand):
    help = 'Generates summaries for all recruitees in the database.'

    def handle(self, *args, **options):
        recruitees = Recruitee.objects.all()

        if recruitees.exists():
            for recruitee in recruitees:
                summary_paragraph = self.generate_paragraph(recruitee)  # Generate the paragraph
                self.update_summary(recruitee, summary_paragraph)  # Update the recruitee summary
                self.stdout.write(self.style.SUCCESS(f'Summary updated for recruitee: {recruitee.user_id}'))
        else:
            self.stdout.write(self.style.WARNING('No recruitees found in the database.'))

    def generate_paragraph(self, recruitee):
        # Format fields that first letter capitalized
        name = recruitee.user.get_full_name().capitalize()
        profession = recruitee.profession.capitalize()
        ethnicity = recruitee.nationality.capitalize()
        # Concatnate formatted fields with other fields
        paragraph = f"""{name}, a {recruitee.age}-year-old {recruitee.biological_sex.lower()} 
        working as a {profession} from a {ethnicity} ethnic background. Height: {recruitee.height}cm, 
        Weight: {recruitee.weight}kg. Medical history: {recruitee.medical_history_details.lower()}, 
        Current medications: {recruitee.current_medication_details.lower()}, Medication history: {recruitee.medication_history_details.lower()}, 
        Allergies: {recruitee.allergy_details.lower()}, Family medical history: {recruitee.family_medical_history_details.lower()}, 
        Lifestyle: {recruitee.lifestyle_factors.lower()}, Socioeconomic status: {recruitee.socioeconomic_status.lower()}, 
        Work preferences: {recruitee.work_preference.lower()}."""

        return paragraph.replace('\n', ' ').strip()


    def update_summary(self, recruitee, summary_paragraph):
        recruitee.summary = summary_paragraph
        recruitee.save()

