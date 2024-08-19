<template>
  <div class="container mt-5 pt-4">
    <h1 class="display-4 mt-2 mb-4">{{ $t('payments') }}</h1>

    <div class="app-description-container text-center mb-5">
      <h2 class="mb-3">{{ $t('app_description') }}</h2>
      <div class="divider"></div>
    </div>

    <PaymentForm :mode="formMode" :initialPayment="payment" @submit="handleSubmit" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PaymentForm from './PaymentForm.vue';
import { fireAlert } from '~/ts/fireAlert'

const formMode = ref('add')

const payment = ref({
  source_amount: null,
  source_currency: '',
  source_country: '',
  target_amount: null,
  target_currency: '',
  target_country: '',
  concept: '',
  sender_full_name: '',
  receiver_full_name: ''
})

const handleSubmit = async (paymentData) => {
  try {
    const endpoint = formMode.value === 'add' ? 'http://localhost:8000/api/payments/' : `http://localhost:8000/api/payments/${paymentData.id}/`;
    const method = formMode.value === 'add' ? 'POST' : 'PUT';
  
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData?.source_amount?.[0] || 'Failed to process payment';
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('Payment processed:', result);

    fireAlert({ text: 'Payment processed successfully', icon: 'success' })

    resetPaymentValue();

  } catch (error) {
    fireAlert({
      title: 'Failed to process payment',
      text: error.message,
      icon: 'error',
      showCancelButton: false,
      position: 'top-end'
    });
  }
}

function resetPaymentValue() {
  payment.value = {
    source_amount: null,
    source_currency: '',
    source_country: '',
    target_amount: null,
    target_currency: '',
    target_country: '',
    concept: '',
    sender_full_name: '',
    receiver_full_name: ''
  }
}
</script>
