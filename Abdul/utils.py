def generate_paragraph(recruitee):
    paragraph = (
        f"{recruitee.user.get_full_name()}, a {recruitee.age}-year-old "
        f"{recruitee.biological_sex} from {recruitee.nationality}, works as a {recruitee.profession}. "
        f"Medical history includes {recruitee.medical_history_details}. "
        f"Current medications: {recruitee.current_medication_details}. "
        f"Medication history: {recruitee.medication_history_details}. "
        f"Allergies: {recruitee.allergy_details}. "
        f"Family medical history: {recruitee.family_medical_history_details}. "
        f"Leads a {recruitee.lifestyle_factors} lifestyle. "
        f"Socioeconomic status: {recruitee.socioeconomic_status}. "
        f"Prefers {recruitee.study_preference} studies."
    )
    return paragraph

