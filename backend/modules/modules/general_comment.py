from modules.models import PersonalStatement, ArgumentEvaluations, GeneralComment
from openai import OpenAI
import logging
from typing import List


class GeneralCommentCrafter:
    def __init__(self,
                 more_interest_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_general_comments/interest_aspect/more_interest.txt",
                 more_specific_interest_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_general_comments/interest_aspect/more_specific.txt",
                 had_non_specific_interest_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_general_comments/interest_aspect/had_non_specific.txt",
                 good_interest_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_general_comments/interest_aspect/good_interest.txt",
                 more_capability_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_general_comments/capability_aspect/more_capability.txt",
                 more_specific_capability_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_general_comments/capability_aspect/more_specific.txt",
                 had_non_specific_capability_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_general_comments/capability_aspect/had_non_specific.txt",
                 good_capability_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_general_comments/capability_aspect/good_capability.txt",
                 general_comments_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_general_comments/general_comments.txt"
                 ):
        self.interest_case = [""] * 4
        self.capability_case = [""] * 4

        with open(more_interest_system_prompt_path, "r") as f:
            self.interest_case[0] = f.read()

        with open(more_specific_interest_system_prompt_path, "r") as f:
            self.interest_case[1] = f.read()

        with open(had_non_specific_interest_system_prompt_path, "r") as f:
            self.interest_case[2] = f.read()

        with open(good_interest_system_prompt_path, "r") as f:
            self.interest_case[3] = f.read()

        with open(more_capability_system_prompt_path, "r") as f:
            self.capability_case[0] = f.read()

        with open(more_specific_capability_system_prompt_path, "r") as f:
            self.capability_case[1] = f.read()

        with open(had_non_specific_capability_system_prompt_path, "r") as f:
            self.capability_case[2] = f.read()

        with open(good_capability_system_prompt_path, "r") as f:
            self.capability_case[3] = f.read()

        with open(general_comments_system_prompt_path, "r") as f:
            self.general_comments_system_prompt_path = f.read()

        self.logger = logging.getLogger("GeneralCommentCrafter")

    def craft_general_comment(self, personal_statement: PersonalStatement, arguments: List[ArgumentEvaluations]) -> GeneralComment:
        try:
            case_number_capability = self._identify_capability_case(arguments)
            case_number_interest = self._identify_interest_case(arguments)
        except Exception as e:
            self.logger.exception("Failed to identify cases")
            return None

        try:
            comment = self._craft_general_comment(
                case_number_interest, case_number_capability)
            personal_statement.save()
            general_comment = GeneralComment.objects.create(
                comment=comment,
                personal_statement=personal_statement
            )
            return general_comment
        except Exception as e:
            self.logger.exception("Failed to generate general comments")
            return None

    def _identify_interest_case(self, arguments: List[ArgumentEvaluations]) -> int:
        specific_interest = 0
        non_specific_interest = 0
        for argument in arguments:
            if argument.relevance.is_relevant == "T" and argument.interest.has_interest == "T":
                if argument.specificity.is_specific:
                    specific_interest += 1
                else:
                    non_specific_interest += 1

        if specific_interest + non_specific_interest < 3:
            return 0
        elif specific_interest <= 2:
            return 1
        elif non_specific_interest >= 1:
            return 2
        else:
            return 3

    def _identify_capability_case(self, arguments: List[ArgumentEvaluations]) -> int:
        specific_capability = 0
        non_specific_capability = 0
        for argument in arguments:
            if argument.relevance.is_relevant == "T" and argument.capability.is_capable == "T":
                if argument.specificity.is_specific == "T":
                    specific_capability += 1
                else:
                    non_specific_capability += 1
        if specific_capability + non_specific_capability < 3:
            return 0
        elif specific_capability <= 2:
            return 1
        elif non_specific_capability >= 1:
            return 2
        else:
            return 3

    def _craft_general_comment(self, case_number_interest: int, case_number_capability: int) -> str:
        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": self.general_comments_system_prompt_path.format(
                    capability_comment=self.capability_case[case_number_capability],
                    interest_comment=self.interest_case[case_number_interest]
                )},
            ]
        )
        return completion.choices[0].message.content
