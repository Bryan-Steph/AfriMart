from random import randint
from django.utils.timezone import now

def generate_email_comfirmation_code():
    code=f"{randint(100000, 900000)}--{now()}"
    return code