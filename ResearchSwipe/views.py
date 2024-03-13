from rest_framework import status, views, permissions
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from .models import User, Recruitee, Recruiter
from .serializers import UserSerializer, RecruiteeSerializer, RecruiterSerializer, MyAuthTokenSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings

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
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = MyAuthTokenSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = serializer.validated_data['refresh']
            access = serializer.validated_data['access']
            
            
            # Construct a response object with JSON data
            response_data = {
                'refresh': refresh,
                'access': access,
                'user': {
                    'name': user.first_name, 
                     },

                # Include any other data you want to send back
            }
            
            # Create a Response instance with the JSON data
            response = Response(response_data, status=status.HTTP_200_OK)
            
            # Set the JWT token in a HttpOnly cookie
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE'],
                value=str(access),
                expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )
            
            # Return the Response instance
            return response
        
        # Return a 400 response with validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RecruiteeDetail(views.APIView):
    permission_classes = [permissions.IsAuthenticated]  # Ensure user is authenticated

    def post(self, request, *args, **kwargs):
        if not request.user.is_recruitee:
            return Response({"error": "User is not a recruitee"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = RecruiteeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)  # Associate the recruitee profile with the authenticated user
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
