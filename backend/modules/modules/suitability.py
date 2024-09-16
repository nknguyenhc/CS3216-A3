from modules.models import Argument, Suitability
from openai import OpenAI


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

    def identify_suitability(self, argument: Argument) -> Suitability:
        """
        Identifies the suitability of an argument.
        Writes the result to database.
        """
        return self._identify_interest(argument)

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
