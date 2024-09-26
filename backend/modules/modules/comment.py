from modules.models import Argument, ArgumentEvaluations, Comment
from openai import OpenAI
import logging


class CommentCrafter:
    def __init__(self,
                 relevance_good_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_comments/relevance_good.txt",
                 relevance_lack_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_comments/relevance_lack.txt",
                 interest_good_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_comments/interest_good.txt",
                 interest_lack_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_comments/interest_lack.txt",
                 capability_good_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_comments/capability_good.txt",
                 capability_lack_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_comments/capability_lack.txt",
                 specificity_good_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_comments/specificity_good.txt",
                 specificity_lack_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_comments/specificity_lack.txt",
                 relevance_user_prompt_path: str = "modules/modules/prompts/user/relevance.txt",
                 interest_user_prompt_path: str = "modules/modules/prompts/user/interest.txt",
                 specificity_user_prompt_path: str = "modules/modules/prompts/user/specificity.txt",
                 capability_user_prompt_path: str = "modules/modules/prompts/user/capability.txt",
                 ):

        self.relevance_good_system_prompt = self.load_prompt(
            relevance_good_system_prompt_path)
        self.relevance_lack_system_prompt = self.load_prompt(
            relevance_lack_system_prompt_path)
        self.interest_good_system_prompt = self.load_prompt(
            interest_good_system_prompt_path)
        self.interest_lack_system_prompt = self.load_prompt(
            interest_lack_system_prompt_path)
        self.capability_good_system_prompt = self.load_prompt(
            capability_good_system_prompt_path)
        self.capability_lack_system_prompt = self.load_prompt(
            capability_lack_system_prompt_path)
        self.specificity_good_system_prompt = self.load_prompt(
            specificity_good_system_prompt_path)
        self.specificity_lack_system_prompt = self.load_prompt(
            specificity_lack_system_prompt_path)
        self.relevance_user_prompt = self.load_prompt(
            relevance_user_prompt_path)
        self.interest_user_prompt = self.load_prompt(interest_user_prompt_path)
        self.specificity_user_prompt = self.load_prompt(
            specificity_user_prompt_path)
        self.capability_user_prompt = self.load_prompt(
            capability_user_prompt_path)

        self.logger = logging.getLogger("CommentCrafter")

    def load_prompt(self, path: str) -> str:
        with open(path, "r") as f:
            return f.read()

    def craft_comment(self, argument: ArgumentEvaluations) -> Comment | None:
        client = OpenAI()
        bad_comment = ""
        good_comment = ""

        def create_completion(system_prompt, user_prompt):
            completion = client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ]
            )
            return completion.choices[0].message.content

        if not argument.relevance.is_relevant:
            output = create_completion(
                self.relevance_lack_system_prompt.format(
                    field_of_study=argument.argument.personal_statement.field_of_study
                ),
                self.relevance_user_prompt.format(
                    is_relevant=argument.relevance.is_relevant,
                    reason=argument.relevance.reason,
                    idea=argument.argument.idea,
                    evidence=argument.argument.evidence,
                    explanation=argument.argument.explanation
                )
            )
            bad_comment += output
            return self.save_comment_to_db(output, argument.argument, bad_comment, good_comment)

        interest_or_capable = argument.interest.has_interest or argument.capability.is_capable

        if argument.interest.has_interest:
            output = create_completion(
                self.interest_good_system_prompt.format(
                    field_of_study=argument.argument.personal_statement.field_of_study
                ),
                self.interest_user_prompt.format(
                    has_interest=argument.interest.has_interest,
                    has_interest_reason=argument.interest.has_interest_reason,
                    idea=argument.argument.idea,
                    evidence=argument.argument.evidence,
                    explanation=argument.argument.explanation
                )
            )
            good_comment += output

        if argument.capability.is_capable:
            output = create_completion(
                self.capability_good_system_prompt.format(
                    field_of_study=argument.argument.personal_statement.field_of_study
                ),
                self.capability_user_prompt.format(
                    is_capable=argument.capability.is_capable,
                    is_capable_reason=argument.capability.is_capable_reason,
                    idea=argument.argument.idea,
                    evidence=argument.argument.evidence,
                    explanation=argument.argument.explanation
                )
            )
            good_comment += output

        if interest_or_capable and not argument.specificity.is_specific:
            output = create_completion(
                self.specificity_good_system_prompt,
                self.specificity_user_prompt.format(
                    is_specific=argument.specificity.is_specific,
                    reason=argument.specificity.reason,
                    idea=argument.argument.idea,
                    evidence=argument.argument.evidence,
                    explanation=argument.argument.explanation
                )
            )
            bad_comment += output

        elif not interest_or_capable and argument.specificity.is_specific:

            output = create_completion(
                self.interest_lack_system_prompt.format(
                    field_of_study=argument.argument.personal_statement.field_of_study
                ),
                self.interest_user_prompt.format(
                    has_interest=argument.interest.has_interest,
                    has_interest_reason=argument.interest.has_interest_reason,
                    idea=argument.argument.idea,
                    evidence=argument.argument.evidence,
                    explanation=argument.argument.explanation
                )
            )
            bad_comment += output

            output = create_completion(
                self.capability_lack_system_prompt,
                self.capability_user_prompt.format(
                    is_capable=argument.capability.is_capable,
                    is_capable_reason=argument.capability.is_capable_reason,
                    idea=argument.argument.idea,
                    evidence=argument.argument.evidence,
                    explanation=argument.argument.explanation
                )
            )
            bad_comment += output

        return self.save_comment_to_db(argument.argument, bad_comment, good_comment)

    def save_comment_to_db(self, argument: Argument, bad_comment: str, good_comment: str) -> Comment | None:
        if not argument or (not bad_comment and not good_comment):
            self.logger.error(
                f"All fields must be provided:\n{argument=}, \n{bad_comment=},\n{good_comment=}")
            return None

        try:
            argument.personal_statement.save()
            argument.save()

            return Comment.objects.create(
                comment=good_comment + bad_comment,
                is_good=True if bad_comment == "" else False,
                argument=argument
            )

        except Exception as e:
            self.logger.exception("Failed to save comment to database")
            return None
