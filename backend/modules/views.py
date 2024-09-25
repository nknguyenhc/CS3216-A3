from django.http import HttpRequest, JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import PersonalStatement, Comment
from .orchestrator import Orchestrator
from .orchestrator import JardineOrchestrator
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

UserModel = get_user_model()
orchestrator = Orchestrator()
jardine_orchestrator = JardineOrchestrator()


class Essay(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request: HttpRequest):
        data = request.data

        try:
            user = UserModel.objects.get(email=data.get('email'), username=data.get('username'))
            
            # TODO: Remove
            for field, value in user.__dict__.items():
                if not field.startswith('_'):
                    print(f"{field}: {value}")

            if data.get('token') != user.token:
                return JsonResponse({'error': 'Invalid token provided for this user.'}, status=401)

        except UserModel.DoesNotExist:
            return JsonResponse({'error': 'User does not exist with the provided email and username.'}, status=404)


        essay: str = data.get('essay')
        if not essay:
            return JsonResponse({'error': 'No essay provided'}, status=400)

        field_of_study: str = data.get('field_of_study')
        if not field_of_study:
            return JsonResponse({'error': 'No field of study provided'}, status=400)

        title: str = data.get('title')
        if not title:
            return JsonResponse({'error': 'No title provided'}, status=400)

        personal_statement = PersonalStatement.objects.create(
            user=user,
            field_of_study=field_of_study,
            essay=essay,
            title=title,
            focus=False
        )

        # result = orchestrator.run(personal_statement)
        result = orchestrator.run_stub(personal_statement)
        if not result.success:
            return JsonResponse({'error': 'Failed to process essay'}, status=500)

        return JsonResponse(personal_statement.to_dict())

    def get(self, request: HttpRequest):
        try:
            email = request.GET.get('email')
            username = request.GET.get('username')
            user = UserModel.objects.get(email=email, username=username)

            if request.GET.get('token') != user.token:
                return JsonResponse({'error': 'Invalid token provided for this user.'}, status=401)

        except UserModel.DoesNotExist:
            return JsonResponse({'error': 'User does not exist with the provided email and username.'}, status=500)

        personal_statements = PersonalStatement.objects.filter(focus=False, user=user)
        response_data = [
            {
                'id': ps.id,
                'title': ps.title,
                'field_of_study': ps.field_of_study,
                'created_at': ps.created_at,
                'number_of_comment': ps.number_of_comment()
            }
            for ps in personal_statements
        ]
        return JsonResponse(response_data, safe=False, status=200)


class JardineEssay(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request: HttpRequest):
        data = request.data

        try:
            user = UserModel.objects.get(email=data.get('email'), username=data.get('username'))

            if data.get('token') != user.token:
                return JsonResponse({'error': 'Invalid token provided for this user.'}, status=401)

        except UserModel.DoesNotExist:
            return JsonResponse({'error': 'User does not exist with the provided email and username.'}, status=500)

        essay: str = data.get('essay')
        if not essay:
            return JsonResponse({'error': 'No essay provided'}, status=400)

        field_of_study: str = data.get('field_of_study')
        if not field_of_study:
            return JsonResponse({'error': 'No field of study provided'}, status=400)

        title: str = data.get('title')
        if not title:
            return JsonResponse({'error': 'No title provided'}, status=400)

        personal_statement = PersonalStatement.objects.create(
            user=user,
            field_of_study=field_of_study,
            essay=essay,
            title=title,
            focus=True
        )

        # Change to run() instead of run_stub()
        result = jardine_orchestrator.run_stub(personal_statement)
        if not result.success:
            return JsonResponse({'error': 'Failed to process essay'}, status=500)
        #print(personal_statement.to_dict())
        return JsonResponse(personal_statement.to_dict())

    def get(self, request: HttpRequest):
        try:
            email = request.GET.get('email')
            username = request.GET.get('username')
            user = UserModel.objects.get(email=email, username=username)

            if request.GET.get('token') != user.token:
                return JsonResponse({'error': 'Invalid token provided for this user.'}, status=401)

        except UserModel.DoesNotExist:
            return JsonResponse({'error': 'User does not exist with the provided email and username.'}, status=500)

        personal_statements = PersonalStatement.objects.filter(focus=True, user=user)
        response_data = [
            {
                'id': ps.id,
                'title': ps.title,
                'field_of_study': ps.field_of_study,
                'created_at': ps.created_at,
                'number_of_comment': ps.number_of_comment()
            }
            for ps in personal_statements
        ]
        return JsonResponse(response_data, safe=False, status=200)


class GetFeedback(APIView):
    authentication_classes = [TokenAuthentication]
    def get(self, request: HttpRequest):
        data = request.GET
        print(data)    
        try:
            user = UserModel.objects.get(email=data.get('email'), username=data.get('username'))

            if data.get('token') != user.token:
                return JsonResponse({'error': 'Invalid token provided for this user.'}, status=401)

        except UserModel.DoesNotExist:
            return JsonResponse({'error': 'User does not exist with the provided email and username.'}, status=500)

        ps_id = request.GET.get('id')
        if not ps_id:
            return JsonResponse({'error': 'No id parameter provided'}, status=400)

        try:
            personal_statement = PersonalStatement.objects.get(id=ps_id)
        except PersonalStatement.DoesNotExist:
            raise JsonResponse(
                {'error': 'Not found personal statement'}, status=404)

        if personal_statement.user != user:
            return JsonResponse({'error': 'Unauthorized to view this personal statement'}, status=403)

        return JsonResponse(personal_statement.to_dict())
