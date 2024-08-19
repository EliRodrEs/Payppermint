# from django.db.models.signals import pre_save
# from django.dispatch import receiver
# from forex_python.converter import CurrencyRates, CurrencyCodes
#
# from .models import Payment
# from .services import CurrencyConverterService
#
# from decimal import Decimal
#
#
# @receiver(pre_save, sender=Payment)
# def update_target_amount(sender, instance, **kwargs):
#     if instance.pk:
#         if instance.rate_exchange == 0 or instance.rate_exchange is None:
#             currency_rates = CurrencyRates()
#             currency_codes = CurrencyCodes()
#             currency_converter_service = CurrencyConverterService(currency_rates, currency_codes)
#             instance.rate_exchange = currency_converter_service.currency_rates.get_rate(
#                 instance.source_currency, instance.target_currency
#             )
#
#     instance.target_amount = round(instance.source_amount * Decimal(instance.rate_exchange), 2)
