<template>
  <div class="container mt-5 pt-4">

    <h1 class="display-4 mt-2 mb-4">{{ $t('countries') }}</h1>

    <div class="app-description-container text-center mb-5">
      <h2 class="mb-3">{{ $t('app_description') }}</h2>
      <div class="divider"></div>
    </div>

    <div v-if="countries.length">
      <h2>{{ $t('countries_list') }}:</h2>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>{{ $t('name') }}</th>
              <th>{{ $t('iso3') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="country in countries" :key="country.iso3">
              <td>{{ country.name }}</td>
              <td>{{ country.iso3 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="alert alert-info">
      {{ $t('no_countries') }}
    </div>

  </div>
</template>

<script setup>
const countries = ref([])
const alert = ref(null)

onMounted(async () => {
  try {
    countries.value = await getCountries()
  } catch (e) {
    alert.value.error(e.message)
  }
})
</script>