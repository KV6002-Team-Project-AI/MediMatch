from rest_framework import status, views, permissions, generics
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from .models import *
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
import logging
from .datavalidation import *
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.http import HttpResponse
from django.views.decorators.cache import never_cache
from .token import email_verification_token_generator  # Make sure to import your custom token generator
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from .email_service import * 
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import RunReportRequest
from google.oauth2 import service_account 
from google.protobuf.json_format import MessageToDict
from .google_analytics import GoogleAnalyticsReporter
from .permissions import IsSuperUser 
import base64
import json
import os
import tempfile
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

# Path to service account key file
KEY_FILE_LOCATION = r'C:\Users\Jed Bywater\OneDrive - Northumbria University - Production Azure AD\Documents\GitHub\MediMatch\medimatch-418221-2d599ed1a97c.json'
# GA4 Property ID 
PROPERTY_ID = '433240422'


class UserSignup(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "id": user.id,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "is_recruitee": user.is_recruitee,
                    "is_recruiter": user.is_recruiter,
                    "is_superuser": user.is_superuser,
                    "message": "User created successfully. Please check your email to verify your account.",
                }, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
@permission_classes([IsSuperUser])  # custom permission 
def admin_signup(request):
    try:
        data = request.data
        # Create new user with is_superuser set to True
        user = User.objects.create(
            username=data['username'],
            email=data['email'],
            password=make_password(data['password']),  
            is_superuser=True  
        )
        user.save()
        return Response({'message': 'Admin created successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

def get_ga_data(request):
    encoded_credentials = os.getenv('GOOGLE_CREDENTIALS_BASE64')
    if not encoded_credentials:
        return JsonResponse({'error': 'Google credentials are not set in environment variables'}, status=500)

    credentials_dict = json.loads(base64.b64decode(encoded_credentials).decode('utf-8'))

    # Write the credentials to a temporary file
    with tempfile.NamedTemporaryFile(delete=False, mode='w') as temp:
        json.dump(credentials_dict, temp)
        temp_file_name = temp.name
    try:
        credentials_json = json.loads(base64.b64decode(encoded_credentials).decode('utf-8'))
        # Debugging: Print to check part of the decoded credentials
        print("Decoded credentials loaded successfully.")
        
        property_id = '433240422'  # your GA4 property ID

        # Initialize your analytics reporter with the decoded JSON credentials
        reporter = GoogleAnalyticsReporter(temp_file_name, property_id)
        # your existing logic...

        # Your existing logic to run reports
        city_report_response = reporter.run_report()
        daily_views_response = reporter.get_daily_views()

        # Convert the Google Analytics API responses to dicts
        city_report_dict = MessageToDict(city_report_response._pb)
        daily_views_dict = MessageToDict(daily_views_response._pb)

        return JsonResponse({
            'cityData': city_report_dict,
            'dailyViewsData': daily_views_dict
        })
    
    except Exception as e:
        # Debugging: Print the exception
        print(f"Error occurred: {e}")
        return JsonResponse({'error': str(e)}, status=500)
    finally:
        os.remove(temp_file_name) 


@never_cache
def VerifyEmailView(request, uidb64, token):
    try:
        # Decoding the user's primary key
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and email_verification_token_generator.check_token(user, token):
        user.is_verified = True
        user.save()
        # Redirect to success page, or inform user of success
        return HttpResponse('Email verified successfully')
    else:
        # Inform user of failure
        return HttpResponse('Verification link is invalid or expired')




class ResendVerificationEmailView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        if user.is_verified:
            return Response({'error': 'User already verified.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            EmailService.send_verification_email(user)
            return Response({'message': 'Verification email resent successfully.'})
        except Exception as e:
            # Log the exception here
            return Response({'error': 'An error occurred while sending the verification email.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
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

    def get_object(self, pk=None):
        try:
            # Fetch specific recruitee if pk is provided and the user is superuser
            if pk and self.request.user.is_superuser:
                return Recruitee.objects.get(pk=pk)
            # Fetch the recruitee profile associated with the current user
            return self.request.user.recruitee
        except Recruitee.DoesNotExist:
            return None

    def get(self, request, pk=None, *args, **kwargs):
        if hasattr(request.user, 'is_recruiter') and request.user.is_recruiter:
            return Response({"error": "Recruiter cannot access recruitee details"}, status=status.HTTP_403_FORBIDDEN)

        recruitee = self.get_object(pk)
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
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk=None):
        try:
            # Fetch specific recruiter if pk is provided and the user is superuser
            if pk and self.request.user.is_superuser:
                return Recruiter.objects.get(pk=pk)
            # Fetch the recruiter profile associated with the current user
            return self.request.user.recruiter
        except Recruiter.DoesNotExist:
            return None

    def get(self, request, pk=None, *args, **kwargs):
        recruiter = self.get_object(pk)
        if recruiter is None:
            return Response({"error": "Recruiter not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = RecruiterSerializer(recruiter, context={'request': request})
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        # Check if the user is already a recruiter to prevent creating multiple profiles
        if hasattr(request.user, 'recruiter'):
            return Response({"error": "User is already a recruiter"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = RecruiterSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        recruiter = self.get_object(request.user)
        if recruiter is None:
            return Response({"error": "Recruiter not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = RecruiterSerializer(recruiter, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()

            # Check if there is a file in the request to update the recruiter's profile image
            if 'profile_image' in request.FILES:
                recruiter.profile_image = request.FILES['profile_image']
                recruiter.save()

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


User = get_user_model()

class UserRolesView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id=None):
        # If user_id is provided in the URL, get that user's object; otherwise, use request.user
        user = get_object_or_404(User, pk=user_id) if user_id else request.user
        serializer = UserRoleSerializer(user)
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

            # NLP Syed choices
            'medical_history_choices': MEDICAL_HISTORY_CHOICES,
            'medication_history_choices': MEDICATION_HISTORY_CHOICES,
            'current_medication_choices': CURRENT_MEDICATION_CHOICES,
            'family_medication_history_choices': FAMILY_MEDICATION_HISTORY_CHOICES,
            'allergies_choices': ALLERGIES_CHOICES,
            'lifestyle_choices': LIFESTYLE_CHOICES,
        }

        # Converts each choice tuple into a dictionary format that is easy to handle in the frontend
        formatted_choices = {key: [{'key': choice[0], 'value': choice[1]} for choice in value] for key, value in choices.items()}
        return Response(formatted_choices)


class ReportUserView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Assuming `reported_user` is correctly included in the request data
        data = request.data.copy()
        data['reporter'] = request.user.pk  # Set the reporter as the logged-in user

        serializer = ReportSerializer(data=data)
        if serializer.is_valid():
            serializer.save()  # Save the instance
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminReportView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        reports = Report.objects.all()
        serializer = ReportSerializer(reports, many=True)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        report = Report.objects.get(pk=pk)
        action_taken = request.data.get('status')
        message = request.data.get('message', '')  # Default message if not provided

        if action_taken in ['resolved', 'ban', 'warn']:
            report.status = action_taken  # Update status directly from the action
            subject = ''

            if action_taken == 'ban':
                message = message or f"You have been banned for the following reason: {report.reason}"
                subject = "Account Ban Notification"
            elif action_taken == 'warn':
                message = message or f"You have been warned for the following reason: {report.reason}"
                subject = "Account Warning Notification"
            elif action_taken == 'resolved':
                # For resolved status, you might not always want to notify the reported user
                # So, consider whether to send an email or not based on the message content
                if message:
                    subject = "Report Resolved"
                    message = f"Your report has been resolved. Reason: {report.reason}"
            
            # Save the report status update
            report.save()

            # Send email to the reported user if necessary
            if subject and message:
                send_notification_email(report.reported_user, subject, message)

            # Send a thank you email to the reporter
            send_notification_email(report.reporter, "Report Processing", f"Thank you for reporting. Your report has been {action_taken}.")

            return Response(ReportSerializer(report).data)

        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

