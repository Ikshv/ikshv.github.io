import requests
import json
import base64


def getRepos():
    owner = "ikshv"
    url = f"https://api.github.com/users/{owner}/repos"
    response = requests.get(url)

    repos = response.json()

    for repo in repos:
        try:
            getRepoDetails(repo["name"])
        except KeyError:
            # print(f"KeyError: {repo}")
            print("KeyError")
            

def getRepoDetails(repo):
    branch = "dev"
    owner = "ikshv"
    # repo = "ikshv.github.io"
    file_path = "project.json"
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{file_path}?ref={branch}"
    response = requests.get(url)
    content = response.json()["content"]
    decoded = base64.b64decode(content).decode("utf-8")
    data = json.loads(decoded)
    print(data)

# getRepoDetails()

getRepos()