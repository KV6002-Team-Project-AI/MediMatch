"""
This Django module contains API views for handling match actions for both recruitees and recruiters in a research recruitment platform.
The module defines two primary classes, `MatchActionView` and `RecruiterMatchUpdateView`, which inherit from Django's `APIView`.

- `MatchActionView`:
    Handles POST and GET requests for recruitees. The POST method allows recruitees to update the status of their matches
    (accept or reject) based on user input. The GET method fetches all pending matches for the recruitee, sorted by ranking.
    
    Permission: Only authenticated users can access this view.

- `RecruiterMatchUpdateView`:
    Handles POST and GET requests for recruiters. The POST method allows recruiters to update the status of a study's matches
    (accept or reject) based on user input. The GET method fetches all pending matches for a recruiter's study, also sorted by ranking.
    
    Permission: Only authenticated users can access this view.

Both classes utilize the `ProfileInteractionSerializer` for serializing the match data to and from JSON format. The views ensure
that only authorized users can update match statuses by checking if the requesting user matches the user ID associated with a recruitee
or the owner of the study for a recruiter.

Exceptions are handled to provide meaningful error responses, including scenarios where matches or studies are not found, invalid parameters
are provided, or unexpected errors occur.

Dependencies:
- `rest_framework.views.APIView`: Base class for handling HTTP requests.
- `rest_framework.response.Response`: Used to return responses from API views.
- `rest_framework.status`: Provides HTTP status codes.
- `rest_framework.permissions.IsAuthenticated`: Ensures that only authenticated users can access the views.
- `django.db.models.F`: Allows ordering of querysets based on model fields.
- `.models.Matches`: The model representing match instances.
- `ResearchSwipe.models.Recruitee` and `Syed.models.Study`: Models representing recruitees and studies.
- `.serializers.ProfileInteractionSerializer`: Serializer for match instances.

Usage:
These views are to be hooked into the URLs configuration of a Django project to provide RESTful endpoints for managing match actions
related to recruitment studies.
"""


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import F
from .models import Matches
from ResearchSwipe.models import Recruitee
from Syed.models import Study
from .serializers import ProfileInteractionSerializer


class RecruiteeMatchUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        action = request.data.get('action')
        user_id = request.data.get('user_id')
        study_id = request.data.get('study_id')


        if not all([action, user_id, study_id]):
            return Response({'detail': 'Missing parameters.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            match = Matches.objects.get(study_id=study_id, user__user_id=user_id)
            
            updated_status = 'accepted' if action == 'accepted' else 'rejected' if action == 'rejected' else None
            if updated_status is None:
                return Response({'detail': 'Invalid status.'}, status=status.HTTP_400_BAD_REQUEST)

            if request.user.recruitee.pk == int(user_id):
                match.recruitee_status = updated_status
            else:
                return Response({'detail': 'You do not have permission to update this match.'}, status=status.HTTP_403_FORBIDDEN)

            match.save()
            serializer = ProfileInteractionSerializer(match)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Matches.DoesNotExist:
            return Response({'detail': 'Match not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Recruitee.DoesNotExist:
            return Response({'detail': 'Recruitee not found.'}, status=status.HTTP_404_NOT_FOUND)
        
    def get(self, request, *args, **kwargs):
        try:
            pending_matches = Matches.objects.filter(
                recruitee_status='pending',
                user__user_id=request.user
            ).select_related('user').order_by(F('ranking').asc(nulls_last=True))
            
            serializer = ProfileInteractionSerializer(pending_matches, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Matches.DoesNotExist:
            return Response({'detail': 'No pending matches found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RecruiterMatchUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        study_id = request.data.get('study_id')
        user_id = request.data.get('user_id')
        action = request.data.get('action')

        if action not in ['accepted', 'rejected']:
            return Response({'detail': 'Invalid action.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            study = Study.objects.get(pk=study_id, user=request.user)
            match = Matches.objects.get(study=study, user__user_id=user_id)

            match.study_status = action
            match.save()

            serializer = ProfileInteractionSerializer(match)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Study.DoesNotExist:
            return Response({'detail': 'Study not found or you do not have permission to access it.'}, status=status.HTTP_404_NOT_FOUND)
        except Matches.DoesNotExist:
            return Response({'detail': 'Match not found or you do not have permission to update it.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def get(self, request, *args, **kwargs):
            try:
                pending_matches = Matches.objects.filter(
                    study_status='pending',
                    study__user=request.user
                ).select_related('user').order_by(F('ranking').asc(nulls_last=True))
                
                serializer = ProfileInteractionSerializer(pending_matches, many=True)
                
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            except Matches.DoesNotExist:
                return Response({'detail': 'No pending matches found.'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'detail': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)