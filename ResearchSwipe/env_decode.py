# This is All Jeds code

from django.conf import settings
import base64
import json

def get_google_credentials():
    encoded_credentials = getattr(settings, 'GOOGLE_CREDENTIALS_BASE64', None)
    if encoded_credentials:
        decoded_credentials = base64.b64decode(encoded_credentials)
        return json.loads(decoded_credentials.decode('utf-8'))
    else:
        raise ValueError("Google credentials not set in environment variables")
