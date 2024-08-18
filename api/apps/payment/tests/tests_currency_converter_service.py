import unittest
from unittest.mock import MagicMock
from decimal import Decimal, InvalidOperation
from forex_python.converter import CurrencyRates, CurrencyCodes

from apps.payment.services import CurrencyConverterService


class TestCurrencyConverterService(unittest.TestCase):

    def setUp(self):
        self.mock_currency_rates = MagicMock(spec=CurrencyRates)
        self.mock_currency_codes = MagicMock(spec=CurrencyCodes)

        self.service = CurrencyConverterService(
            currency_rates=self.mock_currency_rates,
            currency_codes=self.mock_currency_codes
        )

    # TODO:: Fix this test
    # def test_converts_valid_amount(self):
    #     # Given
    #     amount = Decimal('50.0')
    #     source_currency = 'USD'
    #     target_currency = 'EUR'
    #     conversion_rate = Decimal('2.0')
    #     expected_result = round(amount * conversion_rate, 2)
    #
    #     self.mock_currency_rates.convert.return_value = float(conversion_rate)
    #
    #     result = self.service.convert_currency(amount, source_currency, target_currency)
    #
    #     self.assertEqual(result, expected_result)
    #     self.mock_currency_rates.convert.assert_called_once_with(source_currency, target_currency, amount)

    def test_convert_currency_invalid_amount_type(self):
        amount = "100"
        source_currency = 'USD'
        target_currency = 'EUR'

        with self.assertRaises(ValueError) as context:
            self.service.convert_currency(amount, source_currency, target_currency)

        self.assertEqual(str(context.exception), "Amount must be a number.")

    def test_convert_currency_invalid_currency_code_type(self):
        amount = Decimal('100.00')
        source_currency = 123
        target_currency = 'EUR'

        with self.assertRaises(ValueError) as context:
            self.service.convert_currency(amount, source_currency, target_currency)

        self.assertEqual(str(context.exception), "Currency codes must be strings.")

    def test_convert_currency_invalid_operation(self):
        amount = Decimal('100.00')
        source_currency = 'USD'
        target_currency = 'EUR'
        self.mock_currency_rates.convert.side_effect = InvalidOperation("Invalid operation")

        result = self.service.convert_currency(amount, source_currency, target_currency)

        self.assertIsNone(result)

    def test_convert_currency_general_exception(self):
        amount = Decimal('100.00')
        source_currency = 'USD'
        target_currency = 'EUR'
        self.mock_currency_rates.convert.side_effect = Exception("Some error")

        result = self.service.convert_currency(amount, source_currency, target_currency)

        self.assertIsNone(result)

    def test_get_currency_symbol_success(self):
        currency_code = 'USD'
        expected_symbol = '$'
        self.mock_currency_codes.get_symbol.return_value = expected_symbol

        result = self.service.get_currency_symbol(currency_code)

        self.mock_currency_codes.get_symbol.assert_called_once_with(currency_code)
        self.assertEqual(result, expected_symbol)

    def test_get_currency_symbol_invalid_code(self):
        def mock_get_symbol(code):
            if not isinstance(code, str) or len(code) != 3:
                return None
            return 'valid_symbol'

        self.mock_currency_codes.get_symbol.side_effect = mock_get_symbol
        currency_code = 123

        result = self.service.get_currency_symbol(currency_code)

        self.assertIsNone(result)

    def test_get_currency_symbol_general_exception(self):
        currency_code = 'USD'
        self.mock_currency_codes.get_symbol.side_effect = Exception("Some error")

        result = self.service.get_currency_symbol(currency_code)

        self.assertIsNone(result)


if __name__ == '__main__':
    unittest.main()
