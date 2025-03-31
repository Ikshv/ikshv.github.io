import os
import requests
import json
import base64

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
OWNER = "ikshv"
HEADERS = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

def get_repos():
    url = f"https://api.github.com/users/{OWNER}/repos"
    response = requests.get(url, headers=HEADERS)
    repos = response.json()

    if not isinstance(repos, list):
        print("❌ GitHub API error:", repos.get("message", "Unknown error"))
        return

    index = []

    for repo in repos:
        name = repo["name"]
        try:
            data = get_project_data(name)
            if data and data.get("live", False):
                index.append(data)
                print(f"✅ {name} included")
        except Exception as e:
            print(f"⚠️ Skipped {name}: {e}")

    with open("frontend/src/data/projectIndex.json", "w") as f:
        json.dump(index, f, indent=2)
        print(f"\n📦 {len(index)} live projects written to projectIndex.json")

def get_project_data(repo_name):
    meta_url = f"https://api.github.com/repos/{OWNER}/{repo_name}"
    meta_res = requests.get(meta_url, headers=HEADERS)
    branch = meta_res.json().get("default_branch", "main")

    file_url = f"https://api.github.com/repos/{OWNER}/{repo_name}/contents/project.json?ref={branch}"
    file_res = requests.get(file_url, headers=HEADERS)

    if file_res.status_code != 200:
        raise Exception("No project.json found")

    content = file_res.json()["content"]
    decoded = base64.b64decode(content).decode("utf-8")
    return json.loads(decoded)

# Run it
get_repos()
