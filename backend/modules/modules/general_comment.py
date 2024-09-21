from modules.models import PersonalStatement, ArgumentEvaluations, GeneralComment
from openai import OpenAI
import logging

class GeneralCommentCrafter:
    def __init__(self,
                 more_interest_system_prompt_path:
                    str = "modules/modules/prompts/system/oxbridge_general_comments/interest_aspect/more_interest.txt",
                 more_specific_interest_system_prompt_path:
                    str = "modules/modules/prompts/system/oxbridge_general_comments/interest_aspect/more_specific.txt",
                 had_non_specific_interest_system_prompt_path:
                    str = "modules/modules/prompts/system/oxbridge_general_comments/interest_aspect/had_non_specific.txt",
                 good_interest_system_prompt_path:
                    str = "modules/modules/prompts/system/oxbridge_general_comments/interest_aspect/good_interest.txt"
                ):
        with open(more_interest_system_prompt_path, "r") as f:
            self.interest_case[0] = f.read()

        with open(more_specific_interest_system_prompt_path, "r") as f:
            self.interest_case[1] = f.read()

        with open(had_non_specific_interest_system_prompt_path, "r") as f:
            self.interest_case[2] = f.read()

        with open(good_interest_system_prompt_path, "r") as f:
            self.interest_case[3] = f.read()

        self.logger = logging.getLogger("GeneralCommentCrafter")

    def craft_general_comment(
        self, personal_state: PersonalStatement, arguments: list[ArgumentEvaluations]
    ) -> GeneralComment:
        """
        Crafts a general comment for a personal statement.
        Writes the result to database.
        """
        case_number_interest = self._identify_interest_case(arguments)
        general_comment_interest = self._craft_general_comment(case_number_interest)
        return general_comment_interest

    def _identify_interest_case(
        self, arguments: list[ArgumentEvaluations]
    ) -> int:
        specific_interest = 0, non_specific_interest = 0
        for argument in arguments:
            if argument.is_relevant & argument.has_interest:
                if argument.is_specific:
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

    def _craft_general_comment(self, case_number: int) -> str:
        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": self.case[case_number]},
            ]
        )
        return completion.choices[0].message.content
