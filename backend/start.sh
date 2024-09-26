#!/bin/bash

python manage.py migrate
gunicorn backend.wsgi:application --bind 0.0.0.0:80 --workers 4 --timeout 300 --log-level=debug
