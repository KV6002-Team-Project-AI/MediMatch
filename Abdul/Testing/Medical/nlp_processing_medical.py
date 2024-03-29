import torch
from transformers import AutoModelForTokenClassification, AutoTokenizer
import os

base_path = "D:/Abdullah/Documents/MediMatch"
model_relative_path = "Abdul/NLP_Models/Medical"
model_path = os.path.join(base_path, model_relative_path)

model = AutoModelForTokenClassification.from_pretrained(model_path)
tokenizer = AutoTokenizer.from_pretrained(model_path)

id2label = {0: "O", 1: "B-CONDITION", 2: "I-CONDITION", 3: "B-MEDICATION", 4: "I-MEDICATION"}

def process_text(text):
    inputs = tokenizer(text, return_tensors="pt")
    
    with torch.no_grad():
        outputs = model(**inputs)
    
    logits = outputs.logits
    predictions = logits.argmax(-1).squeeze().tolist()
    tokens = tokenizer.convert_ids_to_tokens(inputs["input_ids"].squeeze().tolist())
    
    entities = aggregate_entities(tokens, predictions)
    filtered_entities = filter_entities(entities)
    
    return filtered_entities

def aggregate_entities(tokens, predicted_labels):
    entities = []
    current_entity = []
    current_label = None

    for token, label_id in zip(tokens, predicted_labels):
        label = id2label[label_id]
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

def filter_entities(entities):
    filter_words = {"on", "for", "currently", "taking", "from", "with", "take", "of", "using", "has"}
    filtered_entities = []
    for label, entity in entities:
        if label == "O":
            continue
        filtered_entity_words = [word for word in entity.split() if word.lower() not in filter_words]
        if filtered_entity_words:
            filtered_entities.append((label, " ".join(filtered_entity_words)))
    return filtered_entities

if __name__ == "__main__":
    # Example text for testing
    text = "Using Escitalopram for anxiety management"
    filtered_entities = process_text(text)
    for label, entity in filtered_entities:
        print(f"{label}: {entity}")
