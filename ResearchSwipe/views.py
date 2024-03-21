from rest_framework import status, views, permissions, generics
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from .models import User, Recruitee, Recruiter
from .serializers import UserSerializer, RecruiteeSerializer, RecruiterSerializer, MyAuthTokenSerializer, UserRoleSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
import logging
from .datavalidation import *

class UserSignup(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()  # User creation now properly handles email and username
            return Response(
                {
                    "id": user.id,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "is_recruitee": user.is_recruitee,
                    "is_recruiter": user.is_recruiter
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

class LogoutView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist() 
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class ValidateTokenView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        # the request will have the user attached to it
        # by the JWTAuthentication class if the token is valid.
        user = request.user
        if user.is_authenticated:
            return Response({'message': 'Token is valid', 'user': str(user)}, status=status.HTTP_200_OK)
        return Response({'message': 'Token is invalid'}, status=status.HTTP_401_UNAUTHORIZED)

class RecruiteeDetail(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, user, pk=None):
        if user.is_superuser and pk:
            try:
                return Recruitee.objects.get(pk=pk)
            except Recruitee.DoesNotExist:
                return None
        return user.recruitee

    def get(self, request, pk=None, *args, **kwargs):
        if hasattr(request.user, 'is_recruiter') and request.user.is_recruiter:
            return Response({"error": "Recruiter cannot access recruitee details"}, status=status.HTTP_403_FORBIDDEN)

        recruitee = self.get_object(request.user, pk)
        if recruitee is None:
            return Response({"error": "Recruitee not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = RecruiteeSerializer(recruitee, context={'request': request})
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        if hasattr(request.user, 'is_recruitee') and not request.user.is_recruitee:
            return Response({"error": "User is not a recruitee"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = RecruiteeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        recruitee = self.get_object(request.user)
        if recruitee is None:
            return Response({"error": "Recruitee not found"}, status=status.HTTP_404_NOT_FOUND)

        # Update the recruitee fields
        recruitee_serializer = RecruiteeSerializer(recruitee, data=request.data, partial=True, context={'request': request})
        if recruitee_serializer.is_valid():
            recruitee_serializer.save()

            # Check if there is a file in the request to update the user's profile image
            if 'profile_image' in request.FILES:
                user = recruitee.user
                user.profile_image = request.FILES['profile_image']
                user.save()

            return Response(recruitee_serializer.data)
        return Response(recruitee_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    


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
    
class UpdateProfileImageView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DropdownChoicesAPIView(views.APIView):
    def get(self, request):
        choices = {
            'health_status_choices': HEALTH_STATUS_CHOICES,
            'activity_level_choices': ACTIVITY_LEVEL_CHOICES,
            'socioeconomic_status_choices': SOCIOECONOMIC_STATUS_CHOICES,
            'hair_color_choices': HAIR_COLOR_CHOICES,
            'ethnicity_choices': ETHNICITY_CHOICES,
            'work_preference_choices': GROUP_CHOICES,
            'nationality_choices': NATIONALITY_CHOICES,
            'language_preferences_choices': LANGUAGE_CHOICES,
            'profession_choices': PROFESSION_CHOICES,
            'duration_of_participation_choices': DURATION_CHOICES,
            'biological_sex_choices': SEX_CHOICES,
            'pregnancy_status_choices': PREGNANCY_STATUS_CHOICES,
            'measurement_system_choices': MEASUREMENT_CHOICES,
            'study_preference_choices': STUDY_PREFERENCE_CHOICES,
            'interest_choices': INTEREST_CHOICES,
        }
        # Converts each choice tuple into a dictionary format that is easy to handle in the frontend
        formatted_choices = {key: [{'key': choice[0], 'value': choice[1]} for choice in value] for key, value in choices.items()}
        return Response(formatted_choices)
