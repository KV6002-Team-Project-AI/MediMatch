import pytest
from nlp_processing_lifestyle import process_text

# test cases with variations
test_cases = [
    ("I eat vegan food", ["vegan"]),
    ("I exercise daily", ["exercise"]),
    ("I follow a vegetarian diet", ["vegetarian diet"]),
    ("I drink alcohol", ["drink"]),
    ("I smoke everyday", ["smoke"]),
    ("I drink everyday", ["drink"]),
    ("I use drugs", ["drugs"]),
    ("I exercise and eat vegan", ["exercise", "vegan"]),
    ("I eat halal", ["halal"]),
    ("I eat kosher", ["kosher"]),
    ("I only eat halal and kosher", ["halal", "kosher"]),
    ("I drink alcohol and smoke cigarettes", ["drink", "smoke"]),
    ("I exercise and drink and smoke", ["exercise", "drink", "smoke"]),
    # Spelling mistakes
    ("I smok cigarettes", ["cigarettes"]),
    ("I exercis everyday", ["exercise"]),
    ("I eat halal", ["halal"]),
    #different formats
    ("I'm vegan", ["vegan"]),
    #multiple with commas
    ("I exercise, I drink, I smoke", ["exercise", "drink", "smoke"])
]

@pytest.mark.parametrize("input_text, expected_output", test_cases)
def test_process_text(input_text, expected_output):
    #process
    actual_output = process_text(input_text)
    assert actual_output == expected_output, f"Given '{input_text}', expected {expected_output}, but got {actual_output}"
