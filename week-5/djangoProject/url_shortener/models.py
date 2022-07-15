from mongoengine import *
from accounts.models import *
from rest_framework_mongoengine import serializers


class ShortUrl(Document):
    original_url = URLField(required=True)
    short_url_id = StringField(required=True, unique=True)
    number_of_hits = IntField(default=0)
    last_hit_timestamp = DateTimeField()
    password = StringField(default='')
    user = ReferenceField('User', reverse_delete_rule=CASCADE, required=True)


class ShortUrlSerializer(serializers.DocumentSerializer):
    class Meta:
        model = ShortUrl
        fields = ('original_url', 'short_url_id', 'number_of_hits', 'last_hit_timestamp')
