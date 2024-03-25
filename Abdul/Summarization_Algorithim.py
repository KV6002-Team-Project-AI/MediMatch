# Supposed to be intergated, couldnt manage to it in time, variables would basically fetch from DB and then same algorithim is used per user.

full_names = "Abdullah Musleh"
ages = "21"
biological_sexes = "male"
professions = "SWE"
nationalities = "Jordanian"
heights = "178cm"
weights = "87kg"
medical_histories = "Hepatitis"
family_medical_histories = "none"
medication_histories = "vitamin D"
current_medication = "Ibuprofen"
lifestyle = "Exercise"
socioeconomic_status = "Middle class"
work_preferences = "In person"

def generate_paragraph(full_names, ages, biological_sexes, professions, nationalities, heights, weights, medical_histories, family_medical_histories, medication_histories, current_medication, lifestyle, socioeconomic_status, work_preference):
    paragraph = f"{full_names}, a {ages}-year-old {biological_sexes} {professions} of {nationalities} nationality, stands at {heights} tall and weighs {weights}. With a medical history of {medical_histories} and a family medical history of {family_medical_histories}, and a medication history of {medication_histories} and currently taking {current_medication}. {full_names} leads a lifestyle involving {lifestyle} and belongs to {socioeconomic_status} and prefers working {work_preference}."

    return paragraph

print(generate_paragraph(full_names, ages, biological_sexes, professions, nationalities, heights, weights, medical_histories, family_medical_histories, medication_histories, current_medication, lifestyle, socioeconomic_status, work_preferences))
