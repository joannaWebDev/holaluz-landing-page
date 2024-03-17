<script setup lang="ts">
import { ref } from 'vue'

const navActive = ref<boolean>(false)

const routes = [
  { path: '/tarifa', name: 'Tarifa de Luz' },
  { path: '/placas', name: 'Placas solares' },
  { path: '/empresas', name: 'Empresas' },
  { path: '/productores', name: 'Productores' },
  { path: '/blog', name: 'Blog' }
]

function toggleNav() {
  navActive.value = !navActive.value
}
</script>

<template>
  <header>
    <div class="header">
      <div class="navigation">
        <a aria-current="page" href="/" target="_blank" class="logo">
          <img
            src="https://assets.holaluz.com/logos/logo-gradient.svg"
            width="112"
            height="26"
            alt="Holaluz logo"
            title="Holaluz"
          />
        </a>

        <button @click="toggleNav" class="hamburger" :class="{ 'is-active': navActive }" aria-label="Toggle navigation">
          &#9776;
        </button>

        <nav class="pages" :class="{ 'is-active': navActive }">
          <router-link v-for="route in routes" :key="route.path" :to="route.path">{{ route.name }}</router-link>
        </nav>
      </div>

      <div class="energia">
        <a href="">
          <img src="../assets/energia-verde.svg" alt="Energía verde" width="125" />
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  border-bottom: 1px solid #d4d7db;
  background-color: #fff;
  padding: 10px 0;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  width: 100%;

  .navigation {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    position: relative;

    & > * :hover {
      color: #e5007e;
    }

    .logo {
      order: 2;
    }

    .hamburger {
      order: 1;
      background: #fff;
      color: #e5007e;
      cursor: pointer;
      border: none;
      font-size: 24px;
      transition: transform 0.5s ease;
      display: block;
      padding: 0;
    }

    .pages {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: #fff;
      gap: 10px;
      margin-top: 12px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      z-index: 1;

      &.is-active {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .energia {
    justify-self: end;
  }
}

@media (min-width: 669px) {
  .header {
    .navigation {
      .logo {
        order: 1;
        margin-right: 10px;
      }

      .hamburger {
        display: none;
      }

      .pages {
        display: flex;
        flex-direction: row;
        position: relative;
        padding: 0;
        box-shadow: none;
        background-color: transparent;
        margin-top: 0;
        justify-content: flex-start;
        justify-self: flex-start;
        align-self: flex-start;
        order: 2;
        top: 0;
      }
    }
  }
}
</style>
