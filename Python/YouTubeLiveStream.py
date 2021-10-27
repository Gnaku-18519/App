'''@author AJWuu'''

# Run youtube.liveStreams.insert
# Document: https://developers.google.com/youtube/v3/live/docs/liveStreams/insert

import os
import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors

scopes = ["https://www.googleapis.com/auth/youtube.force-ssl"]
# scopes has to contain at least one of the following:
# https://www.googleapis.com/auth/youtube
# https://www.googleapis.com/auth/youtube.force-ssl

def main():
      # Disable OAuthlib's HTTPS verification when running locally.
      # *DO NOT* leave this option enabled in production.
      os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
      
      api_service_name = "youtube"
      api_version = "v3"
      client_secrets_file = "my_secrets_file_OAuth_param.json"
      
      # Get credentials and create an API client
      flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(client_secrets_file, scopes)
      credentials = flow.run_console()
      youtube = googleapiclient.discovery.build(api_service_name, api_version, credentials=credentials)
      
      # "part" identifies the properties that the write operation will set as well as the properties that the API response will include
      # The parameter values can be included are id, snippet, cdn, contentDetails and status
      request = youtube.liveStreams().insert(
        part="snippet,cdn,contentDetails,status",
        body={
          "snippet": {
            "title": "YouTube Live Test",
            "description": "This is an optional field. I'm writing here to rememeber this could be a choice."
          },
          "cdn": {
            "frameRate": "60fps",
            "ingestionType": "rtmp",
            "resolution": "1080p"
          },
          "contentDetails": {
            "isReusable": True
          },
          "status": {
            # We could stop the live by stopping the encoder, and the YouTube live will automatically shut down after a few minutes
          }
        }
        # onBehalfOfContentOwner=Content_Owner_ID
      )
      response = request.execute()
      
      print(response)

if __name__ == "__main__":
  main()