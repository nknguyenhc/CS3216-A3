import logging
from .modules.aspiration import AspirationIdentifier
from .modules.capability import CapabilityIdentifier
from .modules.comment import CommentCrafter
from .modules.comment_jardine import JardineCommentCrafter
from .modules.community import ContributionToCommunityIdentifier
from .modules.general_comment import GeneralCommentCrafter
from .modules.general_comment_jardine import JardineGeneralCommentCrafter
from .modules.idea_extractor import IdeaExtractor
from .modules.interest import InterestIdentifier
from .modules.leadership import LeadershipIdentifier
from .modules.relevance import RelevanceIdentifier
from .modules.reparagraph import ReParagrapher
from .modules.specificity import SpecificityIdentifier
from .models import (
    PersonalStatement,
    Comment,
    GeneralComment,
    Argument,
    ArgumentEvaluations,
    JardineArgumentEvaluations,
)


class OrchestratorResult:
    def __init__(self,
                 success: bool,
                 essay: str | None = None,
                 comments: list[Comment] | None = None,
                 general_comment: GeneralComment | None = None,
                 ):
        self.success = success
        self.essay = essay
        self.comments = comments
        self.general_comment = general_comment

    def to_dict(self):
        assert self.success, "Cannot convert failed result to dict"
        return {
            'essay': self.essay,
            'comments': [self._comment_to_dict(comment) for comment in self.comments],
            'general_comment': self.general_comment.comment
        }

    def _comment_to_dict(self, comment: Comment):
        return {
            'comment': comment.comment,
            'is_positive': comment.is_good,
            'text': comment.argument.idea,
        }


class Orchestrator:
    def __init__(self):
        self.logger = logging.getLogger("Orchestrator")
        self.re_paragrapher = ReParagrapher()
        self.idea_extractor = IdeaExtractor()
        self.relevance_identifier = RelevanceIdentifier()
        self.specificity_identifier = SpecificityIdentifier()
        self.capability_identifier = CapabilityIdentifier()
        self.interest_identifier = InterestIdentifier()
        self.comment_crafter = CommentCrafter()
        self.general_comment_crafter = GeneralCommentCrafter()

    def run(self, personal_statement: PersonalStatement) -> OrchestratorResult:
        re_personal_statement = self.re_paragrapher.reparagraph(
            personal_statement)
        if re_personal_statement is None:
            # Skip re-paragraphing if not successful
            re_personal_statement = personal_statement
        else:
            re_personal_statement = re_personal_statement[1]
        self.logger.debug(f"{re_personal_statement=}")

        arguments = self.idea_extractor.extract(re_personal_statement)
        if arguments is None:
            # Fail if idea extractor fails
            return OrchestratorResult(success=False)
        self.logger.debug(f"{arguments=}")

        evaluations = [self._evaluate(argument) for argument in arguments]
        self.logger.debug(f"{evaluations=}")
        filtered_evaluations = [
            evaluation for evaluation in evaluations if evaluation is not None]
        if len(filtered_evaluations) == 0 and len(evaluations) > 0:
            # Fail if all evaluations fail
            return OrchestratorResult(success=False)

        comments = [self.comment_crafter.craft_comment(
            evaluation) for evaluation in filtered_evaluations]
        self.logger.debug(f"{comments=}")
        comments = [comment for comment in comments if comment is not None]
        if len(comments) == 0 and len(filtered_evaluations) > 0:
            # Fail if all comments fail
            return OrchestratorResult(success=False)

        general_comment = self.general_comment_crafter.craft_general_comment(
            personal_statement, filtered_evaluations)
        self.logger.debug(f"{general_comment=}")
        return OrchestratorResult(
            success=True,
            essay=re_personal_statement.reparagraphed_essay
            if re_personal_statement.reparagraphed_essay
            else re_personal_statement.essay,
            comments=comments,
            general_comment=general_comment
        )

    def _evaluate(self, argument: Argument) -> ArgumentEvaluations | None:
        relevance = self.relevance_identifier.identify_relevance(argument)
        specificity = self.specificity_identifier.identify_specificity(
            argument)
        capability = self.capability_identifier.identify_capability(argument)
        interest = self.interest_identifier.identify_interest(argument)

        if relevance is None or specificity is None \
                or specificity is None or capability is None or interest is None:
            return None

        return ArgumentEvaluations(
            argument=argument,
            relevance=relevance,
            specificity=specificity,
            capability=capability,
            interest=interest
        )

    def run_stub(self, personal_statement: PersonalStatement) -> OrchestratorResult:
        return OrchestratorResult(
            success=True,
            essay=personal_statement.essay,
            comments=[
                Comment(
                    comment="This is a positive comment",
                    is_good=True,
                    argument=Argument(
                        idea=personal_statement.essay[:300],
                        personal_statement=personal_statement
                    )
                ),
                Comment(
                    comment="This is a negative comment",
                    is_good=False,
                    argument=Argument(
                        idea=personal_statement.essay[-300:],
                        personal_statement=personal_statement
                    )
                ),
            ],
            general_comment=GeneralComment(
                comment="This is a general comment",
                personal_statement=personal_statement
            )
        )


