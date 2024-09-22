from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None, username=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        if not username:
            raise ValueError('A username is required.')

        email = self.normalize_email(email)
        user = self.model(email=email, username=username)
        user.set_password(password)
        user.save()
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
