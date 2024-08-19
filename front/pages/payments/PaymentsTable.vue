<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">{{ $t('payments_list') }}:</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3 text-left text-gray-600 font-semibold">{{ $t('created') }}</th>
            <th class="px-6 py-3 text-left text-gray-600 font-semibold">{{ $t('concept') }}</th>
            <th class="px-6 py-3 text-left text-gray-600 font-semibold">{{ $t('source_amount') }}</th>
            <th class="px-6 py-3 text-left text-gray-600 font-semibold">{{ $t('source_currency') }}</th>
            <th class="px-6 py-3 text-left text-gray-600 font-semibold">{{ $t('target_amount') }}</th>
            <th class="px-6 py-3 text-left text-gray-600 font-semibold">{{ $t('target_currency') }}</th>
            <th class="px-6 py-3 text-left text-gray-600 font-semibold">{{ $t('status') }}</th>
            <th class="px-6 py-3 text-left text-gray-600 font-semibold">{{ $t('actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="payment in payments" 
            :key="payment.id" 
            :class="{'bg-blue-50': selectedPaymentId === payment.id, 'hover:bg-gray-100': selectedPaymentId !== payment.id}"
            @click="selectPayment(payment.id)"
            class="cursor-pointer"
          >
            <td class="px-6 py-4 text-gray-800">{{ payment.created }}</td>
            <td class="px-6 py-4 text-gray-800">{{ payment.concept }}</td>
            <td class="px-6 py-4 text-gray-800">{{ payment.source_amount }}</td>
            <td class="px-6 py-4 text-gray-800">{{ payment.source_currency }}</td>
            <td class="px-6 py-4 text-gray-800">{{ payment.target_amount }}</td>
            <td class="px-6 py-4 text-gray-800">{{ payment.target_currency }}</td>
            <td class="px-6 py-4 text-gray-800">{{ payment.status }}</td>
            <td class="px-6 py-4 flex space-x-2">
              <button 
                @click.stop="handleRemovePayment(payment.id)" 
                class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                {{ $t('remove') }}
              </button>
              <button 
                @click.stop="editPayment(payment.id)" 
                class="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
              >
                {{ $t('edit') }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  payments: Array
})

const emit = defineEmits(['removePayment', 'editPayment'])
const router = useRouter()
const { t } = useI18n()

const selectedPaymentId = ref(null)

const handleRemovePayment = (id) => {
  emit('removePayment', id)
}

const selectPayment = (id) => {
  selectedPaymentId.value = id
}

const editPayment = (id) => {
  emit('editPayment', id)
  router.push(`payments/edit/?id=${id}`)
}
</script>
