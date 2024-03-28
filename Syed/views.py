from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import status, views, permissions
from rest_framework.response import Response
from .models import Study
from .serializers import RecruiteeWithStudySerializer, RecruiterWithStudySerializer
from Mo.models import Matches
from Mo.serializers import ProfileInteractionSerializer
from ResearchSwipe.models import User, Recruiter
from .serializers import StudySerializer



class StudyCreate(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Get the authenticated user
        User = get_user_model()
        user = request.user
        
        # Filter studies based on the user's ID
        studies = Study.objects.filter(user=user, isExpired=False)
        serializer = StudySerializer(studies, many=True)  # Serialize the filtered queryset
        return Response(serializer.data)  # Return serialized data as response

    def post(self, request, *args, **kwargs):
        serializer = StudySerializer(data=request.data)
        if serializer.is_valid():
            # Assuming you want to save the user automatically
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudyExpire(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Retrieve data from the request
        study_id = request.data.get('study_id')
        is_expired = request.data.get('isExpired')

        # Check if is_expired is explicitly set to True
        if is_expired is not True:
            return Response({'detail': 'Invalid action. isExpired must be set to True.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve the study object based on study_id and user
            study = Study.objects.get(pk=study_id, user=request.user)

            # Update the isExpired field
            study.isExpired = is_expired
            study.save()

            # Serialize and return the updated study object
            serializer = StudySerializer(study)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Study.DoesNotExist:
            return Response({'detail': 'Study not found or you do not have permission to access it.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class MatchedRecruitees(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            # Retrieve all studies associated with the signed-in recruiter
            studies = Study.objects.filter(user=request.user)

            matches = Matches.objects.filter(
                study_status='accepted',
                recruitee_status='accepted',
                study__in=studies  # Filter by studies associated with the recruiter
            )

            # Serialize the matches data with study and recruitee information
            serializer = ProfileInteractionSerializer(matches, many=True)
            
            # Return the serialized data as a response
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Matches.DoesNotExist:
            return Response({'detail': 'No matches found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Optionally, log the exception here
            return Response({'detail': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
       
    
class MatchedRecruiters(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            # Retrieve the logged-in recruitee's user ID
            recruitee_id = request.user.id
            
            # Retrieve all matches where recruitee_status and study_status are 'accepted' and user_id matches
            accepted_matches = Matches.objects.filter(
                recruitee_status='accepted',
                study_status='accepted',
                user_id=recruitee_id
            )

            # Serialize the matched recruiter information along with study details
            serializer = ProfileInteractionSerializer(accepted_matches, many=True)

            # Return the serialized data as a response
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            # Handle exceptions here
            return Response({'detail': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

# def delete(self, request, study_id, *args, **kwargs):
#         try:
#             # Get the study instance
#             study = Study.objects.get(pk=study_id)

#             # Delete the study along with related information
#             study.delete()

#             return Response({'detail': 'Study and related information deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        
#         except Study.DoesNotExist:
#             return Response({'detail': 'Study not found.'}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             # Optionally, log the exception here
#             return Response({'detail': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)