from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Payment
from .services import CurrencyConverterService, currency_converter_service

from decimal import Decimal


@receiver(pre_save, sender=Payment)
def update_target_amount(sender, instance, **kwargs):
    if instance.pk:
        if instance.rate_exchange == 0 or instance.rate_exchange is None:
            instance.rate_exchange = currency_converter_service.currency_rates.get_rate(
                instance.source_currency, instance.target_currency
            )

    instance.target_amount = round(instance.source_amount * Decimal(instance.rate_exchange), 2)
