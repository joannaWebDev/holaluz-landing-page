<script setup lang="ts">
import { ref } from 'vue'

import ClientOffer from '@/components/ClientOffer.vue'
import FAQSection from '@/components/FAQSection.vue'
import PageFooter from '@/components/PageFooter.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageHero from '@/components/PageHero.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import TestimonialsSection from '@/components/TestimonialsSection.vue'

const isVisible = ref<boolean>(false)
</script>

<template>
  <PageHeader />
  <main>
    <PageHero @check-eligibility="isVisible = true" />
    <transition name="slide-fade">
      <ClientOffer v-if="isVisible" />
    </transition>
    <ProjectsSection />
    <FAQSection />
    <TestimonialsSection />
  </main>
  <PageFooter />
</template>

<style scoped lang="scss">
main {
  flex-grow: 1;

  > * {
    margin: 5rem auto;
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