class JardineOrchestrator:
    def __init__(self):
        self.logger = logging.getLogger("JardineOrchestrator")
        self.re_paragrapher = ReParagrapher()
        self.idea_extractor = IdeaExtractor()
        self.relevance_identifier = RelevanceIdentifier()
        self.specificity_identifier = SpecificityIdentifier()
        self.capability_identifier = CapabilityIdentifier()
        self.leadership_identifier = LeadershipIdentifier()
        self.aspiration_identifier = AspirationIdentifier()
        self.community_identifier = ContributionToCommunityIdentifier()
        self.comment_crafter = JardineCommentCrafter()
        self.general_comment_crafter = JardineGeneralCommentCrafter()

    def run(self, personal_statement: PersonalStatement) -> OrchestratorResult:
        re_personal_statement = self.re_paragrapher.reparagraph(
            personal_statement)
        if re_personal_statement is None:
            # Skip re-paragraphing if not successful
            re_personal_statement = personal_statement
        else:
            re_personal_statement = re_personal_statement[1]
        self.logger.debug(f"{re_personal_statement=}")

        arguments = self.idea_extractor.extract(re_personal_statement)
        if arguments is None:
            # Fail if idea extractor fails
            return OrchestratorResult(success=False)
        self.logger.debug(f"{arguments=}")

        evaluations = [self._evaluate(argument) for argument in arguments]
        self.logger.debug(f"{evaluations=}")
        filtered_evaluations = [
            evaluation for evaluation in evaluations if evaluation is not None]
        if len(filtered_evaluations) == 0 and len(evaluations) > 0:
            # Fail if all evaluations fail
            return OrchestratorResult(success=False)

        comments = [self.comment_crafter.craft_comment(
            evaluation) for evaluation in filtered_evaluations]
        self.logger.debug(f"{comments=}")
        comments = [comment for comment in comments if comment is not None]
        if len(comments) == 0 and len(filtered_evaluations) > 0:
            # Fail if all comments fail
            return OrchestratorResult(success=False)

        general_comment = self.general_comment_crafter.craft_general_comment(
            personal_statement, filtered_evaluations)
        self.logger.debug(f"{general_comment=}")
        return OrchestratorResult(
            success=True,
            essay=re_personal_statement.reparagraphed_essay
            if re_personal_statement.reparagraphed_essay
            else re_personal_statement.essay,
            comments=comments,
            general_comment=general_comment
        )

    def _evaluate(self, argument: Argument) -> JardineArgumentEvaluations | None:
        relevance = self.relevance_identifier.identify_relevance(argument)
        specificity = self.specificity_identifier.identify_specificity(
            argument)
        capability = self.capability_identifier.identify_capability(argument)
        leadership = self.leadership_identifier.identify_leadership(argument)
        aspiration = self.aspiration_identifier.identify_aspiration(argument)
        contribution_to_community = self.community_identifier.identify_contribution_to_community(
            argument)

        if relevance is None or specificity is None \
                or specificity is None or capability is None \
                or leadership is None or aspiration is None \
                or contribution_to_community is None:
            return None

        return JardineArgumentEvaluations(
            argument=argument,
            relevance=relevance,
            specificity=specificity,
            capability=capability,
            leadership=leadership,
            aspiration=aspiration,
            contribution_to_community=contribution_to_community
        )
    
    def run_stub(self, personal_statement: PersonalStatement) -> OrchestratorResult:
        return OrchestratorResult(
            success=True,
            essay=personal_statement.essay,
            comments=[
                Comment(
                    comment="This is a positive comment",
                    is_good=True,
                    argument=Argument(
                        idea=personal_statement.essay[:300],
                        personal_statement=personal_statement
                    )
                ),
                Comment(
                    comment="This is a negative comment",
                    is_good=False,
                    argument=Argument(
                        idea=personal_statement.essay[-300:],
                        personal_statement=personal_statement
                    )
                ),
            ],
            general_comment=GeneralComment(
                comment="This is a general comment",
                personal_statement=personal_statement
            )
        )
