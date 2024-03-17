<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')
const emit = defineEmits(['search', 'clear-error'])

const emitSearch = () => {
  emit('search', searchQuery.value)
}

const clearError = () => {
  emit('clear-error')
}
</script>

<template>
  <div class="search-wrapper">
    <h2>Check your eligibility for exclusive offers</h2>
    <div>
      <label>Write down your supply point identifier number</label>
      <div class="search">
        <input v-model="searchQuery" placeholder="Enter CUPS (supply point identifier number)" @input="clearError" />
        <button @click="emitSearch" aria-label="emit-search"><span></span></button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-wrapper {
  margin: 2rem auto;
  max-width: 60vw;

  .search {
    display: flex;
    margin-top: 0.8em;

    input {
      border: 1px solid #d4d7db;
      width: 100%;
      height: 2.8rem;
      padding: 0 8px;
      border-radius: 4px 0 0 4px;
      background-color: #fff;
    }

    button {
      padding: 0.5rem 1rem;
      border-radius: 0 8px 8px 0;
      border: 1px solid #ccc;
      background: #e5007e;
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      span {
        display: inline-block;
        background-image: url('../assets/arrow.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        width: 16px;
        height: 16px;
        filter: invert(100%);
      }
    }
  }
}
</style>
