from modules.models import PersonalStatement


class ReParagrapher:
    def reparagraph(self, personal_statement: PersonalStatement) -> PersonalStatement:
        """
        Reparagraph the essay in the personal statement.
        Write to database once finished.
        Return the updated object.
        """
