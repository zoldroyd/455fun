import urllib.request
import json

# Data: one row per recommendation candidate
rows = [
    {
        "personId": -1007001694607905623,
        "contentId": 8729086959762650511,
        "eventRating": 5,
        "timestamp": "2025-04-04T16:57:00Z",
        "userClient": "web",
        "userCountry": "US"
    },
    {
        "personId": -1007001694607905623,
        "contentId": 	
6541551984368289722,
        "eventRating": 5,
        "timestamp": "2025-04-04T16:57:00Z",
        "userClient": "web",
        "userCountry": "US"
    },
    {
        "personId": -1007001694607905623,
        "contentId": 6369367631770966886,
        "eventRating": 5,
        "timestamp": "2025-04-04T16:57:00Z",
        "userClient": "web",
        "userCountry": "US"
    },
    {
        "personId": -1007001694607905623,
        "contentId": -3462051751080362224,
        "eventRating": 5,
        "timestamp": "2025-04-04T16:57:00Z",
        "userClient": "web",
        "userCountry": "US"
    },
    {
        "personId": -1007001694607905623,
        "contentId": -2402288292108892893,
        "eventRating": 5,
        "timestamp": "2025-04-04T16:57:00Z",
        "userClient": "web",
        "userCountry": "US"
    },
    {
        "personId": -1007001694607905623,
        "contentId": -8142426490949346803,
        "eventRating": 5,
        "timestamp": "2025-04-04T16:57:00Z",
        "userClient": "web",
        "userCountry": "US"
    },
]

# Go to the csv

# get the column name

# put that column in an array 

# copy that array 



# Wrap it in Azure's expected input schema
data = {
    "Inputs": {
        "input1": rows
    }
}

body = str.encode(json.dumps(data))

url = 'http://ffe7e592-c9f6-4a63-95a9-d9f970a81091.eastus2.azurecontainer.io/score'
# Replace this with the primary/secondary key, AMLToken, or Microsoft Entra ID token for the endpoint
api_key = 'aceC1p2TMQ1D0ROwtb7CpnqUdVidXOkC'
if not api_key:
    raise Exception("A key should be provided to invoke the endpoint")


headers = {'Content-Type':'application/json', 'Accept': 'application/json', 'Authorization':('Bearer '+ api_key)}

req = urllib.request.Request(url, body, headers)

try:
    response = urllib.request.urlopen(req)

    result = response.read()
    print(result)
except urllib.error.HTTPError as error:
    print("The request failed with status code: " + str(error.code))

# Print the headers - they include the requert ID and the timestamp, which are useful for debugging the failure
    print(error.info())
    print(error.read().decode("utf8", 'ignore'))