from django.core.validators import MinValueValidator
from rest_framework import serializers
from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

    # POSITIVE_AMOUNT_VALIDATION - OPTION 1: Validate through extra_kwargs. It might not be the best option since
    # the validations in extra_kwargs don't behave always as they do in the model.
    # extra_kwargs = {
    #   'source_amount': { 'validators': [MinValueValidator(0, "Amount must be positive")] }
    # }

    # POSITIVE_AMOUNT_VALIDATION - OPTION 2:
    def validate_source_amount(self, value):  # This validator prevents the wrong data to be added through the API
        if value <= 0:
            raise serializers.ValidationError("Amount must be positive")
        return value
