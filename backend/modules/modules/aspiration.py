from modules.models import Argument, Aspiration
from openai import OpenAI
import logging


class AspirationIdentifier:
    def __init__(self,
                 aspiration_prompt_path: str = "modules/modules/prompts/system/aspiration.txt",
                 aspiration_user_prompt_path: str = "modules/modules/prompts/user/argument.txt",
                 ):
        with open(aspiration_prompt_path, "r") as f:
            self.aspiration_prompt = f.read()

        with open(aspiration_user_prompt_path, "r") as f:
            self.aspiration_user_prompt = f.read()

        self.logger = logging.getLogger("AspirationIdentifier")

    def identify_aspiration(self, argument: Argument) -> Aspiration | None:
        """
        Identifies the aspiration of the student from an argument.
        Writes the result to database.
        """
        try:
            aspiration_result = self._identify_aspiration(
                argument)
            (
                has_aspiration,
                reason_has_aspiration,
            ) = self._parse_result(aspiration_result)
        except Exception as e:
            self.logger.exception("Failed to identify aspiration")
            return None

        try:
            aspiration = Aspiration.objects.create(
                argument=argument,
                has_aspiration=has_aspiration,
                reason_has_aspiration=reason_has_aspiration,
            )
            return aspiration
        except Exception as e:
            self.logger.exception("Failed to save aspiration")
            return None

    def _identify_aspiration(self, argument: Argument) -> str:
        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": self.aspiration_prompt.format(
                    field_of_study=argument.personal_statement.field_of_study
                )},
                {"role": "user", "content": self.aspiration_user_prompt.format(
                    idea=argument.idea,
                    evidence=argument.evidence,
                    explanation=argument.explanation,
                )},
            ],
        )
        return completion.choices[0].message.content

    def _parse_result(self, result: str) -> tuple:
        letter = result[0]
        if letter == "T":
            return True, result[2:]
        elif letter == "F":
            return False, result[2:]
        else:
            raise ValueError(f"Invalid result: {result}")
