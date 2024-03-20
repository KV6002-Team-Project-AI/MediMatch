from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Matches
<<<<<<< Updated upstream
from .serializers import ProfileInteractionSerializer
from Syed.models import Study
=======
from .serializers import MatchesSerializer
from Syed.models import Study  # Make sure to import the Study model
>>>>>>> Stashed changes
from django.db.models import Q

class RefreshRejectedProfile(APIView):
    """
    View to refresh a rejected profile, making it available for reconsideration.
    """

    def get(self, request, *args, **kwargs):
<<<<<<< Updated upstream
        user_studies = Study.objects.filter(user=request.user)

        rejected_interactions = Matches.objects.filter(
            Q(study__in=user_studies) & 
            (Q(recruitee_status='rejected') | Q(study_status='rejected'))
        ).order_by('-match_id')

        if rejected_interactions.exists():
            interaction_to_refresh = rejected_interactions.first()
            interaction_to_refresh.recruitee_status = 'pending'
            interaction_to_refresh.study_status = 'pending'
            interaction_to_refresh.save()

            # Use the serializer to prepare the output data
            serializer = ProfileInteractionSerializer(interaction_to_refresh)
            return Response(serializer.data, status=status.HTTP_200_OK)

=======
        user_studies = Study.objects.filter(user=request.user)  # Get all studies for the logged-in user

        # Attempt to fetch a previously rejected profile interaction
        # Filter by studies and check the status based on the boolean field
        rejected_interactions = Matches.objects.filter(
            study__in=user_studies,
            status=False  # Assuming False represents rejected
        ).order_by('interaction_date')

        if rejected_interactions.exists():
            # Optionally, update the interaction status or simply return the profile for reconsideration
            interaction_to_refresh = rejected_interactions.first()
            recruitee = interaction_to_refresh.recruitee

            # Prepare the data to send back, including the recruitee information
            data = {
                "message": "Profile refreshed for reconsideration.",
                "recruitee": {
                    # Here you can serialize the recruitee data or simply return an ID
                    "id": recruitee.id,
                    # Add more fields as needed
                }
            }
            return Response(data, status=status.HTTP_200_OK)
        
>>>>>>> Stashed changes
        return Response({"message": "No rejected profiles to refresh"}, status=status.HTTP_404_NOT_FOUND)
