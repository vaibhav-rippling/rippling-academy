import random
import re

from django.http import HttpResponseBadRequest, HttpResponse
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_GET
from django.core.validators import URLValidator
from string import ascii_letters, digits

from rest_framework.decorators import api_view
from rest_framework.response import Response

from accounts.utilities import *
from .models import *
from .dao import *

add_url_params = ["original_url", "token"]
delete_url_params = ["short_url_id", "token"]
list_url_params = ["token"]
short_url_domain = ascii_letters + digits + "_" + "-"


@csrf_exempt
@require_POST
def add_url(request):
    if not check_params(add_url_params, request.POST):
        return HttpResponseBadRequest("Missing/Invalid parameters specified")
    elif not validate_new_url_details(request.POST):
        return HttpResponseBadRequest("Invalid Url specified")
    elif not validate_short_url_details(request.POST):
        return HttpResponseBadRequest("Invalid Short Url specified")
    elif not is_token_valid(request.POST["token"]):
        return HttpResponseBadRequest("Invalid token")
    elif is_token_expired(request.POST["token"]):
        return HttpResponseBadRequest("Token expired")
    else:
        short_url = create_new_short_url(request.POST)
        short_url.save()
        return HttpResponse(short_url.short_url_id)


@csrf_exempt
@require_POST
def delete_url(request):
    if not check_params(delete_url_params, request.POST):
        return HttpResponseBadRequest("Missing/Invalid parameters specified")
    elif short_url_id_available(request.POST["short_url_id"]):
        return HttpResponseBadRequest("Short Url does not exist")
    elif not is_token_valid(request.POST["token"]):
        return HttpResponseBadRequest("Invalid token")
    elif is_token_expired(request.POST["token"]):
        return HttpResponseBadRequest("Token expired")
    elif not check_user_has_delete_permission(request.POST):
        return HttpResponseBadRequest("You do not have delete permissions")
    else:
        short_url = get_short_url_by_id(request.POST["short_url_id"])
        short_url.delete()
        return HttpResponse(status=200)


@csrf_exempt
@require_POST
@api_view(('POST',))
def list_url(request):
    if not check_params(list_url_params, request.POST):
        return HttpResponseBadRequest("Missing/Invalid parameters specified")
    elif not is_token_valid(request.POST["token"]):
        return HttpResponseBadRequest("Invalid token")
    elif is_token_expired(request.POST["token"]):
        return HttpResponseBadRequest("Token expired")
    else:
        short_url_list = get_short_urls_by_token(request.POST["token"])
        serializer = ShortUrlSerializer(short_url_list, many=True)
        return Response(serializer.data)


@csrf_exempt
@require_GET
def process_url(request, short_url_id):
    if short_url_id_available(short_url_id):
        return HttpResponseBadRequest("Short Url does not exist")
    else:
        short_url = get_short_url_by_id(short_url_id)
        update_hits_and_timestamp(short_url_id, short_url.number_of_hits+1, datetime.utcnow())
        return redirect(short_url.original_url)


def validate_new_url_details(request_params):
    validate_url = URLValidator()
    try:
        validate_url(request_params["original_url"])
    except ValidationError:
        return False
    else:
        return True


def validate_short_url_details(request_params):
    if "short_url_id" not in request_params:
        return True
    else:
        if len(request_params["short_url_id"]) > 40:
            return False
        pattern = re.compile("^[A-Za-z0-9_-]+$")
        return pattern.match(request_params["short_url_id"]) is not None


def generate_new_short_url_id():
    while True:
        new_short_url_id = ''
        for i in range(10):
            new_short_url_id += random.choice(short_url_domain)
        if short_url_id_available(new_short_url_id):
            return new_short_url_id


def create_new_short_url(request_params):
    new_short_url = ShortUrl()
    new_short_url.original_url = request_params["original_url"]
    if "short_url_id" in request_params:
        new_short_url.short_url_id = request_params["short_url_id"]
    else:
        new_short_url.short_url_id = generate_new_short_url_id()
    if "password" in request_params:
        new_short_url.password = make_password(request_params["password"])
    else:
        new_short_url.password = make_password('')
    new_short_url.user = get_user_with_token(request_params["token"])
    return new_short_url


def check_user_has_delete_permission(request_params):
    token_user = get_user_with_token(request_params["token"])
    short_url_owner = get_short_url_owner(request_params["short_url_id"])
    return token_user == short_url_owner


def get_short_urls_by_token(token):
    user = get_user_with_token(token)
    return get_short_urls_by_user(user)
