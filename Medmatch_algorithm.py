import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler

volunteers_df = pd.read_csv('/Users/mehdiamrani/Desktop/projectmoney/uni project/volunteers_unique.csv')
recruiter_df = pd.read_csv('/Users/mehdiamrani/Desktop/projectmoney/uni project/updated_recruiter.csv')

def match_multiple_options(volunteer_option, recruiter_option):
    """
    Check if the volunteer's option matches any of the recruiter's options.
    """
    if recruiter_option.lower() == "any":
        return 1
    recruiter_options = recruiter_option.split(", ")
    if volunteer_option in recruiter_options:
        return 1
    return 0

def rank_volunteers(volunteers_df, recruiter_req):
    categorical_features = ['Gender', 'Hair Colour', 'Skin Colour', 'Profession', 'Commitment', 'Work Preference']
    
    for feature in categorical_features:
        recruiter_option = recruiter_req[feature]
        volunteers_df[feature + '_score'] = volunteers_df[feature].apply(lambda x: match_multiple_options(x, recruiter_option))
    
    # Handle Allergies separately
    if recruiter_req['Allergies'].lower() == "no allergies":
        volunteers_df['Allergies_score'] = np.where(volunteers_df['Allergies'].str.lower() == "no allergies", 1, 0)
    else:

        volunteers_df['Allergies_score'] = volunteers_df['Allergies'].apply(lambda x: match_multiple_options(x, recruiter_req['Allergies']))
    
    numerical_features = ['Age', 'Height', 'Weight']
    scaler = MinMaxScaler(feature_range=(0, 1))
    volunteers_normalized = scaler.fit_transform(volunteers_df[numerical_features])
    recruiter_normalized = scaler.transform(recruiter_req[numerical_features].values.reshape(1, -1))
    
    for i, feature in enumerate(numerical_features):
        volunteers_df[feature + '_score'] = 1 - abs(volunteers_normalized[:, i] - recruiter_normalized[:, i])
    
    total_score_col = [f + '_score' for f in categorical_features + ['Allergies'] + numerical_features]
    volunteers_df['Total_Score'] = volunteers_df[total_score_col].sum(axis=1)
    
    return volunteers_df[['Name'] + total_score_col + ['Total_Score']].sort_values(by='Total_Score', ascending=False)

all_top_20_volunteers = pd.DataFrame()

for index, recruiter_req in recruiter_df.iterrows():
    ranked_volunteers = rank_volunteers(volunteers_df.copy(), recruiter_req)
    top_20 = ranked_volunteers.head(0)
    top_20['Rank'] = range(1, 21)
    top_20['Recruiter'] = recruiter_req['Name']
    cols = ['Recruiter', 'Rank', 'Name'] + [col for col in top_20.columns if col not in ['Recruiter', 'Rank', 'Name']]
    top_20 = top_20[cols]
    all_top_20_volunteers = pd.concat([all_top_20_volunteers, top_20], ignore_index=True)

all_top_20_volunteers.to_csv('/Users/mehdiamrani/Desktop/projectmoney/uni project/all_top_20_volunteers.csv', index=False)
print("Saved all top 20 volunteers for each recruiter to all_top_20_volunteers.csv")
