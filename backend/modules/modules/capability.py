from modules.models import Argument, Capability
from openai import OpenAI
import logging


class CapabilityIdentifier:
    def __init__(self,
                 capability_system_prompt_path: str = "modules/modules/prompts/system/capability.txt",
                 capability_user_prompt_path: str = "modules/modules/prompts/user/argument.txt",
                 ):
        with open(capability_system_prompt_path, "r") as f:
            self.capability_system_prompt = f.read()

        with open(capability_user_prompt_path, "r") as f:
            self.capability_user_prompt = f.read()

        self.logger = logging.getLogger("CapabilityIdentifier")

    def identify_capability(self, argument: Argument) -> Capability | None:
        """
        Identifies the capability of the student from an argument.
        Writes the result to database.
        """
        try:
            capability_result = self._identify_capability(argument)
            is_capable, is_capable_reason = self._parse_result(
                capability_result)
        except Exception as e:
            self.logger.exception("Failed to identify capability")
            return None

        try:
            capability = Capability.objects.create(
                argument=argument,
                is_capable=is_capable,
                is_capable_reason=is_capable_reason,
            )
            return capability
        except Exception as e:
            self.logger.exception("Failed to save capability")
            return None

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
