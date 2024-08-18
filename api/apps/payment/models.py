from django.db import models
import uuid
from django.core.validators import MinValueValidator

from apps.payment.constants import CURRENCY_CHOICES, COUNTRY_CHOICES, STATUS_CHOICES


class Payment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0,
                                        validators=[MinValueValidator(0, "Amount must be positive")])
    source_currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES)
    source_country = models.CharField(max_length=2, choices=COUNTRY_CHOICES)
    target_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    target_currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES)
    target_country = models.CharField(max_length=2, choices=COUNTRY_CHOICES)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES,
                              default='Draft')
    concept = models.CharField(max_length=255, null=True, blank=True)
    rate_exchange = models.DecimalField(max_digits=10, decimal_places=6, default=0)
    sender_full_name = models.CharField(max_length=100, default='')
    receiver_full_name = models.CharField(max_length=100, default='')

    def __str__(self):
        return f"{self.source_amount} {self.source_currency} to {self.target_amount} {self.target_currency}"
