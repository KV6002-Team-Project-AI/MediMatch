from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import status, views, permissions
from rest_framework.response import Response
from .models import Study
from .serializers import RecruiteeWithStudySerializer
from Mo.models import Matches
from ResearchSwipe.models import User
from .serializers import StudySerializer


class StudyCreate(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Get the authenticated user
        User = get_user_model()
        user = request.user
        
        # Filter studies based on the user's ID
        studies = Study.objects.filter(user=user)
        serializer = StudySerializer(studies, many=True)  # Serialize the filtered queryset
        return Response(serializer.data)  # Return serialized data as response

    def post(self, request, *args, **kwargs):
        serializer = StudySerializer(data=request.data)
        if serializer.is_valid():
            # Assuming you want to save the user automatically
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        # Get the authenticated user
        User = get_user_model()
        user = request.user
        
        # Get the study object to delete
        study_id = kwargs.get('study_id')  # Assuming 'study_id' is passed as a parameter in the URL
        study = get_object_or_404(Study, pk=study_id, user=user)

        # Delete the study object, which will cascade delete related objects due to ForeignKey and ManyToManyField relationships
        study.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class MatchedRecruitees(views.APIView):

    def get(self, request, *args, **kwargs):
        try:
            # Retrieve all studies associated with the signed-in recruiter
            studies = Study.objects.filter(user=request.user)
            
            # Retrieve all matches where both study_status and recruitee_status are 'accepted'
            # and where the study belongs to the signed-in recruiter
            matches = Matches.objects.filter(
                study_status='accepted',
                recruitee_status='accepted',
                study__in=studies  # Filter by studies associated with the recruiter
            )

            # Serialize the matches data with study and recruitee information
            serializer = RecruiteeWithStudySerializer(matches, many=True)
            
            # Return the serialized data as a response
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Matches.DoesNotExist:
            return Response({'detail': 'No matches found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Optionally, log the exception here
            return Response({'detail': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)