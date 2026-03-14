import datetime
import hashlib
import hmac
import platform
import time
import uuid

import requests

from api.utils.config import protocol, domain, prefix, apiKey, apiSecret


def format_datetime(value, format='%H시 %M분'):
    return datetime.datetime.strptime(value, '%Y%m%d%H%M').strftime(format)


def get_url(path):
    url = '%s://%s' % (protocol, domain)
    if prefix != '':
        url = url + prefix
    url = url + path
    return url


def unique_id():
    return str(uuid.uuid1().hex)


def get_iso_datetime():
    utc_offset_sec = time.altzone if time.localtime().tm_isdst else time.timezone
    utc_offset = datetime.timedelta(seconds=-utc_offset_sec)
    return datetime.datetime.now().replace(tzinfo=datetime.timezone(offset=utc_offset)).isoformat()


def get_signature(key, msg):
    return hmac.new(key.encode(), msg.encode(), hashlib.sha256).hexdigest()


def get_headers(api_key, api_secret):
    date = get_iso_datetime()
    salt = unique_id()
    data = date + salt
    return {
        'Authorization': 'HMAC-SHA256 ApiKey=' + api_key + ', Date=' + date + ', salt=' + salt + ', signature=' + get_signature(
            api_secret, data),
        'Content-Type': 'application/json; charset=utf-8'
    }


def send_many(data):
    data['agent'] = {
        'sdkVersion': 'python/4.2.0',
        'osPlatform': platform.platform() + " | " + platform.python_version()
    }
    return requests.post(get_url('/messages/v4/send-many'), headers=get_headers(apiKey, apiSecret), json=data)


def send_one(data):
    return requests.post(get_url('/messages/v4/send'), headers=get_headers(apiKey, apiSecret), json=data)


def send_message(data):
    res = send_one(data)
    return [res.status_code, res]


def send_slack_message(text, channel=None):
    """슬랙 채널로 메시지 전송"""
    from django.conf import settings
    
    token = getattr(settings, 'SLACK_BOT_TOKEN', None)
    default_channel = getattr(settings, 'SLACK_CHANNEL_ID', None)
    
    if not token or not (channel or default_channel):
        return None
        
    url = "https://slack.com/api/chat.postMessage"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json; charset=utf-8"
    }
    payload = {
        "channel": channel or default_channel,
        "text": text
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        res_json = response.json()
        if not res_json.get("ok"):
            print(f"❌ Slack API Error: {res_json.get('error')}")
        return res_json
    except Exception as e:
        print(f"❌ Slack Connection Error: {e}")
        return None
