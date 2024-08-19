<template>
    <div>
      <h2 class="h4 mb-3">{{ $t('main_functions') }}</h2>
      <div class="d-flex justify-content-between">
        <NuxtLink to="/payments" class="btn btn-corporate flex-fill m-2 p-2">
          <div class="h5">{{ $t('list_payments') }}</div>
        </NuxtLink>
        <NuxtLink to="/payments/add" class="btn btn-corporate flex-fill m-2 p-2">
          <div class="h5">{{ $t('add_payments') }}</div>
        </NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  </script>
  