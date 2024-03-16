from django.contrib.auth import get_user_model
from rest_framework_simplejwt.authentication import JWTAuthentication

class JWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        user = self.get_user_from_jwt(request)
        if user:
            request.user = user
        response = self.get_response(request)
        return response

    def get_user_from_jwt(self, request):
        jwt_auth = JWTAuthentication()
        header = jwt_auth.get_header(request)
        raw_token = jwt_auth.get_raw_token(header) if header else None

        if raw_token:
            validated_token = jwt_auth.get_validated_token(raw_token)
            return jwt_auth.get_user(validated_token)
        
        return None
