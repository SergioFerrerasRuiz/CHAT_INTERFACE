#!/bin/bash
source entorno/Scripts/activate
exec gunicorn -b :$PORT app:app

