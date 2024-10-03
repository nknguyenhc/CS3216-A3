from django.http import JsonResponse, HttpRequest
import logging
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
import stripe
from django.shortcuts import redirect
from django.contrib.auth import login, logout, authenticate
import os
from .serializers import UserRegisterSerializer, UserSerializer
from .validations import validate_login_credentials
from django.core.exceptions import ValidationError
from django.conf import settings
from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth import get_user_model
from .models import FreeUploadCount

User = get_user_model()

logger = logging.getLogger(__name__)

stripe.api_key = os.getenv("STRIPE_API_KEY")

class StripeCheckoutView(APIView):
    PRICE_IDS = {
        'oxbridge': 'price_1Q0vbs09qdif5frtIQGhV2wZ',
        'jardine': 'price_1Q0vcc09qdif5frtwu0u9UWg'
    }

    def post(self, request: HttpRequest, plan_type):
        email = request.data.get('email')
        username = request.data.get('username')
            
        try:
            
            user = User.objects.get(email=email, username=username)

            free_upload_count_instance = FreeUploadCount.objects.filter(user=user).first()

            price_id = self.PRICE_IDS.get(plan_type)
            if price_id is None:
                return JsonResponse({'error': 'Invalid plan type'}, status=400)
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {'price': price_id, 'quantity': 1},
                ],
                mode='payment',
                success_url=f'{settings.SITE_URL}/success',
                cancel_url=f'{settings.SITE_URL}/unsuccess',
            )

            free_upload_count_instance.free_upload_count += 1
            free_upload_count_instance.save() 

            return redirect(checkout_session.url, code=303)
        except Exception as e:
            logger.error(f"Stripe Checkout Error: {str(e)}", exc_info=True)
            return JsonResponse({'error': str(e)}, status=500)

class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            FreeUploadCount.objects.create(user=user, free_upload_count=3)
            response = Response({
                'token': token.key,
                'user': {
                    'email': user.email,
                    'username': user.username,
                    'free_upload_count': user.freeuploadcount_set.first().free_upload_count if user.freeuploadcount_set.exists() else 0
                }
            }, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = []  # Remove SessionAuthentication, keep empty for token-based login

    def post(self, request):
        data = request.data
        email = data.get('email', '').strip()
        username = data.get('username', '').strip()
        password = data.get('password', '').strip()
        try:
            validate_login_credentials(email, username, password)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(request, email=email, username=username, password=password)
        if user is None:
            return Response({"error": "User does not exist or credentials are incorrect."}, status=status.HTTP_400_BAD_REQUEST)
        login(request, user)
        Token.objects.filter(user=user).delete()
        token = Token.objects.create(user=user)
        serializer = UserSerializer(user)
        return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_200_OK)

class UserLogout(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        if request.auth:
            request.auth.delete()
        logout(request)
        return Response(status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)

class GoogleLogin(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        token = request.data.get('token')
        
        if not token:
            return Response({'error': 'Token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            try:
                idinfo = id_token.verify_oauth2_token(token, requests.Request(), settings.GOOGLE_CLIENT_ID)
            except ValueError as e:
                logger.error(f"Token verification error: {str(e)}")
                return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                return Response({'error': 'Invalid token issuer'}, status=status.HTTP_403_FORBIDDEN)
            email = idinfo['email']
            user, created = User.objects.get_or_create(email=email, defaults={'username': email})
            if created:
                user.set_unusable_password()
                user.save()
                FreeUploadCount.objects.create(user=user, free_upload_count=3)

            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'email': user.email,
                'username': user.username,
            })

        except ValueError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
