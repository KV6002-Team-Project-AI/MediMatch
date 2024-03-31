from django.core.management.base import BaseCommand
from ResearchSwipe.models import Recruitee
from Abdul.utils import get_ner_results

class Command(BaseCommand):
    help = 'Process recruitee information through NER models'

    def add_arguments(self, parser):
        parser.add_argument('user_ids', nargs='+', type=int, help='User IDs to process')

    def handle(self, *args, **options):
        user_ids = options['user_ids']
        for user_id in user_ids:
            try:
                recruitee = Recruitee.objects.get(user_id=user_id)
            except Recruitee.DoesNotExist:
                self.stdout.write(self.style.WARNING(f'Recruitee with user_id {user_id} does not exist'))
                continue

            # Process NER for the specific recruitee
            if recruitee.has_medical_history and recruitee.medical_history_details:
                medical_info = get_ner_results(recruitee.medical_history_details, "medical")
                medical_info = self.remove_semicolons(medical_info)
                recruitee.medical_history_details = medical_info

            if recruitee.taking_current_medications and recruitee.current_medication_details:
                medications_info = get_ner_results(recruitee.current_medication_details, "medical")
                medications_info = self.remove_semicolons(medications_info)
                recruitee.current_medication_details = medications_info

            if recruitee.has_medication_history and recruitee.medication_history_details:
                medication_history_info = get_ner_results(recruitee.medication_history_details, "medical")
                medication_history_info = self.remove_semicolons(medication_history_info)
                recruitee.medication_history_details = medication_history_info

            if recruitee.has_family_medical_history and recruitee.family_medical_history_details:
                family_medical_info = get_ner_results(recruitee.family_medical_history_details, "medical")
                family_medical_info = self.remove_semicolons(family_medical_info)
                recruitee.family_medical_history_details = family_medical_info

            if recruitee.has_allergies and recruitee.allergy_details:
                allergies_info = get_ner_results(recruitee.allergy_details, "allergies")
                allergies_info = self.remove_semicolons(allergies_info)
                recruitee.allergy_details = allergies_info

            if recruitee.lifestyle_factors:
                lifestyle_info = get_ner_results(recruitee.lifestyle_factors, "lifestyle")
                lifestyle_info = self.remove_semicolons(lifestyle_info)
                recruitee.lifestyle_factors = lifestyle_info

            recruitee.save()
            self.stdout.write(self.style.SUCCESS(f'Processed NER for recruitee with user_id {user_id}'))

    def remove_semicolons(self, info):
        if isinstance(info, dict):
            for key, value in info.items():
                info[key] = value.replace(";", "") if isinstance(value, str) else value
        elif isinstance(info, str):
            info = info.replace(";", "")
        return info





# USE THIS TO RUN IN TERMINAL
#
    #to run per user_id use below line, replace <user_id> with actual user_ID for example 22
    #python manage.py process_ner <user_id>
    #example below
    #python manage.py process_ner 22
#
# !!!!!!!!!!!!!!!!!!!!