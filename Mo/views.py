from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Matches
from .serializers import ProfileInteractionSerializer

class MatchActionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        match_id = request.data.get('match_id')
        action = request.data.get('action')
        user = request.user

        if not match_id or not action:
            return Response({'detail': 'Missing parameters.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            match = Matches.objects.get(pk=match_id)
            # Ensure the user is part of the match
            if user != match.user.user and user != match.study.user:
                return Response({'detail': 'You do not have permission to update this match.'}, status=status.HTTP_403_FORBIDDEN)

            if action == 'accept':
                if user == match.user.user:
                    match.recruitee_status = True
                elif user == match.study.user:
                    match.study_status = True
            elif action == 'reject':
                if user == match.user.user:
                    match.recruitee_status = False
                elif user == match.study.user:
                    match.study_status = False
            else:
                return Response({'detail': 'Invalid action.'}, status=status.HTTP_400_BAD_REQUEST)

            match.save()
            serializer = ProfileInteractionSerializer(match)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Matches.DoesNotExist:
            return Response({'detail': 'Match not found.'}, status=status.HTTP_404_NOT_FOUND)
