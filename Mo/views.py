from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Matches
from .serializers import ProfileInteractionSerializer
from Syed.models import Study
from django.db.models import Q

class RefreshRejectedProfile(APIView):
    """
    View to refresh a rejected profile, making it available for reconsideration.
    """

    def get(self, request, *args, **kwargs):
        
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
