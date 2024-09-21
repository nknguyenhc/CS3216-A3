from modules.models import Argument, Specificity
from openai import OpenAI
import logging


class SpecificityIdentifier:
    def __init__(self,
                 specificity_system_prompt_path: str = "modules/modules/prompts/system/specificity.txt",
                 argument_user_prompt_path: str = "modules/modules/prompts/user/identify_specificity.txt",
                 ):
        with open(specificity_system_prompt_path, "r") as f:
            self.specificity_system_prompt = f.read()

        with open(argument_user_prompt_path, "r") as f:
            self.argument_user_prompt = f.read()

        self.logger = logging.getLogger("SpecificityIdentifier")

    def identify_specificity(self, argument: Argument) -> Specificity | None:
        try:
            specificity_result = self._identify_specificity(argument)
            is_specific, is_specific_reason = self._parse_result(
                specificity_result)
        except Exception as e:
            self.logger.exception("Failed to identify specificity")
            return None

        try:
            specificity = Specificity.objects.create(
                argument=argument,
                is_specific=is_specific,
                reason=is_specific_reason
            )
            return specificity
        except Exception as e:
            self.logger.exception("Failed to save specificity")
            return None

    def _identify_specificity(self, argument: Argument) -> str:
        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": self.specificity_system_prompt.format(
                    field_of_study=argument.personal_statement.field_of_study,
                )},
                {"role": "user", "content": self.argument_user_prompt.format(
                    idea=argument.idea,
                    evidence=argument.evidence,
                )},
            ]
        )
        return completion.choices[0].message.content

    def _parse_result(self, result: str) -> tuple[bool, str]:
        letter = result[0]
        if letter == "T":
            return True, result[2:]
        elif letter == "F":
            return False, result[2:]
        else:
            raise ValueError(f"Invalid result: {result}")
