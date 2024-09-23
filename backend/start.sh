#!/bin/bash

python manage.py migrate
gunicorn --bind 0.0.0.0:80 backend.wsgi:application
