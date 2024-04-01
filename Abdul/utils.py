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

# NLP STUFF
import torch
from transformers import AutoModelForTokenClassification, AutoTokenizer
import os

class NERModel:
    def __init__(self, model_relative_path, id2label, filter_words=None):
        model_path = os.path.join(os.getcwd(), model_relative_path)
        self.model = AutoModelForTokenClassification.from_pretrained(model_path)
        self.tokenizer = AutoTokenizer.from_pretrained(model_path)
        self.id2label = id2label
        self.filter_words = filter_words if filter_words is not None else {"on", "for", "currently", "taking", "from", "with", "take", "of", "using", "has"}


    def process_text(self, text):
        inputs = self.tokenizer(text, return_tensors="pt", truncation=True, padding=True)
        with torch.no_grad():
            outputs = self.model(**inputs)
            
        logits = outputs.logits
        predictions = logits.argmax(-1).squeeze().tolist()
        tokens = self.tokenizer.convert_ids_to_tokens(inputs["input_ids"].squeeze().tolist())
        
        entities = self.aggregate_entities(tokens, predictions)
        filtered_entities = self.filter_entities(entities)
        
        return filtered_entities


    def aggregate_entities(self, tokens, predicted_labels):
        entities = []
        current_entity = []
        current_label = None

        for token, label_id in zip(tokens, predicted_labels):
            label = self.id2label[label_id]
            if token in ["[CLS]", "[SEP]"]:
                continue
            if token.startswith("##"):
                if current_entity:
                    current_entity[-1] += token[2:]
                continue
            if label.startswith("B-"):
                if current_entity:
                    entities.append((current_label, " ".join(current_entity)))
                current_entity = [token.replace("##", "")]
                current_label = label[2:]
            elif label.startswith("I-") and current_label == label[2:]:
                current_entity.append(token.replace("##", ""))
            else:
                if current_entity:
                    entities.append((current_label, " ".join(current_entity)))
                    current_entity = []
                    current_label = None
        if current_entity:
            entities.append((current_label, " ".join(current_entity)))
        return entities

    def filter_entities(self, entities):
        filtered_entities = []
        for label, entity in entities:
            if label == "O":
                continue
            filtered_entity_words = [word for word in entity.split() if word.lower() not in self.filter_words]
            if filtered_entity_words:
                filtered_entities.append((label, " ".join(filtered_entity_words)))
        return filtered_entities

# filtering the additonal words, change later to relative path
medical_ner = NERModel(
    "Abdul/NLP_Models/Medical",
    {0: "O", 1: "B-CONDITION", 2: "I-CONDITION", 3: "B-MEDICATION", 4: "I-MEDICATION"},
    {"on", "for", "currently", "taking", "from", "with", "take", "of", "using", "has"}
)
allergies_ner = NERModel(
    "Abdul/NLP_Models/Allergies",
    {0: "O", 1: "B-ALLERGY", 2: "I-ALLERGY"},
    {"of", "from", "to", "and"}
)
lifestyle_ner = NERModel(
    "Abdul/NLP_Models/Lifestyle",
    {0: "O", 1: "B-LIFESTYLE", 2: "I-LIFESTYLE"},
    {"of", "from", "to", "and", "eat", "food", "a"}
)

def get_ner_results(text, model_type):
    results = None
    if model_type == "medical":
        results = medical_ner.process_text(text)
    elif model_type == "allergies":
        results = allergies_ner.process_text(text)
    elif model_type == "lifestyle":
        results = lifestyle_ner.process_text(text)
    else:
        return "Model type not recognized."

    if isinstance(results, list) and results:
        if len(results) == 1:
            return results[0][1]  
        else:
            return ", ".join(entity[1] for entity in results)  # Join multiple words with comma
    else:
        return "Null"













