from modules.models import PersonalStatement, Argument


class IdeaExtractor:
    def extract(self, personal_statement: PersonalStatement) -> list[Argument]:
        """
        Extract ideas from the personal statement.
        Write the list of arguments to database.
        Return the list of arguments.
        """
