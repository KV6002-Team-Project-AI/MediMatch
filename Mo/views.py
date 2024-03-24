from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Matches
from ResearchSwipe.models import Recruitee
from Syed.models import Study
from .serializers import ProfileInteractionSerializer

class MatchActionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        action = request.data.get('action')
        user_id = request.data.get('user_id')
        study_id = request.data.get('study_id')

        if not all([action, user_id, study_id]):
            return Response({'detail': 'Missing parameters.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Ensure the match is associated with the specified study and recruitee
            match = Matches.objects.get(study_id=study_id, user__user_id=user_id)
            
            # Logic to handle acceptance or rejection based on the role of the authenticated user
            updated_status = 'accepted' if action == 'accepted' else 'rejected' if action == 'rejected' else None
            if updated_status is None:
                return Response({'detail': 'Invalid status.'}, status=status.HTTP_400_BAD_REQUEST)

            # Update match status based on the role of the authenticated user
            if request.user.recruitee.pk == int(user_id):  # If the user is the recruitee
                match.recruitee_status = updated_status
            elif request.user.recruiter and match.study.user == request.user:  # If the user is the recruiter
                match.study_status = updated_status
            else:
                return Response({'detail': 'You do not have permission to update this match.'}, status=status.HTTP_403_FORBIDDEN)

            match.save()
            serializer = ProfileInteractionSerializer(match)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Matches.DoesNotExist:
            return Response({'detail': 'Match not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Recruitee.DoesNotExist:
            return Response({'detail': 'Recruitee not found.'}, status=status.HTTP_404_NOT_FOUND)
    

class RecruiterMatchUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        study_id = request.data.get('study_id')
        user_id = request.data.get('user_id')  # Add this to fetch user_id from request
        action = request.data.get('action')

        if action not in ['accepted', 'rejected']:
            return Response({'detail': 'Invalid action.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Verify the study belongs to the logged-in recruiter and the match exists for the given user_id
            study = Study.objects.get(pk=study_id, user=request.user)
            match = Matches.objects.get(study=study, user__user_id=user_id)  # Adjusted to filter by both study and user_id

            # Update the match status based on the action
            match.study_status = action
            match.save()

            # Serialize the updated match to return it as a response
            serializer = ProfileInteractionSerializer(match)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Study.DoesNotExist:
            return Response({'detail': 'Study not found or you do not have permission to access it.'}, status=status.HTTP_404_NOT_FOUND)
        except Matches.DoesNotExist:
            return Response({'detail': 'Match not found or you do not have permission to update it.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Optionally, log the exception here
            return Response({'detail': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    