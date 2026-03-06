import configparser
import os

libdir = os.path.dirname(__file__)

config = configparser.ConfigParser()
config.read(libdir + '/config.ini')
apiKey = config['AUTH']['api_key']
apiSecret = config['AUTH']['api_secret']
callId = config['AUTH']['call_id']
protocol = config['SERVER']['protocol']
domain = config['SERVER']['domain']
prefix = config['SERVER']['prefix'] and config['SERVER']['prefix'] or ''
