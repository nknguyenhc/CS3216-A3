from modules.models import PersonalStatement
from openai import OpenAI
import logging


class ReParagrapher:
    def __init__(self,
                 reparagraph_system_prompt_path: str = "modules/modules/prompts/system/reparagraph.txt",
                 reparagraph_user_prompt_path: str = "modules/modules/prompts/user/personal-statement.txt"
                 ):
        with open(reparagraph_system_prompt_path, "r") as f:
            self.reparagraph_system_prompt_path = f.read()

        with open(reparagraph_user_prompt_path, "r") as f:
            self.reparagraph_user_prompt_path = f.read()

        self.logger = logging.getLogger("ReParagrapher")

    def reparagraph(self, personal_statement: PersonalStatement) -> tuple[bool, PersonalStatement]:
        """
        Reparagraph the essay in the personal statement.
        Write to database once finished.
        Return the updated object.
        """
        try:
            reparagraph_result = self._reparagraph(personal_statement)
            has_conclusion, reparagraphed_essay = self._parse_result(reparagraph_result)
        except Exception as e:
            self.logger.exception("Failed to reparagraph essay")
            return None
        
        try:
            personal_statement.reparagraphed_essay = reparagraphed_essay
            personal_statement.save()
            return has_conclusion, personal_statement
        except Exception as e:
            self.logger.exception("Failed to return reparagraph personal statement")
            return None

    def _reparagraph(self, personal_statement: PersonalStatement) -> str:
        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": self.reparagraph_system_prompt_path},
                {"role": "user", "content": self.reparagraph_user_prompt_path.format(
                    essay=personal_statement.essay
                )},
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
            return ValueError(f"Invalid result: {result}")

