<script setup lang="ts">
import { ref } from 'vue'

import facebookIcon from '@/assets/facebook.svg'
import instagramIcon from '@/assets/instagram.svg'
import linkedinIcon from '@/assets/linkedin.svg'

const currentYear = new Date().getFullYear()
const subPages = [
  { name: 'Aviso legal', url: '/' },
  { name: 'Privacidad', url: '/' },
  { name: 'CCGG de Contratación', url: '/' },
  { name: 'Cookies', url: '/' },
  { name: 'Politica de calidad', url: '/' },
  { name: 'Canal de denuncias', url: '/' },
  { name: 'Politica de seguridad', url: '/' }
]

const socialMedia = ref([
  { name: 'facebook', url: '/', img: facebookIcon },
  { name: 'instagram', url: '/', img: instagramIcon },
  { name: 'linkedin', url: '/', img: linkedinIcon }
])
</script>

<template>
  <footer>
    <p>HOLALUZ-CLIDOM, S.A. © {{ currentYear }}</p>
    <ul>
      <li v-for="page in subPages" :key="page.name">
        <a :href="page.url">{{ page.name }}</a>
      </li>
    </ul>

    <ul class="social-media">
      <li v-for="media in socialMedia" :key="media.name">
        <a :href="media.url">
          <img :src="media.img" :alt="media.name" />
        </a>
      </li>
    </ul>
  </footer>
</template>

<style scoped lang="scss">
footer {
  margin-bottom: 2rem;
  padding: 1rem;
}

footer,
ul {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

ul li {
  font-size: 0.75rem;
  line-height: 1.35;
  text-align: left;
  color: rgb(101, 113, 126);
}

.social-media {
  flex-direction: row;
  gap: 10px;
}

img {
  width: 24px;
  height: 24px;
}

@media (min-width: 850px) {
  footer,
  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
