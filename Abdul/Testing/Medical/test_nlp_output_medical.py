import pytest
from nlp_processing_medical import process_text

# test cases
test_cases = [
    ("Using Escitalopram for anxiety management", [("MEDICATION", "Escitalopram"), ("CONDITION", "anxiety")]),
    ("Using Topamax for migraines.", [("MEDICATION", "Topamax"), ("CONDITION", "migraines")]),
    ("Suffering from arthritis, prescribed Naproxen.", [("CONDITION", "arthritis"), ("MEDICATION", "Naproxen")]),
    ("My grandfather had diabetes.", [("CONDITION", "diabetes")]),
    ("I suffer from insomnia.", [("CONDITION", "insomnia")]),
    ("I suffer from diabetes.", [("CONDITION", "diabetes")]),
    ("I suffer from migraines.", [("CONDITION", "migraines")]),
    ("Diagnosed with osteoarthritis.", [("CONDITION", "osteoarthritis")]),
    ("Diagnosed with anxiety.", [("CONDITION", "anxiety")]),
    ("I'm using Ibuprofen", [("MEDICATION", "Ibuprofen")]),
    ("I'm diagnosed with depression", [("CONDITION", "depression")]),
    ("currently using Losartan", [("MEDICATION", "Losartan")]),
    ("currently using Topamax", [("MEDICATION", "Topamax")]),
    ("I have a history of migraines", [("CONDITION", "migraines")]),
    ("I used to take Losartan", [("MEDICATION", "Losartan")]),
    ("My mother has hypothyroidism", [("CONDITION", "hypothyroidism")]),
    ("My father has with asthma", [("CONDITION", "asthma")]),
    ("I used to take Topamax", [("MEDICATION", "Topamax")]),
    #spelling mistakes
    ("diagnosd with anxiety.", [("CONDITION", "anxiety")]),
    ("Diabetes.", [("CONDITION", "diabetes")])
]

@pytest.mark.parametrize("input_text, expected_entities", test_cases)
def test_medical_ner_processing(input_text, expected_entities):
    # process input then compare with output
    actual_entities = process_text(input_text)
    assert actual_entities == expected_entities, f"For text '{input_text}', expected {expected_entities}, but got {actual_entities}"
