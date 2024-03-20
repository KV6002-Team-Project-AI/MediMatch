from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from .models import Matches
from .serializers import ProfileInteractionSerializer

class MatchActionView(APIView):
    """
    View to accept or reject a match by a recruitee or a study.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        match_id = request.data.get('match_id')
        action = request.data.get('action')  # 'accept' or 'reject'
        actor_type = request.data.get('actor_type')  # 'recruitee' or 'study'

        if not match_id or not action or not actor_type:
            return Response({'detail': 'Missing parameters.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            match = Matches.objects.get(match_id=match_id)
            # Here, you need to add logic to verify that the requester has the right to perform the action on the match.
            # This might involve checking if the logged-in user is the recruitee or part of the study related to this match.

            if action == 'accept':
                match.accept_match(actor_type)
            elif action == 'reject':
                match.reject_match(actor_type)
            else:
                return Response({'detail': 'Invalid action.'}, status=status.HTTP_400_BAD_REQUEST)

            serializer = ProfileInteractionSerializer(match)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Matches.DoesNotExist:
            return Response({'detail': 'Match not found.'}, status=status.HTTP_404_NOT_FOUND)
