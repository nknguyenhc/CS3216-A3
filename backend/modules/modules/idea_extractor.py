from modules.models import PersonalStatement, Argument
from openai import OpenAI
import re

class IdeaExtractor:
    def __init__(self, idea_system_prompt_path: str = "modules/modules/prompts/system/idea.txt"):
        with open(idea_system_prompt_path, "r") as f:
            self.idea_system_prompt = f.read()

    def extract(self, personal_statement: PersonalStatement) -> list[Argument]:
        client = OpenAI()
        paragraphs = personal_statement.reparagraphed_essay.split("\n")
        arguments = []

        for paragraph in paragraphs:
            
            if paragraph.strip():
                
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

                #response_data = "Idea: testing. Evidence: testing. Explanation: testing."

                print(response_data)

                idea = re.search(r'Idea:\s*(.*?)(?=\s*Evidence:)', response_data).group(1).strip()
                evidence = re.search(r'Evidence:\s*(.*?)(?=\s*Explanation:)', response_data).group(1).strip()
                explanation = re.search(r'Explanation:\s*(.*)', response_data).group(1).strip()

                argument = self.save_argument_to_db(
                    personal_statement, idea, evidence, explanation
                )

                arguments.append(argument)

        return arguments

    def save_argument_to_db(self, personal_statement: PersonalStatement,
                        idea: str, evidence: str, explanation: str) -> Argument:
        if not idea or not evidence or not explanation:
            raise ValueError("All fields must be provided")

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
            raise Exception("Failed to save argument") from e