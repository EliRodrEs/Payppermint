<template>
    <div>
      <h2>{{ $t('payments_list') }}:</h2>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>{{ $t('created') }}</th>
              <th>{{ $t('concept') }}</th>
              <th>{{ $t('source_amount') }}</th>
              <th>{{ $t('source_currency') }}</th>
              <th>{{ $t('target_amount') }}</th>
              <th>{{ $t('target_currency') }}</th>
              <th>{{ $t('status') }}</th>
              <th>{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payment in payments" :key="payment.id">
              <td>{{ payment.created }}</td>
              <td>{{ payment.concept }}</td>
              <td>{{ payment.source_amount }}</td>
              <td>{{ payment.source_currency }}</td>
              <td>{{ payment.target_amount }}</td>
              <td>{{ payment.target_currency }}</td>
              <td>{{ payment.status }}</td>
              <td>
                <button @click="handleRemovePayment(payment.id)" class="btn btn-danger btn-sm">
                  {{ $t('remove') }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const props = defineProps({
    payments: Array
  })
  
  const emit = defineEmits(['removePayment'])
  const { t } = useI18n()
  
  const handleRemovePayment = (id) => {
    emit('removePayment', id)
  }
  </script>
  