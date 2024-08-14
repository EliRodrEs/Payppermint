from django.core.validators import MinValueValidator
from rest_framework import serializers
from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
        extra_kwargs = {
            'source_amount': {
                'validators': [MinValueValidator(0, "Amount must be positive")]
            }
        }
