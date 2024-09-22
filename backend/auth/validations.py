from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

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

def validate_password(password):
    password = password.strip()
    if not password:
        raise ValidationError('A password is needed.')
    
    if len(password) < 8:
        raise ValidationError('Password must be at least 8 characters long.')

    return password