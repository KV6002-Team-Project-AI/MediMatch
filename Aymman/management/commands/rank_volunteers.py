import requests
from django.core.management.base import BaseCommand
import pandas as pd
from Aymman.models import Rank
from Syed.models import Study
from Mo.models import Matches
from ResearchSwipe.models import Recruitee, Recruiter


class Command(BaseCommand):
    help = 'Fetches data and ranks volunteers based on study requirements'

    def add_arguments(self, parser):
        
        pass

    def handle(self, *args, **options):
      
        def fetch_api_data(url):
            response = requests.get(url)
            if response.status_code == 200:
                return response.json()
            else:
                print(f"Failed to fetch data. Status code: {response.status_code}")
                return []

        # Place the logic of fetching data, processing it, and pushing rankings to the database here
        volunteers_url = "http://127.0.0.1:8000/api/get-recruitees-aymane/"
        studies_url = "http://127.0.0.1:8000/api/get-studies/"
        volunteers_data = fetch_api_data(volunteers_url)
        studies_data = fetch_api_data(studies_url)

        volunteers_df = pd.DataFrame(volunteers_data)
        studies_df = pd.DataFrame(studies_data)
        

        def is_feature_match(study_feature, volunteer_feature):
            if study_feature in [None, '', ' ']:
                return 1
            
            # Split the study feature if it contains comma-separated values and strip whitespace
            if isinstance(study_feature, str) and ',' in study_feature:
                study_features = [feature.strip() for feature in study_feature.split(',')]
                # Check if the volunteer feature matches any of the split study features
                return 1 if volunteer_feature in study_features else 0
            
            # Direct comparison for non-list, non-empty values
            return 1 if study_feature == volunteer_feature else 0

        def rank_volunteers(volunteers_df, studies_df):
            categorical_features = [
                'biological_sex',
                'hair_color',
                'profession',
                'ethnicity',
                'pregnancy_status',
                'language_preferences',
                'health_status',
                'duration',
                'work_preference'
            ]

            numerical_features_study = [
                'min_age',
                'max_age', 
                'min_height',
                'max_height', 
                'min_weight', 
                'max_weight'
            ]

            numerical_features_volunteers = [
                'age',
                'height',
                'weight'
            ]

            ranking_results = []

            for index, study in studies_df.iterrows():
                for _, volunteer in volunteers_df.iterrows():
                    match_details = {}

                    for feature in categorical_features:
                        study_feature = study.get(feature)
                        volunteer_feature = volunteer.get(feature)
                        match_details[feature + "_match"] = is_feature_match(study_feature, volunteer_feature)

                    numerical_match_score = 0
                    for i, num_feature in enumerate(numerical_features_volunteers):
                        match = 1 if study[numerical_features_study[i*2]] <= volunteer[num_feature] <= study[numerical_features_study[i*2+1]] else 0
                        numerical_match_score += match
                        match_details[num_feature + "_match"] = match

                    match_details['study_id'] = study['study_id']
                    match_details['user_id'] = volunteer['user_id']
                    match_details['user'] = study['user']
                    match_details['isExpired'] = study['isExpired']

                    total_numeric_values = sum(value for value in match_details.values() if isinstance(value, (int, float)))

                    match_details['total_match_score'] = total_numeric_values - match_details.get('study_id', 0) - match_details.get('user_id', 0)

                    ranking_results.append(match_details)

            ranking_df = pd.DataFrame(ranking_results)
            ranking_df.sort_values(by=['study_id', 'total_match_score'], ascending=[True, False], inplace=True)
            ranking_df['ranking_basedon_study'] = ranking_df.groupby('study_id')['total_match_score'].rank(ascending=False, method='first').astype(int)
            return ranking_df

        ranked_volunteers_df = rank_volunteers(volunteers_df, studies_df)

        exclude_columns = [
            'biological_sex_match',
            'hair_color_match',
            'profession_match',
            'ethnicity_match', 
            'pregnancy_status_match',
            'language_preferences_match',
            'health_status_match', 
            'work_preference_match',
            'age_match',
            'height_match',
            'weight_match',
            'total_match_score',
            'duration_match',
        ]

        final_output_df = ranked_volunteers_df.drop(columns=exclude_columns)
        self.push_rankings_to_database(final_output_df)

    def push_rankings_to_database(self, final_output_df):
        for _, row in final_output_df.iterrows():
            study_instance = Study.objects.get(study_id=row['study_id'])
            user_instance = Recruitee.objects.get(user=row['user_id'])
            recruiter_instance = Recruiter.objects.get(user=row['user'])  # Note: variable names should follow Python naming conventions

            # Initialize default statuses; these may be updated based on the row's 'isExpired' flag
            default_study_status = 'pending'  # Assume 'pending' as default, adjust if your logic differs
            default_recruitee_status = 'pending'  # Assume 'pending' as default, adjust if your logic differs

            # Attempt to fetch an existing match to check current statuses
            match, created = Matches.objects.get_or_create(
                study=study_instance,
                user=user_instance,
                recruiter=recruiter_instance,
                defaults={
                    'ranking': row['ranking_basedon_study'],
                    'study_status': default_study_status,
                    'recruitee_status': default_recruitee_status
                }
            )

            if row['isExpired']:
                match.study_status = 'expired'
                match.recruitee_status = 'expired'
            elif not created:
                pass

            match.save()