import pandas as pd
import time
import requests
import praw
from requests_oauthlib import OAuth1
import base64

#_________________________________________________images to post_________________________________________________________________________________________

media_files = ["/Users/mehdiamrani/Desktop/projectmoney/uni project/Screenshot 2024-02-13 at 23.22.14.png"]

##___________________________________________________________________________________________________________________________________________________

#_________________________________________________telegram bot_________________________________________________________________________________________

bot_token = '6978869390:AAEkpdIn42aZ2m845qm98OqBeVYxTmZ-bwA'
chat_id = '-1002111033632'
def send_message_with_images(bot_token, chat_id, text ):
    text_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    text_params = {
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML'  
    }
    media = []
    for image_path in media_files:
        with open(image_path, 'rb') as image:
            files = {
                'photo': image
            }
            response = requests.post(f"https://api.telegram.org/bot{bot_token}/sendPhoto", data={'chat_id': chat_id}, files=files)
            if response.status_code == 200:
                photo_id = response.json()['result']['photo'][-1]['file_id'] 
                media.append({'type': 'photo', 'media': photo_id})
            else:
                print(f"Error uploading image: {response.content}")

    return None
    text_response = requests.post(text_url, data=text_params)

##___________________________________________________________________________________________________________________________________________________

#_________________________________________________twitter bot_________________________________________________________________________________________

api_key = '1UHEljitnBbo1vmV4Rf3QnFNc'
api_secret_key = 'QOEc603fvsP0oqrYv3oBNpnJpOZ7rWsUDvpbw3ArEYoja7qMYu'
access_token = '1757158527536091136-UOZhr7biObFbXuHLfTn5tASOPefO4V'
access_token_secret = 'ZKAbQLJImUWYEtt2B3wLRsqjqoolu7elOIl8nTt7zXWsS'

def upload_media_oauth1(api_key, api_secret_key, access_token, access_token_secret, media_file):
    
    upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    auth = OAuth1(api_key, api_secret_key, access_token, access_token_secret)
    with open(media_file, 'rb') as file:
        media_data = base64.b64encode(file.read()).decode('utf-8')
    response = requests.post(upload_url, auth=auth, data={'media_data': media_data})
    if response.status_code == 200:
        media_id = response.json()['media_id_string']
        return media_id
    else:
        print(f"Failed to upload media: {response.status_code}, {response.text}")
        return None

def post_tweet_with_media_oauth1(api_key, api_secret_key, access_token, access_token_secret, post_content_twitter, media_files):
    media_ids = []
    

    for media_file in media_files:
        media_id = upload_media_oauth1(api_key, api_secret_key, access_token, access_token_secret, media_file)
        if media_id:
            media_ids.append(media_id)
    if media_ids:
        tweet_url = "https://api.twitter.com/2/tweets"
        auth = OAuth1(api_key, api_secret_key, access_token, access_token_secret)
        payload = {"text": post_content_twitter, "media": {"media_ids": media_ids}}
        response = requests.post(tweet_url, auth=auth, json=payload)
        if response.status_code == 201:
            print("Tweet with media posted successfully!")
            return response.json()
        else:
            print(f"Failed to post tweet: {response.status_code}, {response.text}")
            return None
    else:
        print("Failed to upload media, tweet not posted.")
        return None

##___________________________________________________________________________________________________________________________________________________

#_________________________________________________linkedin bot_________________________________________________________________________________________
access_token_linkedin ='AQU8m-o7P50ClODmZEnQXogilN14uIZULI8zkT503GVWA5FlQs78fyEf6z7HApr6fYw2eGariVdFx5Q7g2Hn44uBmwyMF3Eg7gT4OhKlTT57Pjd-ZGBh4STRgBzokymOmEu95FN0Ibzab_hN694azFe2eWWRo9nNkXcMV3kXfXiISHKmM7uhFlwOohmnDLkEi95P1ZkkigwGzoN8KoJnnRjktv1JBYYHq_moy5xjcurn1_4zfWVKwpBOLmZO7aMLpZ5zFoFlyJbYodyeG0UcMXYLII-pOA1LprsopZTYpvCvJvmagXY1j1cSa-Zd3XFLlC5KbM36PYNjS0UxNWyNTXO-LTEIug'

def upload_image_to_linkedin(access_token_linkedin, image_path):
    register_upload_url = 'https://api.linkedin.com/v2/assets?action=registerUpload'
    headers = {
        'Authorization': f'Bearer {access_token_linkedin}',
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
    }
    register_upload_data = {
        "registerUploadRequest": {
            "recipes": [
                "urn:li:digitalmediaRecipe:feedshare-image"
            ],
            "owner": "urn:li:person:UBoeSKj1P7",
            "serviceRelationships": [
                {
                    "relationshipType": "OWNER",
                    "identifier": "urn:li:userGeneratedContent"
                }
            ]
        }
    }
    response = requests.post(register_upload_url, headers=headers, json=register_upload_data)
    if response.status_code != 200:
        print(f"Failed to register image for upload. Status code: {response.status_code}, Response: {response.content}")
        return None
    upload_url = response.json()['value']['uploadMechanism']['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest']['uploadUrl']
    asset = response.json()['value']['asset']
    with open(image_path, 'rb') as image_file:
        upload_response = requests.put(upload_url, headers={'Authorization': f'Bearer {access_token_linkedin}'}, data=image_file)
    if upload_response.status_code in [200, 201]:
        return asset 
    else:
        print(f"Failed to upload image. Status code: {upload_response.status_code}, Response: {upload_response.content}")
        return None

