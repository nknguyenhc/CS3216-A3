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
    from .comment import CommentCrafter
    from .general_comments import GeneralCommentCrafter
    from modules.models import Argument,Specificity, Relevance, Interest, Capability, ArgumentEvaluations, PersonalStatement
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
    '''

    with open("modules/modules/tests/comments/argument_evaluator.json") as f:
        data = json.load(f)

        argument = Argument(
            idea=data["argument"]["idea"],
            evidence=data["argument"]["evidence"],
            explanation=data["argument"]["explanation"],
            personal_statement=PersonalStatement(
                field_of_study=data["field_of_study"],
            ),
        )

        relevance = Relevance(
            is_relevant=data["is_relevant"],
            reason=data["is_relevant_reason"],
            argument=argument
        )

        specificity = Specificity(
            is_specific=data["is_specific"],
            reason=data["is_specific_reason"],
            argument=argument
        )

        interest = Interest(
            has_interest=data["has_interest"],
            has_interest_reason=data["has_interest_reason"],
            argument=argument
        )

        capability = Capability(
            is_capable=data["is_capable"],
            is_capable_reason=data["is_capable_reason"],
            argument=argument
        )  

        argument_evaluations = ArgumentEvaluations(
            argument=argument,
            specificity=specificity,
            relevance=relevance,
            interest=interest,
            capability=capability
        )

    #relevance_comment = CommentCrafter().craft_comment(argument_evaluations)
    #print(relevance_comment)        

    #specificity_result = SpecificityIdentifier().identify_specificity(example3)
    #print(specificity_result)


    # suitability_result = CapabilityIdentifier().identify_capability(example2)
    # print(suitability_result)

    # interest_result = InterestIdentifier().identify_interest(example2)
    # print(interest_result)

    # has_conclusion, reparagraph_result = ReParagrapher().reparagraph(example_ps)
    # print(has_conclusion)
    # print(reparagraph_result)

    general_comments = GeneralCommentCrafter().craft_general_comment(argument_evaluations)
    print(general_comments) 

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