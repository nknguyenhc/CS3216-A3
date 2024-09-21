from modules.models import Argument, Specificity
from openai import OpenAI
import openai
import re


class SpecificityIdentifier:
    def __init__(self,
                 specificity_system_prompt_path: str = "modules/modules/prompts/system/specificity.txt",
                 argument_user_prompt_path: str = "modules/modules/prompts/user/argument.txt",
                 ):
        with open(specificity_system_prompt_path, "r") as f:
            self.specificity_system_prompt = f.read()

        with open(argument_user_prompt_path, "r") as f:
            self.argument_user_prompt = f.read()

        self.client = openai.OpenAI(api_key="")

    def identify_specificity(self, argument: Argument) -> str:
        completion = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": self.specificity_system_prompt},
                {"role": "user", "content": self.argument_user_prompt.format(
                    idea=argument.idea,
                    evidence=argument.evidence,
                    explanation=argument.explanation,
                )},
            ]
        )

        response_data = completion.choices[0].message.content

        print(response_data)

        is_specific = re.search(
            r'Specific:\s*(.*?)(?=\s*Reason:)', response_data).group(1).strip()
        reason = re.search(r'Reason:\s*(.*)', response_data).group(1).strip()

        self.save_specificity_to_db(
            is_specific, reason, argument
        )

        return is_specific

    def save_specificity_to_db(self, is_specific: str, reason: str, argument: Argument):
        if not is_specific or not reason or not argument:
            raise ValueError("All fields must be provided")

        try:
            argument.personal_statement.save()
            argument.save()

            Specificity.objects.create(
                is_specific=True if is_specific == "T" else False,
                reason=reason,
                argument=argument
            )

        except Exception as e:
            raise Exception("Failed to save specificity") from e
