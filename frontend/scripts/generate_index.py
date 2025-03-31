import requests
import json

username = "ikshv"
url = f"https://api.github.com/users/{username}/repos"
response = requests.get(url)

repos = response.json()

for repo in repos:
    print(
        {
            "title": repo["name"],
            "url": repo["html_url"],
            # "description": repo["description"],
            # "created_at": repo["created_at"],
            # "updated_at": repo["updated_at"]
        }
    )

    


