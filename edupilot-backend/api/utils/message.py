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
