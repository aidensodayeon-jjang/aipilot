import os
import json
import requests
from pathlib import Path

# secrets.json이 edupilot-backend/ 폴더에 있다고 가정
current_dir = Path(__file__).resolve().parent
secret_file = current_dir.parent / 'secrets.json'

with open(secret_file) as f:
    secrets = json.loads(f.read())

slack_token = secrets.get("SLACK_BOT_TOKEN")

if not slack_token:
    print("SLACK_BOT_TOKEN not found in secrets.json")
    exit(1)

url = "https://slack.com/api/conversations.list"
headers = {"Authorization": f"Bearer {slack_token}"}
# 비공개 채널도 포함하도록 설정
params = {"types": "public_channel,private_channel", "limit": 1000}

response = requests.get(url, headers=headers, params=params)
data = response.json()

if not data.get("ok"):
    print(f"Error fetching channels: {data.get('error')}")
    exit(1)

channels = data.get("channels", [])
found = False
print(f"Total channels found: {len(channels)}")
for channel in channels:
    if channel.get("name") == "mokdong_student":
        print(f"FOUND: name={channel.get('name')}, id={channel.get('id')}")
        found = True
        break

if not found:
    print("Channel 'mokdong_student' not found in the list.")
    print("Listing all channels:")
    for c in channels:
        print(f"- {c.get('name')} ({c.get('id')})")
