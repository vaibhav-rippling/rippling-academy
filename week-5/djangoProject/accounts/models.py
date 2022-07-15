from datetime import datetime
from mongoengine import *


class User(Document):
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    username = StringField(required=True, unique=True)
    password = StringField(required=True)
    email = EmailField(required=True, unique=True)


class Token(Document):
    token_id = UUIDField(required=True, unique=True)
    user = ReferenceField('User', reverse_delete_rule=CASCADE, required=True)
    created_at = DateTimeField(default=datetime.utcnow)
