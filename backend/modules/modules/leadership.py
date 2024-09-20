from modules.models import Argument, Leadership
from openai import OpenAI
import logging


class LeadershipIdentifier:
    def __init__(self,
                 leadership_prompt_path: str = "modules/modules/prompts/system/leadership.txt",
                 leadership_user_prompt_path: str = "modules/modules/prompts/user/argument.txt",
                 ):
        with open(leadership_prompt_path, "r") as f:
            self.leadership_prompt = f.read()

        with open(leadership_user_prompt_path, "r") as f:
            self.leadership_user_prompt = f.read()

        self.logger = logging.getLogger("LeadershipIdentifier")

    def identify_leadership(self, argument: Argument) -> Leadership | None:
        """
        Identifies the leadership of the student from an argument.
        Writes the result to database.
        """
        try:
            leadership_result = self._identify_leadership(
                argument)
            (
                has_leadership,
                reason_has_leadership,
            ) = self._parse_result(leadership_result)
        except Exception as e:
            self.logger.exception("Failed to identify leadership")
            return None

        try:
            leadership = Leadership(
                argument=argument,
                has_leadership=has_leadership,
                reason_has_leadership=reason_has_leadership,
            )
            return leadership
        except Exception as e:
            self.logger.exception("Failed to save leadership")
            return None

    def _identify_leadership(self, argument: Argument) -> str:
        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": self.leadership_prompt},
                {"role": "user", "content": self.leadership_user_prompt.format(
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
