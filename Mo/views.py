from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Matches
from Syed.models import Study  # Adjusted import for the Study model
from .serializers import ProfileInteractionSerializer

class MatchActionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        match_id = request.data.get('match_id')
        action = request.data.get('action')
        study_id = request.data.get('study_id')  # Corrected to get study_id from request data
        # recrutee_id = request.data.get('recrutee_id')  # Uncomment if you're using recrutee_id
        user = request.user

        if not match_id or not action or not study_id:  # Check for study_id presence
            return Response({'detail': 'Missing parameters.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            match = Matches.objects.get(pk=match_id)
            # Ensure the match is associated with the specific study_id
            match.study = Study.objects.get(pk=study_id)

            # Ensure the user is part of the match
            if user != match.user and user != match.study.user:  # Assuming 'user' field directly relates to a User instance
                return Response({'detail': 'You do not have permission to update this match.'}, status=status.HTTP_403_FORBIDDEN)

            if action == 'accept':
                # Logic to set accept/reject status
                # Assuming 'user' comparison as before, update as necessary for your model relationships
                match.recruitee_status = True if user == match.user else False
                match.study_status = True if user == match.study.user else False
            elif action == 'reject':
                match.recruitee_status = False if user == match.user else True
                match.study_status = False if user == match.study.user else True
            else:
                return Response({'detail': 'Invalid action.'}, status=status.HTTP_400_BAD_REQUEST)

            match.save()
            serializer = ProfileInteractionSerializer(match)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except (Matches.DoesNotExist, Study.DoesNotExist):
            return Response({'detail': 'Match or Study not found.'}, status=status.HTTP_404_NOT_FOUND)
