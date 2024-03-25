
# Supposed to be intergated, couldnt manage to it in time, variables would basically fetch from DB and then same algorithim is used per study, with different fields etc.


#Example of fields, could differ per study etc
recruitee = "John Doe"
study_name = "Study of Diabetes"
category = "Experiment"
duration = "four weeks"
description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
ethnicity = "Not stated"
min_age = "21 Years"
max_age = "50 Years"
min_weight = "50kg"
medical_history = "Diabetes"

def generate_paragraph(recruitee, study_name, category, duration, description, ethnicity, min_age, max_age, min_weight, medical_history):
    paragraph = f"{recruitee} is recruiting for the study '{study_name}' in the {category} category. The study will run for {duration} and aims to gather data on participants aged between {min_age} and {max_age} with a minimum weight of {min_weight}. The study is open to individuals of {ethnicity} ethnicities, and those with a medical history of {medical_history}. Description: {description}"

    return paragraph

print(generate_paragraph(recruitee, study_name, category, duration, description, ethnicity, min_age, max_age, min_weight, medical_history))
