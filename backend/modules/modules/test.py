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
    from .idea_extractor import IdeaExtractor
    from .community import ContributionToCommunityIdentifier
    from .relevance import RelevanceIdentifier
    from .aspiration import AspirationIdentifier
    from .leadership import LeadershipIdentifier
    from .specificity import SpecificityIdentifier
    from modules.models import Argument, PersonalStatement
    import json
    '''
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

    with open("modules/modules/tests/example_personal_statement/example1.json") as f:
        data = json.load(f)
        example_ps = PersonalStatement(
            field_of_study=data["field_of_study"],
            essay=data["essay"],
            reparagraphed_essay=data["reparagraphed_essay"]
        )

    extractor_result = IdeaExtractor().extract(example_ps)
    print(extractor_result)
    '''
    
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

    specificity_result = SpecificityIdentifier().identify_specificity(example3)
    print(specificity_result)

    # suitability_result = CapabilityIdentifier().identify_capability(example2)
    # print(suitability_result)

    # interest_result = InterestIdentifier().identify_interest(example2)
    # print(interest_result)

    # has_conclusion, reparagraph_result = ReParagrapher().reparagraph(example_ps)
    # print(has_conclusion)
    # print(reparagraph_result)

    ### JARDINE ###
    ### Do not run the code below, only I have access to the data ###

    '''
    with open("modules/data/example1.json", encoding="utf-8") as f:
        data = json.load(f)
        example1 = Argument(
            idea=data["idea"],
            evidence=data["evidence"],
            explanation=data["explanation"],
            personal_statement=PersonalStatement(
                field_of_study=data["field_of_study"],
            ),
        )

    with open("modules/data/example2.json") as f:
        data = json.load(f)
        example2 = Argument(
            idea=data["idea"],
            evidence=data["evidence"],
            explanation=data["explanation"],
            personal_statement=PersonalStatement(
                field_of_study=data["field_of_study"],
            ),
        )

    with open("modules/data/example3.json") as f:
        data = json.load(f)
        example3 = Argument(
            idea=data["idea"],
            evidence=data["evidence"],
            explanation=data["explanation"],
            personal_statement=PersonalStatement(
                field_of_study=data["field_of_study"],
            ),
        )

    with open("modules/data/example4.json") as f:
        data = json.load(f)
        example4 = Argument(
            idea=data["idea"],
            evidence=data["evidence"],
            explanation=data["explanation"],
            personal_statement=PersonalStatement(
                field_of_study=data["field_of_study"],
            ),
        )

    with open("modules/data/example5.json") as f:
        data = json.load(f)
        example4 = Argument(
            idea=data["idea"],
            evidence=data["evidence"],
            explanation=data["explanation"],
            personal_statement=PersonalStatement(
                field_of_study=data["field_of_study"],
            ),
        )

    # community_result = ContributionToCommunityIdentifier(
    # ).identify_contribution_to_community(example1)
    # print(community_result)

    # aspiration_result = AspirationIdentifier().identify_aspiration(example2)
    # print(aspiration_result)

    leadership_result = LeadershipIdentifier().identify_leadership(example3)
    print(leadership_result)
    '''