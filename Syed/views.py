# Author: Syed Wajahat Quadri (w21043564)
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import status, views, permissions
from rest_framework.response import Response
from .models import Study
from Mo.models import Matches
from Mo.serializers import ProfileInteractionSerializer
from .serializers import StudySerializer

class StudyCreate(views.APIView):
    """
    API endpoint to create a new study.

    Methods:
        get: Retrieve studies associated with the authenticated user.
        post: Create a new study.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Retrieve studies associated with the authenticated user.

        Returns:
            Response: A JSON response with the serialized data of studies.
        """
        User = get_user_model()
        user = request.user

        try:
            studies = Study.objects.filter(user=user, isExpired=False)
            serializer = StudySerializer(studies, many=True)  
            return Response(serializer.data, status=status.HTTP_201_CREATED)  
        except Study.DoesNotExist:
            return Response({'detail': 'Study not found or you do not have permission to access it.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, *args, **kwargs):
        """
        Create a new study.

        Returns:
            Response: A JSON response with the serialized data of the created study.
        """
        serializer = StudySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudyUpdate(views.APIView):
    """
    API endpoint to update a study.

    Methods:
        get: Retrieve a specific study for updating.
        put: Update an existing study.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Retrieve a specific study for updating.

        Returns:
            Response: A JSON response with the serialized data of the study.
        """
        User = get_user_model()
        user = request.user
        study_id = kwargs['study_id']

        try:
            study = Study.objects.get(pk=study_id, user=user)
            serializer = StudySerializer(study) 
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Study.DoesNotExist:
            return Response({'detail': 'Study not found or you do not have permission to access it.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def put(self, request, *args, **kwargs):
        """
        Update an existing study.

        Returns:
            Response: A JSON response with the serialized data of the updated study.
        """
        try:
            study_id = kwargs['study_id']
            study = Study.objects.get(pk=study_id)
            
        except Study.DoesNotExist:
            return Response({"message": "Study not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = StudySerializer(study, data=request.data)
        if serializer.is_valid():
            serializer.update(study, serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudyExpire(views.APIView):
    """
    API endpoint to expire a study.

    Methods:
        post: Expire a study.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Expire a study.

        Returns:
            Response: A JSON response with the serialized data of the updated study.
        """
        study_id = request.data.get('study_id')
        is_expired = request.data.get('isExpired')

        if is_expired is not True:
            return Response({'detail': 'Invalid action. isExpired must be set to True.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            study = Study.objects.get(pk=study_id, user=request.user)
            study.isExpired = is_expired
            study.save()
            serializer = StudySerializer(study)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Study.DoesNotExist:
            return Response({'detail': 'Study not found or you do not have permission to access it.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class MatchedRecruitees(views.APIView):
    """
    API endpoint to retrieve matched recruitees for a recruiter.

    Methods:
        get: Retrieve matched recruitees for the recruiter.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Retrieve matched recruitees for the recruiter.

        Returns:
            Response: A JSON response with the serialized data of matched recruitees.
        """
        try:
            studies = Study.objects.filter(user=request.user)
            matches = Matches.objects.filter(
                study_status='accepted',
                recruitee_status='accepted',
                study__in=studies
            )
            serializer = ProfileInteractionSerializer(matches, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Matches.DoesNotExist:
            return Response({'detail': 'No matches found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class MatchedRecruiters(views.APIView):
    """
    API endpoint to retrieve matched recruiters for a recruitee.

    Methods:
        get: Retrieve matched recruiters for the recruitee.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Retrieve matched recruiters for the recruitee.

        Returns:
            Response: A JSON response with the serialized data of matched recruiters.
        """
        try:
            recruitee_id = request.user.id
            accepted_matches = Matches.objects.filter(
                recruitee_status='accepted',
                study_status='accepted',
                user_id=recruitee_id
            )
            serializer = ProfileInteractionSerializer(accepted_matches, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'detail': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
