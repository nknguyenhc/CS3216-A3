from django.db import models
import json


class PersonalStatement(models.Model):
    field_of_study = models.TextField()
    essay = models.TextField()
    reparagraphed_essay = models.TextField(null=True)

    def __str__(self):
        return json.dumps({
            "field_of_study": self.field_of_study,
            "essay": self.essay,
            "reparagraphed_essay": self.reparagraphed_essay,
        }, indent=4)

    def __repr__(self):
        return self.__str__()


class Argument(models.Model):
    idea = models.TextField()
    evidence = models.TextField(null=True)
    explanation = models.TextField(null=True)
    personal_statement = models.ForeignKey(
        PersonalStatement, on_delete=models.CASCADE)

    def __str__(self):
        return json.dumps({
            "idea": self.idea,
            "evidence": self.evidence,
            "explanation": self.explanation,
        }, indent=4)

    def __repr__(self):
        return self.__str__()


class Specificity(models.Model):
    is_specific = models.BooleanField()
    reason = models.TextField()
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)

    def __str__(self):
        return json.dumps({
            "is_specific": self.is_specific,
            "reason": self.reason,
        }, indent=4)

    def __repr__(self):
        return self.__str__()


class Relevance(models.Model):
    is_relevant = models.BooleanField()
    reason = models.TextField()
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)

    def __str__(self):
        return json.dumps({
            "is_relevant": self.is_relevant,
            "reason": self.reason,
        }, indent=4)

    def __repr__(self):
        return self.__str__()


class Interest(models.Model):
    has_interest = models.BooleanField()
    has_interest_reason = models.TextField()
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)

    def __str__(self):
        return json.dumps({
            "has_interest": self.has_interest,
            "has_interest_reason": self.has_interest_reason,
        }, indent=4)

    def __repr__(self):
        return self.__str__()


class Capability(models.Model):
    is_capable = models.BooleanField()
    is_capable_reason = models.TextField()
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)

    def __str__(self):
        return json.dumps({
            "is_capable": self.is_capable,
            "is_capable_reason": self.is_capable_reason,
        }, indent=4)

    def __repr__(self):
        return self.__str__()


class ContributionToCommunity(models.Model):
    has_contribution_to_community = models.BooleanField()
    reason_has_contribution_to_community = models.TextField()
    will_contribute_to_community = models.BooleanField()
    reason_will_contribute_to_community = models.TextField()
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)

    def __str__(self):
        return json.dumps({
            "has_contribution_to_community": self.has_contribution_to_community,
            "reason_has_contribution_to_community": self.reason_has_contribution_to_community,
            "will_contribute_to_community": self.will_contribute_to_community,
            "reason_will_contribute_to_community": self.reason_will_contribute_to_community,
        }, indent=4)

    def __repr__(self):
        return self.__str__()


class Aspiration(models.Model):
    has_aspiration = models.BooleanField()
    reason_has_aspiration = models.TextField()
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)

    def __str__(self):
        return json.dumps({
            "has_aspiration": self.has_aspiration,
            "reason_has_aspiration": self.reason_has_aspiration,
        }, indent=4)

    def __repr__(self):
        return self.__str__()


class Leadership(models.Model):
    has_leadership = models.BooleanField()
    reason_has_leadership = models.TextField()
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)

    def __str__(self):
        return json.dumps({
            "has_leadership": self.has_leadership,
            "reason_has_leadership": self.reason_has_leadership,
        }, indent=4)

    def __repr__(self):
        return self.__str__()


class Comment(models.Model):
    comment = models.TextField()
    is_good = models.BooleanField()
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)

    def __str__(self):
        return json.dumps({
            "comment": self.comment,
            "is_good": self.is_good,
        }, indent=4)

    def __repr__(self):
        return self.__str__()


class ArgumentEvaluations(models.Model):
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)
    specificity = models.ForeignKey(Specificity, on_delete=models.CASCADE)
    relevance = models.ForeignKey(Relevance, on_delete=models.CASCADE)
    interest = models.ForeignKey(Interest, on_delete=models.CASCADE)
    capability = models.ForeignKey(Capability, on_delete=models.CASCADE)

    def __str__(self):
        return json.dumps({
            "specificity": self.specificity.is_specific,
            "relevance": self.relevance.is_relevant,
            "interest": self.interest.has_interest,
            "capability": self.capability.is_capable,
        }, indent=4)

    def __repr__(self):
        return self.__str__()

    class Meta:
        managed = False


class JardineArgumentEvaluations(models.Model):
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)
    specificity = models.ForeignKey(Specificity, on_delete=models.CASCADE)
    relevance = models.ForeignKey(Relevance, on_delete=models.CASCADE)
    capability = models.ForeignKey(Capability, on_delete=models.CASCADE)
    contribution_to_community = models.ForeignKey(
        ContributionToCommunity, on_delete=models.CASCADE)
    aspiration = models.ForeignKey(Aspiration, on_delete=models.CASCADE)
    leadership = models.ForeignKey(Leadership, on_delete=models.CASCADE)

    def __str__(self):
        return json.dumps({
            "specificity": self.specificity.is_specific,
            "relevance": self.relevance.is_relevant,
            "capability": self.capability.is_capable,
            "contribution_to_community": self.contribution_to_community.has_contribution_to_community,
            "potential_to_contribute_to_community": self.contribution_to_community.will_contribute_to_community,
            "aspiration": self.aspiration.has_aspiration,
            "leadership": self.leadership.has_leadership,
        }, indent=4)

    def __repr__(self):
        return self.__str__()

    class Meta:
        managed = False


class GeneralComment(models.Model):
    comment = models.TextField()
    personal_statement = models.ForeignKey(
        PersonalStatement, on_delete=models.CASCADE)

    def __str__(self):
        return json.dumps({
            "comment": self.comment,
        }, indent=4)

    def __repr__(self):
        return self.__str__()


class UnwantedLanguage(models.Model):
    has_unwanted_language = models.BooleanField()
    has_unwanted_language_reason = models.TextField()
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)

    def __str__(self):
        return json.dumps({
            "has_unwanted_language": self.has_unwanted_language,
            "has_unwanted_language_reason": self.has_unwanted_language_reason,
        }, indent=4)

    def __repr__(self):
        return self.__str__()


class FactCheck(models.Model):
    has_fake_fact = models.BooleanField()
    has_fake_fact_reason = models.TextField()
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)

    def __str__(self):
        return json.dumps({
            "has_fake_facts": self.has_fake_fact,
            "has_fake_facts_reason": self.has_fake_fact_reason,
        }, indent=4)

    def __repr__(self):
        return self.__str__()
