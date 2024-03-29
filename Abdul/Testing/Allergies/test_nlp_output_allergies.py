import pytest
from nlp_processing_allergies import get_final_output  

test_cases = [
    ("I'm allergic to cats", ["cats"]),
    ("I'm allergic to cats, I'm allergic to dogs", ["cats", "dogs"]),
    ("I'm allergic to cats and dogs", ["cats", "dogs"]),
    ("I'm allergic to cats and dogs and horses", ["cats", "dogs", "horses"]), # multiple
    ("I'm allergic to cats, dogs and horses", ["cats", "dogs", "horses"]), #normal
    ("I'm allergic to cats, I'm allergic to dogs, I'm allergic to horses", ["cats", "dogs", "horses"]),
    ("cats", ["cats"]), #just the word
    ("Im allergic to cats", ["cats"]), #grammar
    ("Im alergic to cats", ["cats"]), #spelling
    ("I have allergies from peanuts", ["peanuts"]),
    ("I have allergies from cats", ["cats"]),
    ("I'm allergic to chicken", ["chicken"]),
    ("I'm allergic to pizza", ["pizza"]),
    ("I'm allergic to cheese", ["cheese"]),
    ("I'm allergic to Ibuprofen", ["Ibuprofen"]),
    ("I'm allergic to wheat", ["wheat"]),
    #different ways to write
    ("My allergies include cats", ["cats"]),
    ("Exposure to cats triggers my allergies", ["cats"]),
    ("Suffering from dog allergies", ["dogs"]),
]


@pytest.mark.parametrize("input_text, expected_output", test_cases)
def test_model_final_output(input_text, expected_output):
    actual_output = get_final_output(input_text)
    
    # check match
    assert actual_output == expected_output, f"Given '{input_text}', expected {expected_output}, but got {actual_output}"
