import requests
import json
import base64


def getRepos():
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

    return repos

url = "https://api.github.com/repos/ikshv/ikshv.github.io/contents/projects.json"
response = requests.get(url)
content = response.json()["content"]
decoded = base64.b64decode(content).decode("utf-8")
data = json.loads(decoded)
print(data)