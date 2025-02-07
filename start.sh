#!/bin/bash
chmod +x start.sh
export FLASK_APP=app.py  # O el nombre de tu archivo principal
gunicorn app:app
