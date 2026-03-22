import os
import json
import requests
from pathlib import Path

current_dir = Path(__file__).resolve().parent
secret_file = current_dir.parent / 'secrets.json'

with open(secret_file) as f:
    secrets = json.loads(f.read())

slack_token = secrets.get("SLACK_BOT_TOKEN")

# 사용자가 참여한 채널 목록 조회
url = "https://slack.com/api/users.conversations"
headers = {"Authorization": f"Bearer {slack_token}"}
params = {"types": "public_channel,private_channel", "limit": 1000}

response = requests.get(url, headers=headers, params=params)
data = response.json()

if not data.get("ok"):
    print(f"Error: {data.get('error')}")
    exit(1)

channels = data.get("channels", [])
print(f"Total joined channels: {len(channels)}")
for channel in channels:
    print(f"- {channel.get('name')} (ID: {channel.get('id')})")
