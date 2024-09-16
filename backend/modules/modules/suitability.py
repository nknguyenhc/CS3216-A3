from modules.models import Argument, Suitability
from openai import OpenAI
import logging


class SuitabilityIdentifier:
    def __init__(self,
                 interest_system_prompt_path: str = "modules/modules/prompts/system/suitability-interest.txt",
                 capability_system_prompt_path: str = "modules/modules/prompts/system/suitability-capability.txt",
                 interest_user_prompt_path: str = "modules/modules/prompts/user/argument.txt",
                 capability_user_prompt_path: str = "modules/modules/prompts/user/argument.txt",
                 ):
        with open(interest_system_prompt_path, "r") as f:
            self.interest_system_prompt = f.read()

        with open(capability_system_prompt_path, "r") as f:
            self.capability_system_prompt = f.read()

        with open(interest_user_prompt_path, "r") as f:
            self.interest_user_prompt = f.read()

        with open(capability_user_prompt_path, "r") as f:
            self.capability_user_prompt = f.read()

        self.logger = logging.getLogger("SuitabilityIdentifier")

    def identify_suitability(self, argument: Argument) -> Suitability:
        """
        Identifies the suitability of an argument.
        Writes the result to database.
        """
        try:
            interest_result = self._identify_interest(argument)
            has_interest, has_interest_reason = self._parse_result(
                interest_result)
        except Exception as e:
            self.logger.exception("Failed to identify interest")
            return None

        try:
            capability_result = self._identify_capability(argument)
            is_capable, is_capable_reason = self._parse_result(
                capability_result)
        except Exception as e:
            self.logger.exception("Failed to identify capability")
            return None

        try:
            suitability = Suitability.objects.create(
                argument=argument,
                has_interest=has_interest,
                has_interest_reason=has_interest_reason,
                is_capable=is_capable,
                is_capable_reason=is_capable_reason,
            )
            return suitability
        except Exception as e:
            self.logger.exception("Failed to save suitability")
            return None

    def _identify_interest(self, argument: Argument) -> str:
        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": self.interest_system_prompt.format(
                    field_of_study=argument.personal_statement.field_of_study
                )},
                {"role": "user", "content": self.interest_user_prompt.format(
                    idea=argument.idea,
                    evidence=argument.evidence,
                    explanation=argument.explanation,
                )},
            ]
        )
        return completion.choices[0].message.content

    def _identify_capability(self, argument: Argument) -> str:
        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": self.capability_system_prompt.format(
                    field_of_study=argument.personal_statement.field_of_study,
                )},
                {"role": "user", "content": self.capability_user_prompt.format(
                    idea=argument.idea,
                    evidence=argument.evidence,
                    explanation=argument.explanation,
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
