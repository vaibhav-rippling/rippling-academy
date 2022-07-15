from django.http import HttpResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .utilities import *
from .dao import *

new_registration_params = ["first_name", "last_name", "username", "password", "email"]
login_params = ["username", "password"]
logout_params = ["token"]


@csrf_exempt
@require_POST
def register(request):
    if validate_new_registration(new_registration_params, request.POST):
        if check_username_and_email_unique(request.POST["username"], request.POST["email"]):
            new_user = create_new_user(request.POST)
            new_user.save()
            return HttpResponse(status=200)
        else:
            return HttpResponseBadRequest("Username/Email already taken")
    else:
        return HttpResponseBadRequest("Missing/Invalid parameters specified")


@csrf_exempt
@require_POST
def login(request):
    if not check_params(login_params, request.POST):
        return HttpResponseBadRequest("Missing/Invalid parameters specified")
    elif not check_username_present(request.POST):
        return HttpResponseBadRequest("Username doesn't exist")
    elif not validate_login(request.POST):
        return HttpResponseBadRequest("Incorrect password")
    else:
        new_token = create_new_token(request.POST)
        new_token.save()
        return HttpResponse(new_token.token_id)


@csrf_exempt
@require_POST
def logout(request):
    if not check_params(logout_params, request.POST):
        return HttpResponseBadRequest("Token parameter missing in request")
    elif not is_token_valid(request.POST["token"]):
        return HttpResponseBadRequest("Invalid token")
    elif is_token_expired(request.POST["token"]):
        return HttpResponseBadRequest("Token expired")
    else:
        token = get_token_by_token_id(request.POST["token"])
        token.delete()
        return HttpResponse(status=200)