def create_post_with_image_linkedin(access_token_linkedin, post_content, assets):
    url = 'https://api.linkedin.com/v2/ugcPosts'
    headers = {
        'Authorization': f'Bearer {access_token_linkedin}',
        'X-Restli-Protocol-Version': '2.0.0',
        'Content-Type': 'application/json'
    }
    post_data = {
        "author": "urn:li:person:UBoeSKj1P7",
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": post_content
                },
                "shareMediaCategory": "IMAGE",
                "media": assets
            }
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
    }
    response = requests.post(url, headers=headers, json=post_data)
    if response.status_code == 201:
        print("")
    else:
        print(f"Failed to create post with image on LinkedIn. Status code: {response.status_code}, Response: {response.content}")


##___________________________________________________________________________________________________________________________________________________

#_________________________________________________posting trigger_________________________________________________________________________________________

 
    
def post_to_social_media(reddit_posting=True, facebook=True, twitter=True, telegram=True, linkedin=True):
    # Reddit setup
    reddit = praw.Reddit(
        client_id='Xe4XRlAEI4-dGWMQgbWmmw',
        client_secret='JhtX1TRSOnnmwwhMifFeutfdWaUeTQ',
        password='dawdiCHTIAR2002',
        user_agent="python:MedMatchBot:v1.0.0 (by /u/Hot-Awareness4763)",
        username='Hot-Awareness4763',
    )
    subreddit_name = "MedMatch"

    # Facebook setup
    page_id = '222759997594492'
    long_lived_access_token = 'EAAFOr7LZB9UABO6tVOFIRFPLPhZBx2Eft1avdaAZAy1l1CMMz8nbie0L080nTXO3INFXct3ZADaMyEgawEzJVYr3Ni3gBVxREvBFvhweEXdIvfb1eh2t2d19zWjR6yFAlmmajuKK7gTjQDf5quvvl7KyzaG70zQa6BHZB09IPi6EkAFNNc4KhsuruRA7fX9UBK7sbOgu8qoMinnrqo3ClLj8ZD'
    facebook_url = f"https://graph.facebook.com/v13.0/{page_id}/feed"
    
    
    def upload_image_to_facebook(media_files, page_id, access_token):
        facebook_url_image = f"https://graph.facebook.com/v13.0/{page_id}/photos"
        files = {'file': open(media_files, 'rb')}
        data = {
            'access_token': access_token,
            'published': False  
        }
        response = requests.post(facebook_url_image, files=files, data=data)
        return response.json()
    # Telegram setup
    telegram_bot_token = '6978869390:AAEkpdIn42aZ2m845qm98OqBeVYxTmZ-bwA'
    telegram_chat_id = '-1002111033632'
    
    # Load data
    file_path = 'clinical_research_studies_full.csv'
    df = pd.read_csv(file_path)

    for index, row in df.iterrows():
        recruiter = row['Recruiter']
        title = row['Title']
        description = row['Description']
        Description_twitter = row['Description_twitter']
        post_content = f"{recruiter} is a recruiter looking for volunteers to participate in a study under the title:\n\n{title}\n\n{description}\n\ncheck out our website for more studies and info \n\nhttps://similartoolz.com/"
        post_content_twitter = f"{recruiter} looking for volunteers to part take in this study:\n\n{title}\n{Description_twitter}\n\ncheck our website for more studies\nhttps://similartoolz.com/"
        if reddit_posting:
            # Post to Reddit
            subreddit = reddit.subreddit(subreddit_name)
            subreddit.submit(f'Opportunity: {title}', selftext=post_content)
            print(f'Posted to Reddit for {recruiter}.')

        if facebook:
            # Post to Facebook
            image_ids = [upload_image_to_facebook(media_files, page_id, long_lived_access_token)['id'] for media_files in media_files]
            headers = {"Content-Type": "application/json"}
            
            data = {
                "message": post_content,
                "attached_media": [{'media_fbid': image_id} for image_id in image_ids],
                "access_token": long_lived_access_token
            }
            response = requests.post(facebook_url, headers=headers, json=data)
            print(f'Posted to Facebook for {recruiter}.')

        if twitter:
            # Post to Twitter
            try:
                post_tweet_with_media_oauth1(api_key, api_secret_key, access_token, access_token_secret, post_content_twitter, media_files)
                print(f'Posted to Twitter for {recruiter}.')
            except Exception as e:
                print(f"Failed to post to Twitter for {recruiter}.")
        
        if telegram:
            # Post to Telegram
            send_message_with_images(telegram_bot_token, telegram_chat_id, post_content)
            print(f'Posted to Telegram for {recruiter}.')
            
        if linkedin:
            assets = []
            for image_path in media_files:
                asset = upload_image_to_linkedin(access_token_linkedin, image_path)
                if asset:
                    assets.append({"media": asset, "status": "READY",
                                "description": {"text": post_content},
                                "title": {"text": ""}})
            if assets:
                create_post_with_image_linkedin(access_token_linkedin, post_content, assets)
                print(f'Posted to LinkedIn for {recruiter}.')
            else:
                print("Failed to upload images, cannot create post on LinkedIn.")
            
        if index + 1 < 50:
            next_recruiter = df.iloc[index + 1]['Recruiter']
            print(f"Completed postings for {recruiter}. Next posts for {next_recruiter} in 30 minutes.")
        else:
            print(f"Completed postings for {recruiter}. No more posts scheduled.")
            
        time.sleep(1800)
post_to_social_media(reddit_posting=False, facebook=False, twitter=False, telegram=False, linkedin=False)
