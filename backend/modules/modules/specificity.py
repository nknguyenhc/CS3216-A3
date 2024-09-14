from modules.models import Argument, Specificity


class SpecificityIdentifier:
    def identify_specificity(self, argument: Argument) -> Specificity:
        """
        Identifies the specificity of an argument.
        Writes the result to database.
        """
