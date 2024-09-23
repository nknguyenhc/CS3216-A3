from django.http import HttpRequest, JsonResponse
from rest_framework.views import APIView
from .models import PersonalStatement, Comment
from .orchestrator import Orchestrator
from .orchestrator import JardineOrchestrator

orchestrator = Orchestrator()
jardine_orchestrator = JardineOrchestrator()

class Essay(APIView):
    def post(self, request: HttpRequest):
        data = request.data
        essay: str = data.get('essay')
        if not essay:
            return JsonResponse({'error': 'No essay provided'}, status=400)

        field_of_study: str = data.get('field_of_study')
        if not field_of_study:
            return JsonResponse({'error': 'No field of study provided'}, status=400)

        personal_statement = PersonalStatement.objects.create(
            field_of_study=field_of_study,
            essay=essay
        )
        # result = orchestrator.run(personal_statement)
        result = orchestrator.run_stub(personal_statement)
        if not result.success:
            return JsonResponse({'error': 'Failed to process essay'}, status=500)

        return JsonResponse(result.to_dict())

class JardineEssay(APIView):
    def post(self, request: HttpRequest):
        data = request.data
        essay: str = data.get('essay')
        if not essay:
            return JsonResponse({'error': 'No essay provided'}, status=400)
        
        field_of_study: str = data.get('field_of_study')
        if not field_of_study:
            return JsonResponse({'error': 'No field of study provided'}, status=400)

        personal_statement = PersonalStatement.objects.create(
            field_of_study=field_of_study,
            essay=essay
        )
        #change to run() instead of run_stub()
        result = jardine_orchestrator.run_stub(personal_statement)
        if not result.success:
            return JsonResponse({'error': 'Failed to process essay'}, status=500)

        return JsonResponse(result.to_dict())
