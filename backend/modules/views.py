from django.http import HttpRequest, JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import PersonalStatement, Comment
from .orchestrator import Orchestrator
from .orchestrator import JardineOrchestrator

orchestrator = Orchestrator()
jardine_orchestrator = JardineOrchestrator()


class Essay(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request: HttpRequest):        
        data = request.data
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
            user=request.user,
            field_of_study=field_of_study,
            essay=essay,
            title=title,
            focus=False
        )

        # result = orchestrator.run(personal_statement)
        result = orchestrator.run_stub(personal_statement)
        if not result.success:
            return JsonResponse({'error': 'Failed to process essay'}, status=500)

        return JsonResponse(result.to_dict())

    def get(self, request: HttpRequest):
        personal_statements = PersonalStatement.objects.filter(focus=False)
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
    permission_classes = [IsAuthenticated]

    def post(self, request: HttpRequest):
        data = request.data
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
            user=request.user,
            field_of_study=field_of_study,
            essay=essay,
            title=title,
            focus=True
        )

        # Change to run() instead of run_stub()
        result = jardine_orchestrator.run_stub(personal_statement)
        if not result.success:
            return JsonResponse({'error': 'Failed to process essay'}, status=500)

        return JsonResponse(result.to_dict())

    def get(self, request: HttpRequest):
        personal_statements = PersonalStatement.objects.filter(focus=True)
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
    permission_classes = [IsAuthenticated]
    
    def get(self, request: HttpRequest):
        ps_id = request.GET.get('id')
        if not ps_id:
            return JsonResponse({'error': 'No id parameter provided'}, status=400)

        try:
            personal_statement = PersonalStatement.objects.get(id=ps_id)
        except PersonalStatement.DoesNotExist:
            raise JsonResponse(
                {'error': 'Not found personal statement'}, status=404)

        return JsonResponse(personal_statement.to_dict())
