<template>
  <div>
    <h2>{{ formTitle }}</h2>
    <form @submit.prevent="submitForm">
      <div class="row mb-3">
        <div class="col-md-4">
          <label for="sourceAmount" class="form-label">{{ $t('source_amount') }}</label>
          <input type="number" class="form-control" id="sourceAmount" v-model="payment.source_amount" required>
          <div v-if="validationErrors.source_amount" class="text-red-500 text-sm">{{ validationErrors.source_amount }}</div>
        </div>
        <div class="col-md-4">
        <label for="sourceCurrency" class="form-label">{{ $t('source_currency') }}</label>
        <select id="sourceCurrency" class="form-control" v-model="payment.source_currency" required>
          <option value="" disabled>Select currency</option>
          <option v-for="currency in currencyOptions" :key="currency.value" :value="currency.value">
            {{ currency.label }}
          </option>
        </select>
        <div v-if="validationErrors.source_currency" class="text-red-500 text-sm">{{ validationErrors.source_currency }}</div>
      </div>

      <div class="col-md-4">
        <label for="sourceCountry" class="form-label">{{ $t('source_country') }}</label>
        <select id="sourceCountry" class="form-control" v-model="payment.source_country" required>
          <option value="" disabled>Select country</option>
          <option v-for="country in countryOptions" :key="country.value" :value="country.value">
            {{ country.label }}
          </option>
        </select>
        <div v-if="validationErrors.source_country" class="text-red-500 text-sm">{{ validationErrors.source_country }}</div>
      </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-4">
          <label for="targetAmount" class="form-label">{{ $t('target_amount') }}</label>
          <input type="number" class="form-control" id="targetAmount" v-model="payment.target_amount" required>
          <div v-if="validationErrors.target_amount" class="text-red-500 text-sm">{{ validationErrors.target_amount }}</div>
        </div>
        <div class="col-md-4">
  <label for="targetCurrency" class="form-label">{{ $t('target_currency') }}</label>
  <select id="targetCurrency" class="form-control" v-model="payment.target_currency" required>
    <option value="" disabled>Select currency</option>
    <option v-for="currency in currencyOptions" :key="currency.value" :value="currency.value">
      {{ currency.label }}
    </option>
  </select>
  <div v-if="validationErrors.target_currency" class="text-red-500 text-sm">{{ validationErrors.target_currency }}</div>
</div>

<div class="col-md-4">
  <label for="targetCountry" class="form-label">{{ $t('target_country') }}</label>
  <select id="targetCountry" class="form-control" v-model="payment.target_country" required>
    <option value="" disabled>Select country</option>
    <option v-for="country in countryOptions" :key="country.value" :value="country.value">
      {{ country.label }}
    </option>
  </select>
  <div v-if="validationErrors.target_country" class="text-red-500 text-sm">{{ validationErrors.target_country }}</div>
  <div v-if="validationErrors.country_mismatch" class="text-red-500 text-sm mt-2">{{ validationErrors.country_mismatch }}</div>
</div>

      </div>
      <div class="row mb-3">
        <div class="col-md-4">
          <label for="concept" class="form-label">{{ $t('concept') }}</label>
          <input type="text" class="form-control" id="concept" v-model="payment.concept" required>
          <div v-if="validationErrors.concept" class="text-red-500 text-sm">{{ validationErrors.concept }}</div>
        </div>
        <div class="col-md-4">
          <label for="senderFullName" class="form-label">{{ $t('sender_full_name') }}</label>
          <input type="text" class="form-control" id="senderFullName" v-model="payment.sender_full_name" required>
          <div v-if="validationErrors.sender_full_name" class="text-red-500 text-sm">{{ validationErrors.sender_full_name }}</div>
        </div>
        <div class="col-md-4">
          <label for="receiverFullName" class="form-label">{{ $t('receiver_full_name') }}</label>
          <input type="text" class="form-control" id="receiverFullName" v-model="payment.receiver_full_name" required>
          <div v-if="validationErrors.receiver_full_name" class="text-red-500 text-sm">{{ validationErrors.receiver_full_name }}</div>
        </div>
      </div>

      <div id="buttonHolder">
        <button v-if="!isSendingPayment" type="submit" 
          class="btn btn-primary w-full h-12 px-4 py-2 text-lg cursor-pointer 
          bg-[var(--zexel-azure)] 
          border-[var(--zexel-azure)]
          disabled:bg-[var(--zexel-disabled)] 
          disabled:border-[var(--zexel-disabled)]"
          :disabled="!isFormValid">{{ buttonLabel }}</button>
        
        <div v-if="isSendingPayment" class="flex items-center justify-center w-full">
          <Spinner />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import Spinner from '~/components/ui/Spinner.vue';
import { validateField, validators, isValidISOCurrencyCode, isvalidISOCountryCode } from './validators'
import { countryOptions } from './validISOCountryCodes'
import { currencyOptions } from './validISOCurrencyCodes';


const props = defineProps({
  mode: {
    type: String,
    default: 'add'
  },
  initialPayment: {
    type: Object,
    default: () => ({
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
  }
})

const emit = defineEmits(['submit'])

const payment = ref({ ...props.initialPayment })
const isSendingPayment = ref(false)
const validationErrors = ref({})

const isFormValid = computed(() => {
  const fieldValues = payment.value;
  let isValid = true;
  validationErrors.value = {};

  Object.keys(fieldValues).forEach(field => {
    const value = fieldValues[field];
    const fieldValidators = validators[field];

    if (fieldValidators) {
      const isFieldValid = validateField(value, fieldValidators);

      if (!isFieldValid) {
        isValid = false;
        const message = getValidationMessage(field, value);
        if (message) {
          validationErrors.value[field] = message;
        }
      }
    }
  });


  const sourceCountry = payment.value.source_country;
  const targetCountry = payment.value.target_country;
  
  if (sourceCountry && targetCountry && sourceCountry === targetCountry) {
    isValid = false;
    validationErrors.value.country_mismatch = 'Source country must be different from target country.';
  }

  return isValid;
});

const getValidationMessage = (field, value) => {
  switch (field) {
    case 'source_amount':
    case 'target_amount':
      return value === null || value === '' ? '' : (typeof value === 'number' && value < 0 ? 'Amount must be positive.' : '');

    case 'source_currency':
    case 'target_currency':
      return value.trim() === '' ? '' : (!isValidISOCurrencyCode(value) ? 'Please, insert a correct ISO currency code.' : '');

    case 'source_country':
    case 'target_country':
      return value.trim() === '' ? '' : (!isvalidISOCountryCode(value) ? 'Please, insert a correct ISO country code.' : '');

    default:
      return '';
  }
}

const submitForm = () => {
  if (isFormValid.value) {
    emit('submit', payment.value);
  }
}

const formTitle = computed(() => props.mode === 'add' ? 'Add Payment' : 'Edit Payment')
const buttonLabel = computed(() => props.mode === 'add' ? 'Submit' : 'Update')
</script>