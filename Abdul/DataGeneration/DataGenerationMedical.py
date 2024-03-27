import random

# change for diverse data
medications = [
    'Tramadol', 'Thyroxine', 'Ibuprofen', 'Lisinopril', 'Xanax', 'Fluvoxamine',
    'Sertraline', 'Citalopram', 'Venlafaxine', 'Duloxetine', 'Clonidine',
    'Clotrimazole', 'Memantine', 'Ipratropium'
]

# change
conditions = [
    'pain management', 'celiac disease', 'hypothyroidism', 'heart attack',
    'fever', 'depression', 'hypertension', 'multiple sclerosis', 'anxiety',
    'obsessive-compulsive disorder', 'social anxiety disorder', 'generalized anxiety disorder',
    'major depressive disorder', 'high blood pressure', 'fungal infection',
    'Alzheimer\'s disease', 'COPD', 'fibromyalgia symptoms'
]

# change
condition_templates = [
    ("Using {medication} for {condition}.", "MEDICATION", "CONDITION"),
    ("Diagnosed with {condition}.", "CONDITION", None),  # Added None for templates that don't use medication.
    ("{relation} is on {medication} for {condition}.", "MEDICATION", "CONDITION"),
    ("Had a {condition}.", "CONDITION", None),  # Added None for consistency.
    ("Prescribed {medication} for {condition}.", "MEDICATION", "CONDITION"),
    ("Suffering from {condition}.", "CONDITION", None),  # Added None.
    ("Using {medication} for {condition}.", "MEDICATION", "CONDITION"),
    ("Currently on {medication} for {condition}.", "MEDICATION", "CONDITION"),
    ("Suffering from {condition}, using {medication}.", "CONDITION", "MEDICATION"),
    ("Diagnosed with {condition}, using {medication}.", "CONDITION", "MEDICATION"),
    ("Currently using {medication} for {condition}.", "MEDICATION", "CONDITION"),
    ("{relation} takes {medication} to manage {condition}.", "MEDICATION", "CONDITION"),
    ("{relation} uses {medication} to manage {condition}.", "MEDICATION", "CONDITION"),
]

relations = ['Mother', 'He', 'She', 'I', 'Father']

def generate_condition_sentence():
    template_info = random.choice(condition_templates)
    template = template_info[0]
    first_entity = template_info[1]
    second_entity = template_info[2] if len(template_info) > 2 else None

    medication = random.choice(medications)
    condition = random.choice(conditions)
    relation = random.choice(relations)

    sentence = template.format(medication=medication, condition=condition, relation=relation)

    entities = []
    if first_entity == "MEDICATION":
        start_index_m = sentence.find(medication)
        entities.append((start_index_m, start_index_m + len(medication), "MEDICATION"))
        if second_entity == "CONDITION":
            start_index_c = sentence.find(condition)
            entities.append((start_index_c, start_index_c + len(condition), "CONDITION"))
    elif first_entity == "CONDITION":
        start_index_c = sentence.find(condition)
        entities.append((start_index_c, start_index_c + len(condition), "CONDITION"))
        if second_entity == "MEDICATION":
            start_index_m = sentence.find(medication)
            entities.append((start_index_m, start_index_m + len(medication), "MEDICATION"))

    return sentence, {"entities": entities}

# Generate
for _ in range(20):
    print(generate_condition_sentence())