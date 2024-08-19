<template>
    <div class="alert alert-info">
      {{ $t('no_payments') }}
    </div>
  </template>
  
  <script setup>
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  </script>
  