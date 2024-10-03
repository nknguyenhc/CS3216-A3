from modules.models import PersonalStatement, Argument
from openai import OpenAI
import re
import logging


class IdeaExtractor:
    def __init__(self, idea_system_prompt_path: str = "modules/modules/prompts/system/idea.txt"):
        with open(idea_system_prompt_path, "r") as f:
            self.idea_system_prompt = f.read()

        self.logger = logging.getLogger("IdeaExtractor")

    def extract(self, personal_statement: PersonalStatement) -> list[Argument] | None:
        client = OpenAI()
        paragraphs = (
            personal_statement.reparagraphed_essay
            if personal_statement.reparagraphed_essay
            else personal_statement.essay
        ).split("\n")
        arguments = []

        for paragraph in paragraphs:
            if paragraph.strip():
                try:
                    argument = self._get_argument_from_paragraph(
                        client, personal_statement, paragraph)
                except Exception as e:
                    self.logger.exception(
                        f"Failed to extract argument from paragraph\n{paragraph=}\n{e=}")
                    argument = None

                if argument is not None:
                    arguments.append(argument)

        return arguments

    def _get_argument_from_paragraph(self, client: OpenAI, personal_statement: PersonalStatement, paragraph: str) -> Argument | None:
        completion = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": self.idea_system_prompt.format(
                        field_of_study=personal_statement.field_of_study
                    )
                },
                {
                    "role": "user",
                    "content": paragraph
                }
            ]
        )

        response_data = completion.choices[0].message.content

        idea = re.search(r'Idea:\s*(.*?)(?=\s*Evidence:)',
                         response_data).group(1).strip()
        evidence = re.search(
            r'Evidence:\s*(.*?)(?=\s*Explanation:)', response_data).group(1).strip()
        explanation = re.search(
            r'Explanation:\s*(.*)', response_data).group(1).strip()

        argument = self.save_argument_to_db(
            personal_statement, idea, evidence, explanation
        )
        return argument

    def save_argument_to_db(self, personal_statement: PersonalStatement,
                            idea: str, evidence: str, explanation: str) -> Argument:
        if not idea or not evidence or not explanation:
            self.logger.exception(
                f"All fields must be provided\n{idea=}\n{evidence=}\n{explanation=}")
            return None

        try:
            personal_statement.save()
            argument = Argument.objects.create(
                personal_statement=personal_statement,
                idea=idea,
                evidence=evidence,
                explanation=explanation
            )
            return argument
        except Exception as e:
            self.logger.exception("Failed to save argument to database")
            return None
