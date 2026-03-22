import os
import json
import requests
from pathlib import Path

current_dir = Path(__file__).resolve().parent
secret_file = current_dir.parent / 'secrets.json'

with open(secret_file) as f:
    secrets = json.loads(f.read())

slack_token = secrets.get("SLACK_BOT_TOKEN")
channel_id = "C03U241L079" # settings.base.py에 있는 기본값

url = f"https://slack.com/api/conversations.info?channel={channel_id}"
headers = {"Authorization": f"Bearer {slack_token}"}

response = requests.get(url, headers=headers)
data = response.json()

if data.get("ok"):
    c = data.get("channel")
    print(f"Channel ID {channel_id} is '{c.get('name')}'")
else:
    print(f"Error for {channel_id}: {data.get('error')}")
