from django.http import HttpRequest, JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import PersonalStatement, Comment
from ..auth.models import FreeUploadCount
from .orchestrator import Orchestrator
from .orchestrator import JardineOrchestrator
from django.contrib.auth import get_user_model

UserModel = get_user_model()
orchestrator = Orchestrator()
jardine_orchestrator = JardineOrchestrator()


class Essay(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request: HttpRequest):
        data = request.data

        essay = data.get('essay')
        field_of_study = data.get('field_of_study')
        title = data.get('title')

        if not essay:
            return JsonResponse({'error': 'No essay provided'}, status=400)
        if not field_of_study:
            return JsonResponse({'error': 'No field of study provided'}, status=400)
        if not title:
            return JsonResponse({'error': 'No title provided'}, status=400)

        # Check if the user has sufficient free upload count
        free_upload_count_instance = FreeUploadCount.objects.filter(
            user=request.user).first()

        if not free_upload_count_instance:
            return JsonResponse({'error': 'User has no free uploads associated'}, status=400)

        if free_upload_count_instance.free_upload_count <= 0:
            return JsonResponse({'error': 'Insufficient funds'}, status=400)

        # Decrement the free upload count
        free_upload_count_instance.free_upload_count -= 1
        free_upload_count_instance.save()

        personal_statement = PersonalStatement.objects.create(
            user=request.user,
            field_of_study=field_of_study,
            essay=essay,
            title=title,
            focus=False
        )

        result = orchestrator.run(personal_statement)
        if not result.success:
            return JsonResponse({'error': 'Failed to process essay'}, status=500)

        return JsonResponse(personal_statement.to_dict())

    def get(self, request: HttpRequest):
        personal_statements = PersonalStatement.objects.filter(
            focus=False, user=request.user)
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
    permission_classes = [IsAuthenticated]

    def post(self, request: HttpRequest):
        data = request.data

        essay = data.get('essay')
        field_of_study = data.get('field_of_study')
        title = data.get('title')

        if not essay:
            return JsonResponse({'error': 'No essay provided'}, status=400)
        if not field_of_study:
            return JsonResponse({'error': 'No field of study provided'}, status=400)
        if not title:
            return JsonResponse({'error': 'No title provided'}, status=400)
        
        # Check if the user has sufficient free upload count
        free_upload_count_instance = FreeUploadCount.objects.filter(
            user=request.user).first()

        if not free_upload_count_instance:
            return JsonResponse({'error': 'User has no free uploads associated'}, status=400)

        if free_upload_count_instance.free_upload_count <= 0:
            return JsonResponse({'error': 'Insufficient funds'}, status=400)

        # Decrement the free upload count
        free_upload_count_instance.free_upload_count -= 1
        free_upload_count_instance.save()

        personal_statement = PersonalStatement.objects.create(
            user=request.user,
            field_of_study=field_of_study,
            essay=essay,
            title=title,
            focus=True
        )

        result = jardine_orchestrator.run(personal_statement)
        if not result.success:
            return JsonResponse({'error': 'Failed to process essay'}, status=500)

        return JsonResponse(personal_statement.to_dict())

    def get(self, request: HttpRequest):
        personal_statements = PersonalStatement.objects.filter(
            focus=True, user=request.user)
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
    permission_classes = [IsAuthenticated]

    def get(self, request: HttpRequest):
        ps_id = request.GET.get('id')
        if not ps_id:
            return JsonResponse({'error': 'No id parameter provided'}, status=400)

        try:
            personal_statement = PersonalStatement.objects.get(
                id=ps_id, user=request.user)
        except PersonalStatement.DoesNotExist:
            return JsonResponse({'error': 'Personal statement not found or unauthorized'}, status=404)

        return JsonResponse(personal_statement.to_dict())
