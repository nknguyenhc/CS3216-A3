import logging
from .modules.capability import CapabilityIdentifier
from .modules.comment import CommentCrafter
from .modules.general_comment import GeneralCommentCrafter
from .modules.idea_extractor import IdeaExtractor
from .modules.interest import InterestIdentifier
from .modules.relevance import RelevanceIdentifier
from .modules.reparagraph import ReParagrapher
from .modules.specificity import SpecificityIdentifier
from .models import PersonalStatement, Comment, GeneralComment, Argument, ArgumentEvaluations


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

        arguments = self.idea_extractor.extract(re_personal_statement)
        if arguments is None:
            # Fail if idea extractor fails
            return OrchestratorResult(success=False)

        evaluations = [self._evaluate(argument) for argument in arguments]
        filtered_evaluations = [
            evaluation for evaluation in evaluations if evaluation is not None]
        if len(filtered_evaluations) == 0 and len(evaluations) > 0:
            # Fail if all evaluations fail
            return OrchestratorResult(success=False)

        comments = [self.comment_crafter.craft_comment(
            evaluation) for evaluation in filtered_evaluations]
        comments = [comment for comment in comments if comment is not None]
        if len(comments) == 0 and len(filtered_evaluations) > 0:
            # Fail if all comments fail
            return OrchestratorResult(success=False)

        general_comment = self.general_comment_crafter.craft_general_comment(
            filtered_evaluations)
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
