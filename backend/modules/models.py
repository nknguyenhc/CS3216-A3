from django.db import models


class PersonalStatement(models.Model):
    field_of_study = models.TextField()
    essay = models.TextField()
    reparagraphed_essay = models.TextField(null=True)


class Argument(models.Model):
    idea = models.TextField()
    evidence = models.TextField(null=True)
    explanation = models.TextField(null=True)
    personal_statement = models.ForeignKey(
        PersonalStatement, on_delete=models.CASCADE)


class Specificity(models.Model):
    is_specific = models.BooleanField()
    reason = models.TextField()
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)


class Relevance(models.Model):
    is_relevant = models.BooleanField()
    reason = models.TextField()
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)


class Suitability(models.Model):
    has_interest = models.BooleanField()
    has_interest_reason = models.TextField()
    is_capable = models.BooleanField()
    is_capable_reason = models.TextField()
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)


class Comment(models.Model):
    comment = models.TextField()
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)


class ArgumentEvaluations(models.Model):
    argument = models.ForeignKey(Argument, on_delete=models.CASCADE)
    specificity = models.ForeignKey(Specificity, on_delete=models.CASCADE)
    relevance = models.ForeignKey(Relevance, on_delete=models.CASCADE)
    suitability = models.ForeignKey(Suitability, on_delete=models.CASCADE)

    class Meta:
        managed = False


class GeneralComment(models.Model):
    comment = models.TextField()
    personal_state = models.ForeignKey(
        PersonalStatement, on_delete=models.CASCADE)
