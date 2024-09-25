from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model, authenticate
from rest_framework.authtoken.models import Token

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user_obj = UserModel.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            username=validated_data['username'],
        )
        Token.objects.create(user=user_obj)
        return user_obj

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        token = Token.objects.get(user=instance)
        representation['token'] = token.key
        return representation


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        username = attrs.get('username')
        password = attrs.get('password')

        user = authenticate(username=username, email=email, password=password)

        if not user:
            raise ValidationError('Invalid username, email, or password')

        token, created = Token.objects.get_or_create(user=user)
        return {
            'token': token.key,
            'user': {
                'email': user.email,
                'username': user.username
            }
        }


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('email', 'username')
