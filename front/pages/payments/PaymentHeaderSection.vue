<template>
    <div class="app-description-container text-center mb-5">
      <h1 class="display-4 mt-2 mb-4">{{ $t('payments') }}</h1>
      <h2 class="mb-3">{{ $t('app_description') }}</h2>
      <div class="divider"></div>
    </div>
  </template>
  
  <script setup>
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  </script>
  