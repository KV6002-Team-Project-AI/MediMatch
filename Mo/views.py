from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import F
from .models import Matches
from ResearchSwipe.models import Recruitee
from Syed.models import Study
from .serializers import ProfileInteractionSerializer


# Recruitees API, POST and GET methods accepted
# POST method changes current status for recruitee from the default pending state to accepted or rejected depending on user input from frontend
# GET method retrieves all instances where the users current state is the default state (pending) in order of ranking
# Rank 1 being the best suited for a specific study and rank 100 being the worst for a speific study
class MatchActionView(APIView):
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
            ).select_related('user').order_by(F('study_rank').asc(nulls_last=True))
            
            serializer = ProfileInteractionSerializer(pending_matches, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Matches.DoesNotExist:
            return Response({'detail': 'No pending matches found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Recruiters API, POST and GET methods accepted
# POST method changes current status for study from the default pending state to accepted or rejected depending on user input from frontend
# GET method retrieves all instances where the users current state is the default state (pending) in order of ranking
# Rank 1 being the best suited for a specific study and rank 100 being the worst for a speific study
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
                ).select_related('user').order_by(F('recruitee_rank').asc(nulls_last=True))
                
                serializer = ProfileInteractionSerializer(pending_matches, many=True)
                
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            except Matches.DoesNotExist:
                return Response({'detail': 'No pending matches found.'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'detail': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)