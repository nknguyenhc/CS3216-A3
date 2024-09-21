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
    from .unwanted_language import UnwantedLanguageIdentifier
    from .fact_check import FactCheckIdentifier
    from .comment_jardine import JardineCommentCrafter
    from modules.models import (
        Argument,
        Specificity,
        Relevance,
        Interest,
        Capability,
        ArgumentEvaluations,
        PersonalStatement,
        FactCheck,
        UnwantedLanguage,
        ContributionToCommunity,
        Aspiration,
        Leadership,
        JardineArgumentEvaluations,
    )
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

    relevance_comment = CommentCrafter().craft_comment(argument_evaluations)
    print(relevance_comment) 
    '''

    '''
    with open("modules/modules/tests/language/example2.json") as f:
        data = json.load(f)
        example1 = Argument(
            idea=data["idea"],
            evidence=data["evidence"],
            explanation=data["explanation"],
            personal_statement=PersonalStatement(
                field_of_study=data["field_of_study"],
            ),
        )

    unwanted_language_result = UnwantedLanguageIdentifier().identify_unwanted_language(example1)
    print(unwanted_language_result)
    '''
    '''
    with open("modules/modules/tests/fact_check/example2.json") as f:
        data = json.load(f)
        example1 = Argument(
            idea=data["idea"],
            evidence=data["evidence"],
            explanation=data["explanation"],
            personal_statement=PersonalStatement(
                field_of_study=data["field_of_study"],
            ),
        )
    '''

    # fact_check_result = FactCheckIdentifier().identify_fact_check(example1)
    # print(fact_check_result)

    # specificity_result = SpecificityIdentifier().identify_specificity(example3)
    # print(specificity_result)

    # suitability_result = CapabilityIdentifier().identify_capability(example2)
    # print(suitability_result)

    # interest_result = InterestIdentifier().identify_interest(example2)
    # print(interest_result)

    # has_conclusion, reparagraph_result = ReParagrapher().reparagraph(example_ps)
    # print(has_conclusion)
    # print(reparagraph_result)

    # exit(0)

    ### JARDINE ###
    ### Do not run the code below, only I have access to the data ###

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
        example5 = Argument(
            idea=data["idea"],
            evidence=data["evidence"],
            explanation=data["explanation"],
            personal_statement=PersonalStatement(
                field_of_study=data["field_of_study"],
            ),
        )

    with open("modules/data/poor_example.json") as f:
        data = json.load(f)
        poor_example = Argument(
            idea=data["idea"],
            evidence=data["evidence"],
            explanation=data["explanation"],
            personal_statement=PersonalStatement(
                field_of_study=data["field_of_study"],
            ),
        )

    with open("modules/data/poor_example2.json") as f:
        data = json.load(f)
        poor_example2 = Argument(
            idea=data["idea"],
            evidence=data["evidence"],
            explanation=data["explanation"],
            personal_statement=PersonalStatement(
                field_of_study=data["field_of_study"],
            ),
        )

    with open("modules/modules/tests/example2.json") as f:
        data = json.load(f)
        oxbridge_example2 = Argument(
            idea=data["idea"],
            evidence=data["evidence"],
            explanation=data["explanation"],
            personal_statement=PersonalStatement(
                field_of_study=data["field_of_study"],
            ),
        )

    with open("modules/data/evaluations/poor_example.json") as f:
        data = json.load(f)
        poor_example_evaluations = JardineArgumentEvaluations(
            argument=Argument(
                idea=data["idea"],
                evidence=data["evidence"],
                explanation=data["explanation"],
                personal_statement=PersonalStatement(
                    field_of_study=data["field_of_study"],
                ),
            ),
            specificity=None,
            relevance=None,
            capability=Capability(
                is_capable=False,
                is_capable_reason=data["no_capability"],
            ),
            contribution_to_community=ContributionToCommunity(
                has_contribution_to_community=False,
                reason_has_contribution_to_community=data["no_contribution_to_community"],
                will_contribute_to_community=False,
                reason_will_contribute_to_community=data["no_potential_to_contribute_to_community"],
            ),
            aspiration=Aspiration(
                has_aspiration=False,
                reason_has_aspiration=data["no_aspiration"],
            ),
            leadership=Leadership(
                has_leadership=False,
                reason_has_leadership=data["no_leadership"],
            ),
        )

    with open("modules/data/evaluations/poor_example2.json") as f:
        data = json.load(f)
        poor_example_evaluations2 = JardineArgumentEvaluations(
            argument=Argument(
                idea=data["idea"],
                evidence=data["evidence"],
                explanation=data["explanation"],
                personal_statement=PersonalStatement(
                    field_of_study=data["field_of_study"],
                ),
            ),
            specificity=None,
            relevance=None,
            capability=Capability(
                is_capable=False,
                is_capable_reason=data["no_capability"],
            ),
            contribution_to_community=ContributionToCommunity(
                has_contribution_to_community=False,
                reason_has_contribution_to_community=data["no_contribution_to_community"],
                will_contribute_to_community=False,
                reason_will_contribute_to_community=data["no_potential_to_contribute_to_community"],
            ),
            aspiration=Aspiration(
                has_aspiration=False,
                reason_has_aspiration=data["no_aspiration"],
            ),
            leadership=Leadership(
                has_leadership=False,
                reason_has_leadership=data["no_leadership"],
            ),
        )

    with open("modules/data/evaluations/oxbridge_example2.json") as f:
        data = json.load(f)
        oxbridge_example2_evaluations = JardineArgumentEvaluations(
            argument=Argument(
                idea=data["idea"],
                evidence=data["evidence"],
                explanation=data["explanation"],
                personal_statement=PersonalStatement(
                    field_of_study=data["field_of_study"],
                ),
            ),
            specificity=Specificity(
                is_specific=False,
                reason=data["no_specificity"]
            ),
            relevance=None,
            capability=Capability(
                is_capable=False,
                is_capable_reason="",
            ),
            contribution_to_community=ContributionToCommunity(
                has_contribution_to_community=False,
                reason_has_contribution_to_community="",
                will_contribute_to_community=True,
                reason_will_contribute_to_community=data["potential_to_contribute_to_community"],
            ),
            aspiration=Aspiration(
                has_aspiration=False,
                reason_has_aspiration="",
            ),
            leadership=Leadership(
                has_leadership=False,
                reason_has_leadership="",
            ),
        )

    with open("modules/data/evaluations/example1.json", encoding="utf-8") as f:
        data = json.load(f)
        example1_evaluations = JardineArgumentEvaluations(
            argument=Argument(
                idea=data["idea"],
                evidence=data["evidence"],
                explanation=data["explanation"],
                personal_statement=PersonalStatement(
                    field_of_study=data["field_of_study"],
                ),
            ),
            specificity=Specificity(
                is_specific=True,
                reason=data["specificity"]
            ),
            relevance=None,
            capability=Capability(
                is_capable=False,
                is_capable_reason="",
            ),
            contribution_to_community=ContributionToCommunity(
                has_contribution_to_community=True,
                reason_has_contribution_to_community=data["contribution_to_community"],
                will_contribute_to_community=False,
                reason_will_contribute_to_community="",
            ),
            aspiration=Aspiration(
                has_aspiration=False,
                reason_has_aspiration="",
            ),
            leadership=Leadership(
                has_leadership=False,
                reason_has_leadership="",
            ),
        )

    # specificity_result = SpecificityIdentifier().identify_specificity(example1)
    # print(specificity_result)

    # capability_result = CapabilityIdentifier().identify_capability(example1)
    # print(capability_result)

    # community_result = ContributionToCommunityIdentifier(
    # ).identify_contribution_to_community(example1)
    # print(community_result)

    # aspiration_result = AspirationIdentifier().identify_aspiration(example1)
    # print(aspiration_result)

    # leadership_result = LeadershipIdentifier().identify_leadership(example1)
    # print(leadership_result)

    jardine_comment = JardineCommentCrafter().craft_comment(
        example1_evaluations)
    print(jardine_comment)
