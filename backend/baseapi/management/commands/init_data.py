from typing import Any
from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model
from django.db.models import Q

from oauth2_provider.models import Application, AbstractApplication
from backend.settings import (
    APP_NAME,
    CLIENT_ID,
    CLIENT_SECRET,
    CLIENT_TYPE,
    AUTHORIZATION_GRANT_TYPE,
    DEFAULT_USER,
    DEFAULT_PASSWORD,
    DEFAULT_EMAIL
)

class Command(BaseCommand):
    help = "Create superuser , client_id and client_secret"

    @classmethod
    def create_oauth2_application(cls, user):
        exist_app = Application.objects.filter(
            Q(name=APP_NAME), Q(client_id=CLIENT_ID)
        ).exists()
        if not exist_app:
            Application.objects.create(
                client_id=CLIENT_ID,
                client_type=CLIENT_TYPE,
                authorization_grant_type=AUTHORIZATION_GRANT_TYPE,
                client_secret=CLIENT_SECRET,
                name=APP_NAME,
                algorithm=AbstractApplication.RS256_ALGORITHM,
                user=user
            )
    @classmethod
    def create_superadmin_account(cls):
        AUTH_USER_MODEL =  get_user_model()
        USERNAME_FIELD = AUTH_USER_MODEL.USERNAME_FIELD
        PASSWORD_FIELD = 'password'
        EMAIL_FIELD =  AUTH_USER_MODEL.EMAIL_FIELD
        print(USERNAME_FIELD)
        super_admin_user = AUTH_USER_MODEL.objects.filter(username=DEFAULT_USER).first()
        if not super_admin_user:
            user_data = {}
            user_data[EMAIL_FIELD] = DEFAULT_EMAIL
            user_data[USERNAME_FIELD] = DEFAULT_USER
            user_data[PASSWORD_FIELD] = DEFAULT_PASSWORD
            super_admin_user = AUTH_USER_MODEL._default_manager.db_manager('default').create_superuser(
                **user_data
            )
        return super_admin_user
    def handle(self, *args, **options):
        # self.create_oauth2_application()
        user = self.create_superadmin_account()
        application = self.create_oauth2_application(user)