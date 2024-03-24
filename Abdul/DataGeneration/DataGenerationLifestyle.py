import random

# Simplifying for clarity - each activity now has a verb and noun form where appropriate
lifestyle_activities = {
    'diet': [
        ('following a vegan diet', 'vegan diet'),
        ('following a vegetarian diet', 'vegetarian diet')
    ],
    'substance_use': [
        ('smoking', 'smoking'),
        ('drinking alcohol', 'drinking')
    ],
    'exercise': [
        ('exercising regularly', 'exercise routine')
    ]
}

# More specific templates that can handle the variations in verb/noun forms
templates = [
    "I enjoy {activity_verb}.",
    "I've never touched {activity_noun}.",
    "I quit {activity_noun} last year.",
    "{Activity_verb} improves my mood.",
    "I'm exploring {activity_noun}.",
    "{Activity_verb} is a big commitment for me.",
    "Stay away from {activity_noun}.",
    "Though I enjoy {activity_noun}, I prioritize {activity_verb} for my well-being."
]


def generate_lifestyle_sentence():
    activity_category = random.choice(list(lifestyle_activities.keys()))
    activity_verb, activity_noun = random.choice(lifestyle_activities[activity_category])

    # Choose a template that fits the chosen activity category
    template = random.choice(templates)

    # Fill in the template directly with the selected activity
    sentence = template.format(activity_verb=activity_verb, activity_noun=activity_noun,
                               Activity_verb=activity_verb.capitalize())

    # Finding and annotating entities based on both verb and noun forms
    entities = []
    for occurrence in (activity_verb, activity_noun):
        start_index = sentence.find(occurrence)
        if start_index != -1:
            entities.append((start_index, start_index + len(occurrence), 'LIFESTYLE'))

    # Ensuring unique entities in case of overlap
    unique_entities = list(set(entities))

    return sentence, {"entities": unique_entities}


# Generate sample sentences
for _ in range(20):
    print(generate_lifestyle_sentence())
