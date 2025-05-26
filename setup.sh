#!bin/bash

# This script sets up the environment for the AfriMart project.
sudo apt install python3.12-venv

#creating a virtual environment
python3 -m venv afrismart_project/virtualenv

#activating the virtual environment
source afrismart_project/virtualenv/bin/activate

#installing the required packages
pip install -r requirements.txt

#migrations
python3 afrismart_project/manage.py makemigrations
python3 afrismart_project/manage.p migrate

#running the Django server
python3 afrismart_project/manage.py runserver