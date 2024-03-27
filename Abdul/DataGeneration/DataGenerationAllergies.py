import random

allergies = [
    'dairy', 'peanuts', 'eggs', 'pollen', 'soy', 'certain fruits',
    'tree nuts', 'cats', 'dust mites', 'dairy products', 'dog saliva',
    'wheat', 'fish', 'ragweed', 'latex', 'shellfish', 'bee stings',
    'gluten', 'mold', 'sesame seeds', 'sunflower seeds', 'kiwi', 'banana',
    'avocado', 'chocolate', 'red meat', 'pork', 'corn', 'peaches',
    'tomatoes', 'strawberries', 'shellfish', 'peppers', 'garlic', 'onions',
    'almonds', 'walnuts', 'cashews', 'hazelnuts'
]

templates = [
    ("{subject} {have} allergies to {allergies}.", "have"),
    ("{subject} allergies include {allergies}.", "include"),
    ("{subject} suffer from allergies to {allergies}.", "suffer from"),
    ("{subject} {is_or_am} sensitive to {allergies}.", "is_or_am"),
    ("{subject} {has} an allergy to {allergies}.", "has"),
    ("{subject} {is_or_am} allergic to {allergies}.", "is_or_am"),
]

def select_subject(person):
    if person == 'first':
        return 'I', 'am', 'have'
    elif person == 'third_female':
        return 'She', 'is', 'has'
    else:  # third_male
        return 'He', 'is', 'has'

def generate_allergy_sentence(num_allergies=1, person='first'):
    subject, is_or_am, has_or_have = select_subject(person)
    template, verb = random.choice(templates)

    selected_allergies = random.sample(allergies, k=num_allergies)
    if num_allergies == 1:
        allergies_text = selected_allergies[0]
    else:
        allergies_text = f"{', '.join(selected_allergies[:-1])}, and {selected_allergies[-1]}"

    sentence = template.format(subject=subject, is_or_am=is_or_am, has=has_or_have, have=has_or_have,
                               allergies=allergies_text)

    # ENTITIES
    entities = []
    start_index = 0
    for allergy in selected_allergies:
        start_index = sentence.find(allergy, start_index)
        entities.append((start_index, start_index + len(allergy), "ALLERGY"))
        start_index += len(allergy)

    return sentence, {"entities": entities}

# Generate
for _ in range(20):
    print(generate_allergy_sentence(num_allergies=random.randint(1, 3),
                                    person=random.choice(['first', 'third_female', 'third_male'])))
