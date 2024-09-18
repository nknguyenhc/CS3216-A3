from django.http import JsonResponse
from django.urls import path
import logging
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
import stripe
from django.shortcuts import redirect
from django.contrib.auth import get_user_model, login, logout

from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from .validations import custom_validation, validate_email, validate_password

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

# Your Stripe API key (TODO: REMOVE THIS)
stripe.api_key = 'sk_test_51Pz9EL09qdif5frt3zey8048lZqdn0eQvneaAvwIIGMJ2L1A4cEy3G1fDidul7rqTUPcWLncI3NuHAcJmF1CHZdF004AoVkPGT'


class StripeCheckoutView(APIView):
    PRICE_IDS = {
        'basic': 'price_1PzgYw09qdif5frtyShpIhOb',
        'plus': 'price_1PzgYF09qdif5frthtss0TgS',
        'pro': 'price_1PzgYR09qdif5frtVBee9MYg'
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
                success_url='http://localhost:8000/success',
                cancel_url='http://localhost:8000/unsuccess',
            )
            return redirect(checkout_session.url, code=303)

        except Exception as e:
            logger.error(f"Stripe Checkout Error: {str(e)}", exc_info=True)
            return JsonResponse({'error': str(e)}, status=500)


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
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
