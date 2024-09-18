from dotenv import load_dotenv
import django
import os

os.environ['DJANGO_SETTINGS_MODULE'] = 'backend.settings'
django.setup()
load_dotenv()

if __name__ == '__main__':
    from .interest import InterestIdentifier
    from .capability import CapabilityIdentifier
    from .reparagraph import ReParagrapher
    from .relevance import RelevanceIdentifier
    from modules.models import Argument, PersonalStatement
    import json

    with open("modules/modules/tests/example1.json") as f:
        data = json.load(f)
        example1 = Argument(
            idea=data["idea"],
            evidence=data["evidence"],
            explanation=data["explanation"],
            personal_statement=PersonalStatement(
                field_of_study=data["field_of_study"],
            ),
        )
    with open("modules/modules/tests/example2.json") as f:
        data = json.load(f)
        example2 = Argument(
            idea=data["idea"],
            evidence=data["evidence"],
            explanation=data["explanation"],
            personal_statement=PersonalStatement(
                field_of_study=data["field_of_study"],
            ),
        )
    with open("modules/modules/tests/example3.json") as f:
        data = json.load(f)
        example3 = Argument(
            idea=data["idea"],
            evidence=data["evidence"],
            explanation=data["explanation"],
            personal_statement=PersonalStatement(
                field_of_study=data["field_of_study"],
            ),
        )
    with open("modules/modules/tests/example4.json") as f:
        data = json.load(f)
        example4 = Argument(
            idea=data["idea"],
            evidence=data["evidence"],
            explanation=data["explanation"],
            personal_statement=PersonalStatement(
                field_of_study=data["field_of_study"],
            ),
        )
    with open("modules/modules/tests/example_personal_statement/example1.json") as f:
        data = json.load(f)
        example_ps = PersonalStatement(
            field_of_study=data["field_of_study"],
            essay=data["essay"],
            reparagraphed_essay=data["reparagraphed_essay"]
        )
    with open("modules/modules/tests/example_relevance/example5.json") as f:
        data = json.load(f)
        example5 = Argument(
            idea=data["idea"],
            evidence=data["evidence"],
            explanation=data["explanation"],
            personal_statement=PersonalStatement(
                field_of_study=data["field_of_study"],
            ),
        )

    #suitability_result = CapabilityIdentifier().identify_capability(example2)
    #print(suitability_result)
    #interest_result = InterestIdentifier().identify_interest(example2)
    #print(interest_result)

    # has_conclusion, reparagraph_result = ReParagrapher().reparagraph(example_ps)
    # print(has_conclusion)
    # print(reparagraph_result)

    relevance = RelevanceIdentifier().identify_relevance(example5)
    print(relevance)
