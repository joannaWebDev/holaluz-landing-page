<script setup lang="ts">
import { ref } from 'vue'

import ClientInfo from '@/components/ClientInfo.vue'
import SearchInput from '@/components/SearchInput.vue'
import { useClientsAndSupply } from '@/composables/useClientsAndSupply'

const { clients, searchClient } = useClientsAndSupply()

const isLoading = ref(false)
const searchError = ref('')

const isValidCups = (cups: string) => {
  // Check if CUPS is exactly 6 digits
  return /^\d{6}$/.test(cups)
}

const handleSearch = async (query: string) => {
  isLoading.value = true

  try {
    if (!isValidCups(query)) {
      searchError.value = 'Please enter a valid CUPS value consisting of 6 digits.'
      return
    }
    await searchClient(query)
    if (clients.value.length === 0) {
      searchError.value = 'No client found for the provided CUPS.'
    }
  } catch (error) {
    searchError.value = 'An error occurred during the search. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const resetState = () => {
  searchError.value = ''
  isLoading.value = false
  clients.value = []
}
</script>

<template>
  <div class="client-offer">
    <SearchInput @search="handleSearch" @clear-error="resetState" />

    <div v-if="isLoading"><p>Searching...</p></div>

    <div v-if="searchError" class="error">
      <p>{{ searchError }}</p>
    </div>
    <div v-for="client in clients" :key="client.cups" class="client">
      <ClientInfo :client="client" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.client-offer {
  margin: 2rem auto;
  max-width: 60vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .error {
    margin-left: 2rem;
    color: red;
    font-weight: bold;
  }

  .client {
    width: 100%;
  }
}
</style>
