import logging
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
import stripe
from django.shortcuts import redirect

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

# Your Stripe API key (TODO: REMOVE THIS)
stripe.api_key = ''

from django.urls import path
from django.http import JsonResponse

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
