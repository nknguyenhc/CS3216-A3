from modules.models import Argument, ContributionToCommunity
from openai import OpenAI
import logging
import json


class ContributionToCommunityIdentifier:
    def __init__(self,
                 contribution_to_community_prompt_path: str = "modules/modules/prompts/system/community.txt",
                 contribution_to_community_user_prompt_path: str = "modules/modules/prompts/user/argument.txt",
                 ):
        with open(contribution_to_community_prompt_path, "r") as f:
            self.contribution_to_community_prompt = f.read()

        with open(contribution_to_community_user_prompt_path, "r") as f:
            self.contribution_to_community_user_prompt = f.read()

        self.logger = logging.getLogger("ContributionToCommunityIdentifier")

    def identify_contribution_to_community(self, argument: Argument) -> ContributionToCommunity | None:
        """
        Identifies the contribution to community of the student from an argument.
        Writes the result to database.
        """
        try:
            contribution_to_community_result = self._identify_contribution_to_community(
                argument)
            (
                has_contribution_to_community,
                reason_has_contribution_to_community,
                will_contribute_to_community,
                reason_will_contribute_to_community
            ) = self._parse_result(
                contribution_to_community_result)
        except Exception as e:
            self.logger.exception(
                "Failed to identify contribution to community")
            return None

        try:
            contribution_to_community = ContributionToCommunity.objects.create(
                argument=argument,
                has_contribution_to_community=has_contribution_to_community,
                reason_has_contribution_to_community=reason_has_contribution_to_community,
                will_contribute_to_community=will_contribute_to_community,
                reason_will_contribute_to_community=reason_will_contribute_to_community,
            )
            return contribution_to_community
        except Exception as e:
            self.logger.exception("Failed to save contribution to community")
            return None

    def _identify_contribution_to_community(self, argument: Argument) -> str:
        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": self.contribution_to_community_prompt.format(
                    field_of_study=argument.personal_statement.field_of_study
                )},
                {"role": "user", "content": self.contribution_to_community_user_prompt.format(
                    idea=argument.idea,
                    evidence=argument.evidence,
                    explanation=argument.explanation,
                )},
            ]
        )
        return completion.choices[0].message.content

    def _parse_result(self, result: str) -> tuple[bool, str, bool, str]:
        result = result.strip("`json ")
        result_dict = json.loads(result)
        self.logger.debug(f"{result_dict=}")
        self._validate_result(result_dict)
        return (
            result_dict["has_contribution_to_community"],
            result_dict["reason_has_contribution_to_community"],
            result_dict["will_contribute_to_community"],
            result_dict["reason_will_contribute_to_community"],
        )

    def _validate_result(self, result: dict):
        if not isinstance(result, dict):
            raise ValueError("Result must be a dictionary")
        if "has_contribution_to_community" not in result:
            raise ValueError(
                "Result must contain 'has_contribution_to_community'")
        if not isinstance(result["has_contribution_to_community"], bool):
            raise ValueError(
                "'has_contribution_to_community' must be a boolean")
        if "reason_has_contribution_to_community" not in result:
            raise ValueError(
                "Result must contain 'reason_has_contribution_to_community'")
        if not isinstance(result["reason_has_contribution_to_community"], str):
            raise ValueError(
                "'reason_has_contribution_to_community' must be a string")
        if "will_contribute_to_community" not in result:
            raise ValueError(
                "Result must contain 'will_contribute_to_community'")
        if not isinstance(result["will_contribute_to_community"], bool):
            raise ValueError(
                "'will_contribute_to_community' must be a boolean")
        if "reason_will_contribute_to_community" not in result:
            raise ValueError(
                "Result must contain 'reason_will_contribute_to_community'")
        if not isinstance(result["reason_will_contribute_to_community"], str):
            raise ValueError(
                "'reason_will_contribute_to_community' must be a string")
