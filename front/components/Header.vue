<template>
  <nav class="sticky top-0 text-center bg-[var(--zexel-success)] text-[var(--zexel-pure-white)] h-[4rem] py-4 flex justify-between items-center px-6">
    <!-- Logo and Title -->
    <router-link to="/" class="block">
      <div class="max-w-[2rem] flex items-end gap-2 cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-110">
        <img src="/img/mint_white.svg" alt="Mint Logo" class="w-8 h-8">
        <h1 class="font-bold text-[var(--zexel-pure-white)] text-xl hidden sm:block">PAYPPERMINT</h1>
      </div>
    </router-link>
    
    <div class="menu text-[var(--zexel-pure-white)] flex gap-4 items-center relative z-50">
      <!-- Payments Dropdown -->
      <div class="relative">
        <button @click="togglePaymentsDropdown" class="transform transition-transform duration-500 ease-in-out hover:scale-110">
          <div class="m-0 text-sm sm:text-base text-[var(--zexel-pure-white)]">{{ $t('payments') }}</div>
        </button>
        <div v-if="paymentsDropdownOpen" class="absolute top-full right-0 bg-[var(--zexel-pure-white)] text-[var(--zexel-success)] rounded shadow-lg mt-2 w-40 z-50">
          <NuxtLink to="/payments" class="block px-4 py-2 hover:bg-[var(--zexel-success)] hover:text-[var(--zexel-pure-white)]">
            {{ $t('list_payments') }}
          </NuxtLink>
          <NuxtLink to="/payments/add" class="block px-4 py-2 hover:bg-[var(--zexel-success)] hover:text-[var(--zexel-pure-white)]">
            {{ $t('add_payments') }}
          </NuxtLink>
        </div>
      </div>
      
      <!-- Countries Dropdown -->
      <div class="relative">
        <button @click="toggleCountriesDropdown" class="transform transition-transform duration-500 ease-in-out hover:scale-110">
          <div class="m-0 text-sm sm:text-base text-[var(--zexel-pure-white)]">{{ $t('countries') }}</div>
        </button>
        <div v-if="countriesDropdownOpen" class="absolute top-full right-0 bg-[var(--zexel-pure-white)] text-[var(--zexel-success)] rounded shadow-lg mt-2 w-40 z-50">
          <NuxtLink to="/countries" class="block px-4 py-2 hover:bg-[var(--zexel-success)] hover:text-[var(--zexel-pure-white)]">
            {{ $t('countries_list') }}
          </NuxtLink>
          <NuxtLink to="/countries/search" class="block px-4 py-2 hover:bg-[var(--zexel-success)] hover:text-[var(--zexel-pure-white)]">
            {{ $t('search_country') }}
          </NuxtLink>
          <NuxtLink to="/countries/detail" class="block px-4 py-2 hover:bg-[var(--zexel-success)] hover:text-[var(--zexel-pure-white)]">
            {{ $t('detail_country') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const paymentsDropdownOpen = ref(false);
const countriesDropdownOpen = ref(false);

const togglePaymentsDropdown = () => {
  paymentsDropdownOpen.value = !paymentsDropdownOpen.value;
  countriesDropdownOpen.value = false;
};

const toggleCountriesDropdown = () => {
  countriesDropdownOpen.value = !countriesDropdownOpen.value;
  paymentsDropdownOpen.value = false;
};
</script>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      dropdownOpen: false
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    }
  }
}
</script>
  