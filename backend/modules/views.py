from django.shortcuts import render, redirect
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import stripe
# This is your test secret API key.
stripe.api_key = settings.STRIPE_SECRET_KEY

class StripeCheckoutView(APIView):
    def post(self, request):
        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        'price': 'price_1PzWnc09qdif5frtbPxIEzWS ',
                        'quantity': 1,
                    },
                ],
                payment_method_types=['card',],
                mode='payment',
                success_url= settings.SITE_URL + '?success=true',
                cancel_url= settings.SITE_URL + '?canceled=true',
            )
            return redirect(checkout_session.url, code=303)
        
        except:
            return Response (
                {'error': 'Something went wrong when creating Stripe checkout session'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )