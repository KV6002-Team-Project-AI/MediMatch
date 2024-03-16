from rest_framework import status, views, permissions
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from .models import User, Recruitee, Recruiter
from .serializers import UserSerializer, RecruiteeSerializer, RecruiterSerializer, MyAuthTokenSerializer, UserRoleSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
import logging

class UserSignup(views.APIView):
    # Allow any user to sign up
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # UserSerializer should handle password hashing internally
            # Return the user data, excluding the password
            return Response(
                {
                    "id": serializer.instance.id,
                    "username": serializer.instance.username,
                    "first_name": serializer.instance.first_name,
                    "last_name": serializer.instance.last_name,
                    "is_recruitee": serializer.instance.is_recruitee,
                    "is_recruiter": serializer.instance.is_recruiter
                }, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserLoginView(views.APIView):
    permission_classes = (permissions.AllowAny,)  # Allow any user to attempt login

    def post(self, request, *args, **kwargs):
        serializer = MyAuthTokenSerializer(data=request.data)
        if serializer.is_valid():
            user_instance = serializer.validated_data['user_instance']
            user_info = serializer.validated_data['user_info']
            refresh = serializer.validated_data['refresh']
            access = serializer.validated_data['access']

            response_data = {
                'user': user_info,
                'refresh': refresh,
                'access': access,
            }

            return Response(response_data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ValidateTokenView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        # Since this is a protected endpoint, the request will have the user attached to it
        # by the JWTAuthentication class if the token is valid.
        user = request.user
        if user.is_authenticated:
            return Response({'message': 'Token is valid', 'user': str(user)}, status=status.HTTP_200_OK)
        return Response({'message': 'Token is invalid'}, status=status.HTTP_401_UNAUTHORIZED)

class RecruiteeDetail(views.APIView):
    permission_classes = [permissions.IsAuthenticated]  # Ensure user is authenticated

    def get(self, request, *args, **kwargs):
        try:
            recruitee = Recruitee.objects.get(user=request.user)
            serializer = RecruiteeSerializer(recruitee)
            return Response(serializer.data)
        except Recruitee.DoesNotExist:
            return Response({"error": "Recruitee not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        # Assuming request.user.is_recruitee is a property that checks if the user is a recruitee
        if hasattr(request.user, 'is_recruitee') and not request.user.is_recruitee:
            return Response({"error": "User is not a recruitee"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = RecruiteeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            # The save method on the serializer will handle the creation
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class RecruiterDetail(views.APIView):
    permission_classes = [permissions.IsAuthenticated]  # Ensure user is authenticated

    def post(self, request, *args, **kwargs):
        if not request.user.is_recruiter:
            return Response({"error": "User is not a recruiter"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = RecruiterSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)  # Associate the recruiter profile with the authenticated user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserRolesView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Serialize the request.user instance
        serializer = UserRoleSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CookieLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        cookies = request.COOKIES
        if 'sessionid' in cookies:  # Replace 'sessionid' with the name of your session cookie
            print(f"Session cookie received: {cookies['sessionid']}")
        else:
            print("No session cookie received.")
        return response
