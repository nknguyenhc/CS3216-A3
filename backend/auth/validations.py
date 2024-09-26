from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

UserModel = get_user_model()


def validate_email(email):
    email = email.strip()
    if not email:
        raise ValidationError('An email is needed.')

    if UserModel.objects.filter(email=email).exists():
        raise ValidationError('Email is already in use, choose another one.')

    return email


def validate_username(username):
    username = username.strip()
    if not username:
        raise ValidationError('A username is needed.')

    if UserModel.objects.filter(username=username).exists():
        raise ValidationError('Username is already taken, choose another one.')

    return username


def validate_login_credentials(email, username, password):
    email = email.strip()
    username = username.strip()
    password = password.strip()

    if not email:
        raise ValidationError('An email is needed.')

    if not username:
        raise ValidationError('A username is needed.')

    if not password:
        raise ValidationError('A password is needed.')

    user = authenticate(username=username, email=email, password=password)
    
    if user is None:
        raise ValidationError('Invalid email, username, or password.')

    return email, username


def validate_password(password):
    password = password.strip()
    if not password:
        raise ValidationError('A password is needed.')

    if len(password) < 8:
        raise ValidationError('Password must be at least 8 characters long.')

    return password
