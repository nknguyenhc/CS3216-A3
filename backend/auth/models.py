from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None, username=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        if not username:
            raise ValueError('A username is required.')

        email = self.normalize_email(email)
        user = self.model(
            email=email,
            username=username,
            free_upload_count=3,
        )
        user.set_password(password)
        user.save()

        # Create a token and assign it to the user
        token = Token.objects.create(user=user)
        user.token = token.key  # Set the token key
        user.save(update_fields=['token'])  # Update the user record with the token

        return user



    def create_superuser(self, email, password=None, username=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        if not username:
            raise ValueError('A username is required.')

        user = self.create_user(email, password, username)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50, default='default_username')
    free_upload_count = models.PositiveIntegerField(default=3)
    token = models.CharField(max_length=100, blank=True, null=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = AppUserManager()

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='appuser_set',
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='appuser_set',
        blank=True,
    )

    def __str__(self):
        return self.username

class FreeUploadCount(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='free_upload_counts', null=True)
    free_upload_count = models.IntegerField(default=0)
    # first_free_upload = user.freeuploadcount_set.first() to see number of free upload