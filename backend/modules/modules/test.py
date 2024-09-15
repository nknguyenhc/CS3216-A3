from dotenv import load_dotenv
import django
import os

os.environ['DJANGO_SETTINGS_MODULE'] = 'backend.settings'
django.setup()
load_dotenv()

if __name__ == '__main__':
    from .suitability import SuitabilityIdentifier
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

    result = SuitabilityIdentifier().identify_suitability(example4)
    print(result)
