from modules.models import PersonalStatement, Argument
from openai import OpenAI


class IdeaExtractor:
    def __init__(self,
                 idea_system_prompt_path: str = "modules/modules/prompts/system/idea.txt",
                 ):
        with open(idea_system_prompt_path, "r") as f:
            self.idea_system_prompt_path = f.read()

    def extract(self, personal_statement: PersonalStatement) -> list[Argument]:
        #client = OpenAI()

        openai.api_key = "" 
        client = OpenAI(api_key=openai.api_key)


        paragraphs = personal_statement.reparagraphed_essay.split("\n\n")
        arguments = []

        for paragraph in paragraphs:
            if paragraph.strip():
                completion = client.chat.completions.create(
                    model="gpt-4o",
                    messages=[{
                        "role": "system",
                        "content": self.idea_system_prompt_path.format(
                            field_of_study=personal_statement.field_of_study
                        )}, {
                        "role": "user",
                        "content": paragraph
                    }]
                )

                response_data = completion.choices[0].message.content
                idea = response_data.get("idea", "")
                evidence = response_data.get("evidence", "")
                explanation = response_data.get("explanation", "")

                argument = self.save_argument_to_db(
                    personal_statement, idea, evidence, explanation
                )

                arguments.append(argument)

        return arguments

    def save_argument_to_db(self, personal_statement: PersonalStatement,
                            idea: str, evidence: str, explanation: str) -> Argument:
        argument = Argument.objects.create(
            personal_statement=personal_statement,
            idea=idea,
            evidence=evidence,
            explanation=explanation
        )
        return argument
