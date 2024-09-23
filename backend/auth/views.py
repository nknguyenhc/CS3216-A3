from django.http import JsonResponse
import logging
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
import stripe
from django.shortcuts import redirect
from django.contrib.auth import login, logout, authenticate
import os
from .serializers import UserRegisterSerializer, UserSerializer
from .validations import validate_email, validate_username, validate_password
from django.core.exceptions import ValidationError
from django.conf import settings


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

stripe.api_key = os.getenv("STRIPE_API_KEY")


class StripeCheckoutView(APIView):
    PRICE_IDS = {
        'oxbridge': 'price_1Q0vbs09qdif5frtIQGhV2wZ',
        'jardine': 'price_1Q0vcc09qdif5frtwu0u9UWg'
    }

    def post(self, request, plan_type):
        try:
            price_id = self.PRICE_IDS.get(plan_type)

            if price_id is None:
                return JsonResponse({'error': 'Invalid plan type'}, status=400)

            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        'price': price_id,
                        'quantity': 1,
                    },
                ],
                mode='payment',
                success_url=f'{settings.SITE_URL}/success',
                cancel_url=f'{settings.SITE_URL}/unsuccess',
            )
            return redirect(checkout_session.url, code=303)

        except Exception as e:
            logger.error(f"Stripe Checkout Error: {str(e)}", exc_info=True)
            return JsonResponse({'error': str(e)}, status=500)


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data

        # Validate email
        try:
            email = validate_email(data.get('email', ''))
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Validate username
        try:
            username = validate_username(data.get('username', ''))
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Validate password
        try:
            password = validate_password(data.get('password', ''))
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Prepare clean data for the serializer
        clean_data = {
            'email': email,
            'username': username,
            'password': password,
        }

        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()  # Use save instead of create
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response({"error": "Registration failed"}, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data

        email = data.get('email', '').strip()
        username = data.get('username', '').strip()
        password = data.get('password', '').strip()

        # Validate email
        try:
            validate_email(email)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Validate username
        try:
            validate_username(username)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Validate password
        try:
            validate_password(password)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate user
        user = authenticate(request, email=email,
                            username=username, password=password)

        # Check if user exists
        if user is None:
            # Check if the email or username is valid
            if not UserModel.objects.filter(email=email).exists():
                return Response({"error": "Email does not exist."}, status=status.HTTP_400_BAD_REQUEST)
            elif not UserModel.objects.filter(username=username).exists():
                return Response({"error": "Username does not exist."}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"error": "Invalid password."}, status=status.HTTP_401_UNAUTHORIZED)

        # Log the user in
        login(request, user)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
