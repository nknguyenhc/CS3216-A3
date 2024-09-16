from modules.models import PersonalStatement, ArgumentEvaluations, GeneralComment


class GeneralCommentCrafter:
    def craft_general_comment(
        self, personal_state: PersonalStatement, arguments: list[ArgumentEvaluations]
    ) -> GeneralComment:
        """
        Crafts a general comment for a personal statement.
        Writes the result to database.
        """
