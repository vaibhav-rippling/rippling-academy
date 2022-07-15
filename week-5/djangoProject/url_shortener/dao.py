from .models import ShortUrl
from accounts.models import User, Token


def short_url_id_available(short_url_id):
    query = ShortUrl.objects(short_url_id=short_url_id)
    return len(query) == 0


def get_user_with_token(token):
    query = Token.objects(token_id=token)
    return query[0].user


def get_short_url_owner(short_url_id):
    query = ShortUrl.objects(short_url_id=short_url_id)
    return query[0].user


def get_short_url_by_id(short_url_id):
    query = ShortUrl.objects(short_url_id=short_url_id)
    return query[0]


def get_short_urls_by_user(user):
    query = ShortUrl.objects(user=user)
    return query


def update_hits_and_timestamp(short_url_id, hits, timestamp):
    ShortUrl.objects(short_url_id=short_url_id).update(
        set__number_of_hits=hits,
        set__last_hit_timestamp=timestamp
    )
