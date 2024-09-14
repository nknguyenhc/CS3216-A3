from modules.models import Argument, Suitability


class SuitabilityIdentifier:
    def identify_suitability(self, argument: Argument) -> Suitability:
        """
        Identifies the suitability of an argument.
        Writes the result to database.
        """
