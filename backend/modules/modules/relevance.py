from modules.models import Argument, Relevance
from openai import OpenAI
import logging

class RelevanceIdentifier:
    def __init__(self,
                 relevance_system_prompt_path: str = "modules/modules/prompts/system/relevance.txt",
                 relevance_user_prompt_path: str = "modules/modules/prompts/user/argument.txt"
                ):
        with open(relevance_system_prompt_path, "r") as f:
            self.relevance_system_prompt_path = f.read()
        
        with open(relevance_user_prompt_path, "r") as f:
            self.relevance_user_prompt_path = f.read()
        
        self.logger = logging.getLogger("RelevanceIdentifier")

    def identify_relevance(self, argument: Argument) -> Relevance:
        """
        Identifies the relevance of an argument.
        Writes the result to database.
        """
        try:
            relevance_result = self._identify_relevance(argument)
            is_relevant, reason = self._parse_result(relevance_result)
        except Exception as e:
            self.logger.exception("Failed to identify relevance")
            return None
        
        try:
            relevance = Relevance.objects.create(
                is_relevant=is_relevant,
                reason=reason,
                argument=argument
            )
            return relevance
        except Exception as e:
            self.logger.exception("Failed to save relevance")
            return None

    def _identify_relevance(self, argument: Argument) -> str:
        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": self.relevance_system_prompt_path.format(
                    field_of_study=argument.personal_statement.field_of_study
                )},
                {"role": "user", "content": self.relevance_user_prompt_path.format(
                    idea=argument.idea,
                    evidence=argument.evidence,
                    explanation=argument.explanation
                )}
            ]
        )
        return completion.choices[0].message.content

    def _parse_result(self, result: str) -> tuple[bool, str]:
        lines = result.split("\n", 1)

        if lines[0] == "T":
            return True, lines[1]
        elif lines[0] == "F":
            return False, lines[1]
        else:
            raise ValueError(f"Invalid result: { result }")
