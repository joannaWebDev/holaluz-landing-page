<script setup lang="ts">
import { ref } from 'vue'

type FaqItem = {
  question: string
  answer: string
  open: boolean
}

const faqItems = ref<FaqItem[]>([
  {
    question: 'How do I change my tariff?',
    answer:
      'You can change your tariff by logging into your account and selecting the new tariff you would like to switch to.',
    open: false
  },
  {
    question: 'How do I change my payment method?',
    answer:
      'You can change your payment method by logging into your account and selecting the new payment method you would like to use.',
    open: false
  },
  {
    question: 'How do I change my personal information?',
    answer:
      'You can change your personal information by logging into your account and selecting the new information you would like to update.',
    open: false
  }
])

const toggleItem = (index: number) => {
  faqItems.value[index].open = !faqItems.value[index].open
}
</script>

<template>
  <section class="faq-section">
    <h2>FAQ</h2>
    <div class="faq">
      <div class="faq-item" v-for="(item, index) in faqItems" :key="index" @click="toggleItem(index)">
        <div class="title">
          <h3>
            {{ item.question }}
          </h3>
          <span class="icon">{{ item.open ? '▲' : '▼' }}</span>
        </div>
        <transition name="fade">
          <p v-if="item.open">
            {{ item.answer }}
          </p>
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq-section {
  width: 85vw;
  margin: 0 auto;
  .faq {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    gap: 1rem;
    background: radial-gradient(circle at center, #ffecb3, #f8ad83 32%, #f8b3d0 70%);
    border-radius: 0.5em;

    .faq-item {
      padding: 1rem;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-left: #e5007e;
      cursor: pointer;
      width: 85%;

      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h3 {
          margin: 0;
        }

        .icon {
          transition: all 0.3s ease;
        }
      }

      p {
        transition: all 0.3s ease;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (min-width: 769px) {
  .faq-section {
    .faq {
      padding: 2rem;
      gap: 2rem;

      .faq-item {
        padding: 1rem;
        width: 100%;
      }
    }
  }
}
</style>
