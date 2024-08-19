<template>
  <div class="container mt-5 pt-4">
    <h1 class="display-4 mt-2 mb-4">{{ $t('edit_payment') }}</h1>

    <div class="app-description-container text-center mb-5">
      <h2 class="mb-3">{{ $t('app_description') }}</h2>
      <div class="divider"></div>
    </div>

    <div>
      <h2 class="h4 mb-3">{{ $t('edit_payment_details') }}</h2>
      <PaymentForm :mode="formMode" :initialPayment="payment" @submit="handleSubmit" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PaymentForm from './PaymentForm.vue'
import { fireAlert } from '~/ts/fireAlert'

const formMode = ref('edit')
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

const route = useRoute()

onMounted(async () => {
  const paymentId = route.params.id
  if (!paymentId) {
    fireAlert({
      title: 'Error',
      text: 'Payment ID is missing',
      icon: 'error'
    })
    return
  }

  try {
    const response = await fetch(`http://localhost:8000/api/payments/${paymentId}/`)
    if (!response.ok) {
      const errorData = await response.json()
      const errorMessage = errorData?.source_amount?.[0] || 'Failed to fetch payment details'
      throw new Error(errorMessage)
    }

    const result = await response.json()
    payment.value = result
  } catch (error) {
    fireAlert({
      title: 'Failed to fetch payment details',
      text: error.message,
      icon: 'error',
      showCancelButton: false,
      position: 'top-end'
    })
  }
})

const handleSubmit = async (paymentData) => {
  try {
    const endpoint = `http://localhost:8000/api/payments/${paymentData.id}/`
    const method = 'PUT'

    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      const errorMessage = errorData?.source_amount?.[0] || 'Failed to update payment'
      throw new Error(errorMessage)
    }

    const result = await response.json()
    console.log('Payment updated:', result)

    fireAlert({ text: 'Payment updated successfully', icon: 'success' })

  } catch (error) {
    fireAlert({
      title: 'Failed to update payment',
      text: error.message,
      icon: 'error',
      showCancelButton: false,
      position: 'top-end'
    })
  }
}
</script>
