from modules.models import Argument, Relevance


class RelevanceIdentifier:
    def identify_relevance(self, argument: Argument) -> Relevance:
        """
        Identifies the relevance of an argument.
        Writes the result to database.
        """
