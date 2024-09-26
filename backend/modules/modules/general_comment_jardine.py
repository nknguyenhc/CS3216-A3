from modules.models import PersonalStatement, JardineArgumentEvaluations, GeneralComment
from openai import OpenAI
import json
import logging


class JardineGeneralCommentCrafter:
    def __init__(self,
                 general_comment_prompt_path: str = "modules/modules/prompts/system/jardine_general_comment/general.txt",
                 verdict_path: str = "modules/modules/prompts/system/jardine_general_comment/verdicts.json",):
        with open(general_comment_prompt_path, "r") as f:
            self.general_comment_prompt = f.read()

        with open(verdict_path, "r") as f:
            self.verdicts = json.load(f)

        self.logger = logging.getLogger("JardineGeneralCommentCrafter")

    def craft_general_comment(
        self, personal_statement: PersonalStatement, arguments: list[JardineArgumentEvaluations]
    ) -> GeneralComment:
        """
        Crafts a general comment for a personal statement.
        Writes the result to database.
        """
        capability_verdict = self._get_capability_verdict(arguments)
        aspiration_verdict = self._get_aspiration_verdict(arguments)
        leadership_verdict = self._get_leadership_verdict(arguments)
        community_verdict = self._get_community_verdict(arguments)
        try:
            general_comment = self._craft_comment(
                personal_statement, capability_verdict, aspiration_verdict, leadership_verdict, community_verdict
            )
        except Exception as e:
            self.logger.exception("Failed to craft comment")
            return None

        try:
            return GeneralComment.objects.create(
                comment=general_comment,
                personal_statement=personal_statement
            )
        except Exception as e:
            self.logger.exception("Failed to save general comment to database")
            return None

    def _get_capability_verdict(self, arguments: list[JardineArgumentEvaluations]) -> str:
        for argument in arguments:
            if argument.capability.is_capable:
                return self.verdicts["capability"]["1"]
        return self.verdicts["capability"]["2"]

    def _get_aspiration_verdict(self, arguments: list[JardineArgumentEvaluations]) -> str:
        has_aspiration = False
        for argument in arguments:
            if argument.aspiration.has_aspiration:
                has_aspiration = True
                if argument.contribution_to_community.will_contribute_to_community:
                    return self.verdicts["aspiration"]["1"]
        if has_aspiration:
            return self.verdicts["aspiration"]["2"]
        else:
            return self.verdicts["aspiration"]["3"]

    def _get_leadership_verdict(self, arguments: list[JardineArgumentEvaluations]) -> str:
        leadership_count = 0
        for argument in arguments:
            if argument.leadership.has_leadership:
                leadership_count += 1
        if leadership_count >= 2:
            return self.verdicts["leadership"]["1"]
        elif leadership_count == 1:
            return self.verdicts["leadership"]["2"]
        else:
            return self.verdicts["leadership"]["3"]

    def _get_community_verdict(self, arguments: list[JardineArgumentEvaluations]) -> str:
        contribution_to_community_count = 0
        potential_to_contribute_to_community_count = 0
        contribution_to_community_related_to_study = False
        for argument in arguments:
            if argument.contribution_to_community.has_contribution_to_community:
                contribution_to_community_count += 1
                if argument.relevance.is_relevant:
                    contribution_to_community_related_to_study = True
            if argument.contribution_to_community.will_contribute_to_community:
                potential_to_contribute_to_community_count += 1
                if argument.relevance.is_relevant:
                    contribution_to_community_related_to_study = True
        if contribution_to_community_count + potential_to_contribute_to_community_count >= 3:
            if contribution_to_community_related_to_study:
                if potential_to_contribute_to_community_count >= 1:
                    return self.verdicts["community"]["1"]
                else:
                    return self.verdicts["community"]["3"]
            else:
                if potential_to_contribute_to_community_count >= 1:
                    return self.verdicts["community"]["2"]
                else:
                    return self.verdicts["community"]["4"]
        elif contribution_to_community_count + potential_to_contribute_to_community_count >= 1:
            return self.verdicts["community"]["5"]
        else:
            return self.verdicts["community"]["6"]

    def _craft_comment(
        self, personal_statement: PersonalStatement, capacity_verdict: str, aspiration_verdict: str, leadership_verdict: str, community_verdict: str
    ) -> str:
        client = OpenAI()
        system_message = self.general_comment_prompt.format(
            field_of_study=personal_statement.field_of_study,
            capability_verdict=capacity_verdict,
            aspiration_verdict=aspiration_verdict,
            leadership_verdict=leadership_verdict,
            community_verdict=community_verdict,
        )
        self.logger.debug(
            f"Crafting Jardine general comment with system message: {system_message}")
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_message},
                # {"role": "user", "content": personal_statement.reparagraphed_essay},
            ]
        )
        return completion.choices[0].message.content
