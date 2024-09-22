from modules.models import Argument, FactCheck
from openai import OpenAI
import re


class FactCheckIdentifier:
    def __init__(self,
                 fact_check_system_prompt_path: str = "modules/modules/prompts/system/fact_check.txt",
                 argument_user_prompt_path: str = "modules/modules/prompts/user/argument.txt",
                 ):
        with open(fact_check_system_prompt_path, "r") as f:
            self.fact_check_system_prompt = f.read()

        with open(argument_user_prompt_path, "r") as f:
            self.argument_user_prompt = f.read()

    def identify_fact_check(self, argument: Argument) -> str:
        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": self.fact_check_system_prompt},
                {"role": "user", "content": self.argument_user_prompt.format(
                    idea=argument.idea,
                    evidence=argument.evidence,
                    explanation=argument.explanation,
                )},
            ]
        )

        response_data = completion.choices[0].message.content

        print(response_data)

        has_fake_fact = re.search(
            r'Has_Fake_Fact:\s*(.*?)(?=\s*Reason:)', response_data).group(1).strip()
        has_fake_fact_reason = re.search(
            r'Reason:\s*(.*)', response_data).group(1).strip()

        self.save_fact_check_to_db(
            has_fake_fact, has_fake_fact_reason, argument
        )

        return has_fake_fact

    def save_fact_check_to_db(self, has_fake_fact: str, has_fake_fact_reason: str, argument: Argument):
        if not has_fake_fact or not has_fake_fact_reason or not argument:
            raise ValueError("All fields must be provided")

        try:
            argument.personal_statement.save()
            argument.save()

            FactCheck.objects.create(
                has_fake_fact=True if has_fake_fact == "T" else False,
                has_fake_fact_reason=has_fake_fact_reason,
                argument=argument
            )

        except Exception as e:
            raise Exception("Failed to save unwanted language") from e
