from modules.models import Argument, ArgumentEvaluations, Comment
from openai import OpenAI
import re

class CommentCrafter:
    def __init__(self,
                 relevance_good_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_comments/relevance_good.txt",
                 #relevance_lack_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_comments/relevance_lack.txt",
                 #interest_capability_good_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_comments/interest_capability_good.txt",
                 #interest_capability_lack_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_comments/interest_capability_lack.txt",
                 #specificity_good_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_comments/specificity_good.txt",
                 #specificity_lack_system_prompt_path: str = "modules/modules/prompts/system/oxbridge_comments/specificity_lack.txt",
                 relevance_user_prompt_path: str = "modules/modules/prompts/user/relevance.txt",
                 ):
        
        self.relevance_good_system_prompt = self.load_prompt(relevance_good_system_prompt_path)
        #self.relevance_lack_system_prompt = self.load_prompt(relevance_lack_system_prompt_path)
        self.relevance_user_prompt = self.load_prompt(relevance_user_prompt_path)
        #self.interest_capability_good_system_prompt = self.load_prompt(interest_capability_good_system_prompt_path)
        #self.interest_capability_lack_system_prompt = self.load_prompt(interest_capability_lack_system_prompt_path)
        #self.specificity_good_system_prompt = self.load_prompt(specificity_good_system_prompt_path)
        #self.specificity_lack_system_prompt = self.load_prompt(specificity_lack_system_prompt_path)

    
    def load_prompt(self, path: str) -> str:
        with open(path, "r") as f:
            return f.read()

    def craft_comment(self, argument: ArgumentEvaluations) -> Comment:
        client = OpenAI()
        completion = None
        comment = None

        if argument.relevance.is_relevant:

            completion = client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": self.relevance_good_system_prompt.format(
                        field_of_study=argument.argument.personal_statement.field_of_study
                    )},
                    {"role": "user", "content": self.relevance_user_prompt.format(
                        is_relevant=argument.relevance.is_relevant,
                        reason=argument.relevance.reason,
                        idea=argument.argument.idea,
                        evidence=argument.argument.evidence,
                        explanation=argument.argument.explanation
                    )},
                ]
            )

        if completion:
            response_data = completion.choices[0].message.content
            
            comment = self.save_comment_to_db(response_data, argument.argument)

            return comment

    def save_comment_to_db(self, comment: str, argument: Argument) -> Comment:
        if not comment or not argument:
            raise ValueError("All fields must be provided")

        try:
            argument.personal_statement.save()
            argument.save()

            return Comment.objects.create(
                comment=comment,
                argument=argument
            )

        except Exception as e:
            raise Exception("Failed to save comment") from e


class SpecificityIdentifier:
    def __init__(self,
                 specificity_system_prompt_path: str = "modules/modules/prompts/system/specificity.txt",
                 argument_user_prompt_path: str = "modules/modules/prompts/user/argument.txt",
                 ):
        with open(specificity_system_prompt_path, "r") as f:
            self.specificity_system_prompt = f.read()

        with open(argument_user_prompt_path, "r") as f:
            self.argument_user_prompt = f.read()

    def identify_specificity(self, argument: Argument) -> str:
        client = OpenAI()
        completion = client.chat.completions.create(
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

        is_specific = re.search(
            r'Specific:\s*(.*?)(?=\s*Reason:)', response_data).group(1).strip()
        reason = re.search(r'Reason:\s*(.*)', response_data).group(1).strip()

        self.save_specificity_to_db(
            is_specific, reason, argument
        )

        return is_specific