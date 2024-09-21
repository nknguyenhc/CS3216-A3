from modules.models import Argument, UnwantedLanguage
from openai import OpenAI
import re


class UnwantedLanguageIdentifier:
    def __init__(self,
                 unwanted_language_system_prompt_path: str = "modules/modules/prompts/system/unwanted_language.txt",
                 argument_user_prompt_path: str = "modules/modules/prompts/user/argument.txt",
                 ):
        with open(unwanted_language_system_prompt_path, "r") as f:
            self.unwanted_language_system_prompt = f.read()

        with open(argument_user_prompt_path, "r") as f:
            self.argument_user_prompt = f.read()

    def identify_unwanted_language(self, argument: Argument) -> str:
        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": self.unwanted_language_system_prompt},
                {"role": "user", "content": self.argument_user_prompt.format(
                    idea=argument.idea,
                    evidence=argument.evidence,
                    explanation=argument.explanation,
                )},
            ]
        )

        response_data = completion.choices[0].message.content

        print(response_data)

        has_unwanted_language = re.search(
            r'Unwanted_Language:\s*(.*?)(?=\s*Reason:)', response_data).group(1).strip()
        has_unwanted_language_reason = re.search(r'Reason:\s*(.*)', response_data).group(1).strip()

        self.save_unwanted_language_to_db(
            has_unwanted_language, has_unwanted_language_reason, argument
        )

        return has_unwanted_language

    def save_unwanted_language_to_db(self, has_unwanted_language: str, has_unwanted_language_reason: str, argument: Argument):
        if not has_unwanted_language or not has_unwanted_language_reason or not argument:
            raise ValueError("All fields must be provided")

        try:
            argument.personal_statement.save()
            argument.save()

            UnwantedLanguage.objects.create(
                has_unwanted_language=True if has_unwanted_language == "T" else False,
                has_unwanted_language_reason=has_unwanted_language_reason,
                argument=argument
            )

        except Exception as e:
            raise Exception("Failed to save unwanted language") from e
