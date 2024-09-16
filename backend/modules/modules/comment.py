from modules.models import ArgumentEvaluations, Comment


class CommentCrafter:
    def craft_comment(self, argument: ArgumentEvaluations) -> Comment:
        """
        Crafts a comment for an argument.
        Writes the result to database.
        """
