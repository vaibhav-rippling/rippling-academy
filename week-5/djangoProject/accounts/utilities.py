from uuid import uuid4
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.contrib.auth.hashers import make_password
from .dao import *


def create_new_user(request):
    user = User()
    user.first_name = request["first_name"]
    user.last_name = request["last_name"]
    user.username = request["username"]
    user.password = make_password(request["password"])
    user.email = request["email"]
    return user


def validate_new_registration(params, request_params):
    if not check_params(params, request_params):
        return False
    try:
        validate_email(request_params["email"])
    except ValidationError:
        return False
    else:
        return True


def check_params(params, request_params):
    for param in params:
        if not request_params[param]:
            return False
    return True


def create_new_token(request_params):
    token = Token()
    token.token_id = uuid4()
    token.user = get_user_with_username(request_params["username"])
    return token
