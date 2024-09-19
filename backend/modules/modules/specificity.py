from modules.models import Argument, Specificity

class SpecificityIdentifier:
    def __init__(self,
                 specificity_terms_system_prompt: str = "modules/modules/prompts/system/specificity-terms.txt",
                 specificity_experience_system_prompt: str = "modules/modules/prompts/system/specificity-experience.txt",
                 argument_user_prompt: str = "modules/modules/prompts/user/argument.txt",
                 ):
        with open(specificity_terms_system_prompt, "r") as f:
            self.specificity_terms_system_prompt = f.read()

        with open(specificity_experience_system_prompt, "r") as f:
            self.specificity_experience_system_prompt = f.read()

        with open(argument_user_prompt, "r") as f:
            self.argument_user_prompt_path = f.read()

    def identify_specificity_experience(self, argument: Argument) -> Specificity:
        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": self.specificity_terms_system_prompt.format(
                    field_of_study=argument.personal_statement.field_of_study
                )},
                {"role": "user", "content": self.argument_user_prompt.format(
                    idea=argument.idea,
                    evidence=argument.evidence,
                    explanation=argument.explanation,
                )},
            ]
        )

        content = completion.choices[0].message.content
        
        is_specific = content.get("isSpecific") == "T"
        reason = content.get("reason", "")

        specificity = Specificity.objects.create(
            is_specific=is_specific,
            reason=reason,
            argument=argument
        )

        return specificity
    
    def identify_specificity_terms(self, argument: Argument) -> Specificity:
        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": self.specificity_terms_system_prompt.format(
                    field_of_study=argument.personal_statement.field_of_study
                )},
                {"role": "user", "content": self.argument_user_prompt.format(
                    idea=argument.idea,
                    evidence=argument.evidence,
                    explanation=argument.explanation,
                )},
            ]
        )

        content = completion.choices[0].message.content
        
        is_specific = content.get("isSpecific") == "T"
        reason = content.get("reason", "")

        specificity = Specificity.objects.create(
            is_specific=is_specific,
            reason=reason,
            argument=argument
        )

        return specificity
