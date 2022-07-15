from datetime import datetime

from .models import User, Token
from mongoengine.queryset.visitor import Q
from django.contrib.auth.hashers import check_password


def check_username_and_email_unique(username, email):
    query = User.objects(Q(username=username) | Q(email=email))
    return len(query) == 0


def check_username_present(request_params):
    query = User.objects(username=request_params["username"])
    return len(query) > 0


def validate_login(request_params):
    query = User.objects(username=request_params["username"])
    encrypted_password = query[0].password
    return check_password(request_params["password"], encrypted_password)


def get_user_with_username(username):
    return User.objects(username=username)[0]


def is_token_valid(token):
    query = Token.objects(token_id=token)
    return len(query) > 0


def is_token_expired(token):
    token = Token.objects(token_id=token)[0]
    time_now = datetime.utcnow()
    duration = time_now - token.created_at
    duration_in_s = duration.total_seconds()
    minutes = divmod(duration_in_s, 60)[0]
    return minutes >= 30


def get_token_by_token_id(token):
    token = Token.objects(token_id=token)[0]
    return token
