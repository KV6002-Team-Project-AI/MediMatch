from django.core.management.base import BaseCommand
from ResearchSwipe.models import Recruitee

class Command(BaseCommand):
    help = 'Generates summaries for all recruitees in the database.'

    def handle(self, *args, **options):
        # Fetch all recruitee instances
        recruitees = Recruitee.objects.all()

        if recruitees.exists():
            for recruitee in recruitees:
                # Generate the summary paragraph for the recruitee
                summary_paragraph = self.generate_paragraph(recruitee)
                # Update the recruitee's summary field with the generated paragraph
                # Ensure the summary fits within the max_length of the summary field
                recruitee.summary = summary_paragraph[:400]  # Assuming max_length is 400
                recruitee.save()  # Save the updates to the database
                # Optionally write out the summary to stdout
                self.stdout.write(summary_paragraph)
        else:
            self.stdout.write(self.style.WARNING('No recruitees found in the database.'))

    def generate_paragraph(self, recruitee):
        # Constructing the summary paragraph
        paragraph = f"""a {recruitee.age}-year-old {recruitee.biological_sex} 
        working as a {recruitee.profession} from {recruitee.nationality}. Height: {recruitee.height}cm, 
        Weight: {recruitee.weight}kg. Medical history: {recruitee.medical_history_details}, 
        Current medications: {recruitee.current_medication_details}, Medication history: {recruitee.medication_history_details}, 
        Allergies: {recruitee.allergy_details}, Family medical history: {recruitee.family_medical_history_details}, 
        Lifestyle: {recruitee.lifestyle_factors}, Socioeconomic status: {recruitee.socioeconomic_status}, 
        Work preferences: {recruitee.work_preference}."""
        
        # Replace newlines with spaces and strip leading/trailing whitespace
        return paragraph.replace('\n', ' ').strip()
