import logging
from decimal import Decimal, InvalidOperation

from forex_python.converter import CurrencyRates, CurrencyCodes

logger = logging.getLogger(__name__)

class CurrencyConverterService:
    def __init__(self, currency_rates: CurrencyRates, currency_codes: CurrencyCodes):
        self.currency_rates = currency_rates
        self.currency_codes = currency_codes

    def convert_currency(self, amount: Decimal, source_currency: str, target_currency: str) -> Decimal:
        if not isinstance(amount, (int, float, Decimal)):
            raise ValueError("Amount must be a number.")
        if not isinstance(source_currency, str) or not isinstance(target_currency, str):
            raise ValueError("Currency codes must be strings.")

        try:
            converted_amount = self.currency_rates.convert(source_currency, target_currency, amount)
            return round(Decimal(converted_amount), 2)
        except InvalidOperation as ex:
            logger.error(f"Invalid format: {ex}")
        except Exception as ex:
            logger.error(f"Error converting currency -> {ex}")

    def get_currency_symbol(self, currency_code: str) -> str:
        try:
            return self.currency_codes.get_symbol(currency_code)
        except Exception as ex:
            logger.error(f"Error getting currency symbol -> {ex}")


# ? Singleton approach
currency_rates = CurrencyRates()
currency_codes = CurrencyCodes()
currency_converter_service = CurrencyConverterService(currency_rates, currency_codes)