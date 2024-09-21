from modules.models import JardineArgumentEvaluations, Comment
from openai import OpenAI
import logging


class JardineCommentCrafter:
    def __init__(self,
                 bad_comment_prompt_path: str = "modules/modules/prompts/system/jardine_comments/show_one.txt",
                 improve_specificity_prompt_path: str = "modules/modules/prompts/system/jardine_comments/show_details.txt",
                 good_comment_prompt_path: str = "modules/modules/prompts/system/jardine_comments/good.txt",
                 argument_prompt_path: str = "modules/modules/prompts/user/argument.txt",
                 ):
        with open(bad_comment_prompt_path, "r") as f:
            self.bad_comment_prompt = f.read()

        with open(improve_specificity_prompt_path, "r") as f:
            self.improve_specificity_prompt = f.read()

        with open(good_comment_prompt_path, "r") as f:
            self.good_comment_prompt = f.read()

        with open(argument_prompt_path, "r") as f:
            self.argument_prompt = f.read()

        self.logger = logging.getLogger("JardineCommentCrafter")

    def craft_comment(self, argument: JardineArgumentEvaluations) -> Comment:
        try:
            if self._is_bad_argument(argument):
                return self._craft_bad_comment(argument)
            elif not self._is_argument_specific(argument):
                return self._craft_comment_improve_specificity(argument)
            else:
                return self._craft_good_comment(argument)
        except Exception as e:
            self.logger.exception("Failed to craft comment")
            return None

    def _is_bad_argument(self, argument: JardineArgumentEvaluations) -> bool:
        return not argument.capability.is_capable \
            and not argument.contribution_to_community.has_contribution_to_community \
            and not argument.contribution_to_community.will_contribute_to_community \
            and not argument.leadership.has_leadership \
            and not argument.aspiration.has_aspiration

    def _is_argument_specific(self, argument: JardineArgumentEvaluations) -> bool:
        return argument.specificity.is_specific

    def _craft_bad_comment(self, argument: JardineArgumentEvaluations) -> Comment:
        self.logger.info("Crafting bad comment")
        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": self.bad_comment_prompt.format(
                    field_of_study=argument.argument.personal_statement.field_of_study,
                    no_capability_reason=argument.capability.is_capable_reason,
                    no_aspiration_reason=argument.aspiration.reason_has_aspiration,
                    no_leadership_reason=argument.leadership.reason_has_leadership,
                    no_contribution_to_community_reason=argument.contribution_to_community.reason_has_contribution_to_community,
                    no_potential_to_contribute_to_community_reason=argument.contribution_to_community.reason_will_contribute_to_community,
                )},
                {"role": "user", "content": self.argument_prompt.format(
                    idea=argument.argument.idea,
                    evidence=argument.argument.evidence,
                    explanation=argument.argument.explanation,
                )},
            ],
        )
        return Comment.objects.create(comment=completion.choices[0].message.content, is_good=False)

    def _craft_comment_improve_specificity(self, argument: JardineArgumentEvaluations) -> Comment:
        self.logger.info("Crafting comment to improve specificity")
        client = OpenAI()
        reasons = ""
        if argument.capability.is_capable:
            reasons += f"\n<capability_reason>{argument.capability.is_capable_reason}</capability_reason>\n"
        if argument.aspiration.has_aspiration:
            reasons += f"\n<aspiration_reason>{argument.aspiration.reason_has_aspiration}</aspiration_reason>\n"
        if argument.leadership.has_leadership:
            reasons += f"\n<leadership_reason>{argument.leadership.reason_has_leadership}</leadership_reason>\n"
        if argument.contribution_to_community.has_contribution_to_community:
            reasons += f"\n<contribution_to_community_reason>{argument.contribution_to_community.reason_has_contribution_to_community}</contribution_to_community_reason>\n"
        if argument.contribution_to_community.will_contribute_to_community:
            reasons += f"\n<potential_to_contribute_to_community_reason>{argument.contribution_to_community.reason_will_contribute_to_community}</potential_to_contribute_to_community_reason>\n"

        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": self.improve_specificity_prompt.format(
                    field_of_study=argument.argument.personal_statement.field_of_study,
                    reasons=reasons,
                    no_specificity_reason=argument.specificity.reason,
                )},
                {"role": "user", "content": self.argument_prompt.format(
                    idea=argument.argument.idea,
                    evidence=argument.argument.evidence,
                    explanation=argument.argument.explanation,
                )},
            ]
        )
        return Comment.objects.create(comment=completion.choices[0].message.content, is_good=False)

    def _craft_good_comment(self, argument: JardineArgumentEvaluations) -> Comment:
        self.logger.info("Crafting good comment")
        client = OpenAI()
        system_message = self.good_comment_prompt
        if argument.capability.is_capable:
            system_message += f"\n<capability_reason>{argument.capability.is_capable_reason}</capability_reason>\n"
        if argument.aspiration.has_aspiration:
            system_message += f"\n<aspiration_reason>{argument.aspiration.reason_has_aspiration}</aspiration_reason>\n"
        if argument.leadership.has_leadership:
            system_message += f"\n<leadership_reason>{argument.leadership.reason_has_leadership}</leadership_reason>\n"
        if argument.contribution_to_community.has_contribution_to_community:
            system_message += f"\n<contribution_to_community_reason>{argument.contribution_to_community.reason_has_contribution_to_community}</contribution_to_community_reason>\n"
        if argument.contribution_to_community.will_contribute_to_community:
            system_message += f"\n<potential_to_contribute_to_community_reason>{argument.contribution_to_community.reason_will_contribute_to_community}</potential_to_contribute_to_community_reason>\n"

        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": self.argument_prompt.format(
                    idea=argument.argument.idea,
                    evidence=argument.argument.evidence,
                    explanation=argument.argument.explanation,
                )},
            ]
        )
        return Comment.objects.create(comment=completion.choices[0].message.content, is_good=True)
