from django.shortcuts import get_object_or_404
from .models import Recruitee
from .utils import generate_paragraph 

def generate_recruitee_summary(email):
    # Fetch the Recruitee instance from the database
    recruitee = get_object_or_404(Recruitee, user__email=email)
    
    # Generate the summary paragraph
    paragraph = generate_paragraph(recruitee)
    
    return paragraph

# Example Usage
email = "user@example.com"
summary_paragraph = generate_recruitee_summary(email)
print(summary_paragraph)

