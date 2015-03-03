import os
import sys

# Place this project on the system path
path = r'/var/www/mpd/mpd'
if path not in sys.path:
    sys.path.append(path)

# Specify the settings file.
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'

os.chdir( path )

import django.core.wsgi
application = django.core.wsgi.get_wsgi_application()
