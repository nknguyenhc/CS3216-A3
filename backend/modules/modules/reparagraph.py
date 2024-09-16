from modules.models import PersonalStatement
from openai import OpenAI
import logging


class ReParagrapher:
    def __init__(self,
                 reparagraph_system_prompt_path: str = "modules/modules/prompts/system/reparagraph.txt",
                 reparagraph_user_prompt_path: str = "modules/modules/prompts/user/personal-statement.txt")
        with open(reparagraph_system_prompt_path, "r") as f:
            self.reparagraph_system_prompt_path = f.read()

        with open(reparagraph_user_prompt_path, "r") as f:
            self.reparagraph_user_prompt_path = f.read()

        self.logger = logging.getLogger("ReParagrapher")

    def reparagraph(self, personal_statement: PersonalStatement) -> PersonalStatement:
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
            reparagraphed_personal_statement = PersonalStatement.objects.create(
                field_of_study=personal_statement.field_of_study,
                essay=personal_statement.essay,
                reparagraphed_essay=reparagraph_result
            )
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
        letter = result[0]
        if letter == "T":
            return True, result[2:]
        elif letter == "F":
            return False, result[2:]
        else:
            return ValueError(f"Invalid result: {result}")

