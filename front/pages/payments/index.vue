<template>
  <div class="container mt-5 pt-4">
    <PaymentHeaderSection />
    <PaymentsTable v-if="payments.length" :payments="payments" @removePayment="handleRemovePayment" />
    <NoPaymentAlert v-else />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PaymentHeaderSection from './PaymentHeaderSection.vue'
import PaymentsTable from './PaymentsTable.vue'
import NoPaymentAlert from './NoPaymentAlert.vue'
import { getPayments, removePayment } from '@/utils/client_api_zexel'
import { useI18n } from 'vue-i18n'

const payments = ref([])
const alert = ref(null)
const { t } = useI18n()

onMounted(async () => {
  try {
    payments.value = await getPayments()
  } catch (e) {
    alert.value.error(e.message)
  }
})

const handleRemovePayment = async (id) => {
  try {
    const success = await removePayment(id)
    if (success) {
      payments.value = payments.value.filter(payment => payment.id !== id)
      alert.value.message(t('payment_removed_successfully'))
    } else {
      alert.value.error(t('failed_to_remove_payment'))
    }
  } catch (e) {
    alert.value.error(e.message)
  }
}
</script>
