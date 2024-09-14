from modules.models import Argument, Comment


class CommentCrafter:
    def craft_comment(self, argument: Argument) -> Comment:
        """
        Crafts a comment for an argument.
        Writes the result to database.
        """
