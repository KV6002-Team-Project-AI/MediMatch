from ResearchSwipe.models import Recruitee

def getRecruitees():
    # Step 1: Query the Recruitee model for all instances
    recruitees = Recruitee.objects.all()

    for recruitee in recruitees:
            # Step 2: Extract the data you need
            full_name = recruitees.full_name
            age = recruitees.age
            biological_sex = recruitees.biological_sex
            professions = recruitees.profession
            nationalities = recruitees.nationality
            height = recruitees.height
            weight = recruitees.weight
            # actual fields
            medical_histories = recruitees.medical_history_details
            family_medical_histories = recruitees.family_medical_history_details
            medication_histories = recruitees.medication_history_details
            current_medication = recruitees.current_medication_details
            # booleans of actual
            lifestyle = recruitees.lifestyle_factors
            socioeconomic_status = recruitees.socioeconomic_status
            work_preferences = recruitees.work_preference

            output = generate_paragraph(full_name, age, biological_sex, professions, nationalities, height, weight, medical_histories, family_medical_histories, medication_histories, current_medication, lifestyle, socioeconomic_status, work_preferences)

            print (full_name)

def generate_paragraph(full_name, age, biological_sex, professions, nationalities, height, weight, medical_histories, family_medical_histories, medication_histories, current_medication, lifestyle, socioeconomic_status, work_preference):
    paragraph = f"""{full_name}, a {age}-year-old {biological_sex} {professions} of {nationalities} nationality, stands at {height} tall and weighs 
    {weight}. With a medical history of {medical_histories} and a family medical history of {family_medical_histories}, 
    and a medication history of {medication_histories} and currently taking {current_medication}. {full_name} leads a lifestyle involving {lifestyle} and belongs to 
    {socioeconomic_status} and prefers working {work_preference}."""
    
    return paragraph


#print(generate_paragraph(full_name, age, biological_sex, professions, nationalities, heights, weights, medical_histories, family_medical_histories, medication_histories, current_medication, lifestyle, socioeconomic_status, work_preferences))

getRecruitees()
