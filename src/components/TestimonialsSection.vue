<script setup lang="ts">
import { ref } from 'vue'

type Testimonial = {
  name: string
  text: string
}

const testimonials = ref<Testimonial[]>([
  {
    name: 'Maria Gonzalez',
    text: "Switching to Holaluz was one of the best decisions for my home. The transition to solar energy was seamless, and I've seen significant savings on my energy bills. Their customer service is outstanding!"
  },
  {
    name: 'David Smith',
    text: "The Holaluz team made the process of installing solar panels incredibly easy. Their attention to detail and commitment to sustainability is truly commendable. I'm proud to be part of the rooftop revolution!"
  },
  {
    name: 'Liu Wei',
    text: "As someone passionate about environmental conservation, I'm thrilled with the impact my solar panels from Holaluz have had. Not only am I saving money, but I'm also contributing to a greener planet. Their team is knowledgeable and supportive every step of the way."
  }
])
</script>

<template>
  <section class="testimonials-section">
    <h2>Testimonials</h2>
    <div class="testimonials">
      <div class="testimonial" v-for="(testimonial, index) in testimonials" :key="index">
        <p>
          <q>{{ testimonial.text }}</q>
        </p>
        <p class="name">{{ testimonial.name }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.testimonials-section {
  .testimonials {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    width: 85%;

    .testimonial {
      flex: 1;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      margin: 1rem;

      p {
        font-size: 1rem;
        line-height: 1.1;
        letter-spacing: -1.5px;
        text-transform: none;
        color: rgb(55, 66, 77);
      }
      .name {
        text-decoration: underline #e5007e;
      }
    }
  }
}

@media (min-width: 769px) {
  .testimonials-section {
    .testimonials {
      flex-direction: row;
      justify-content: space-between;
      width: 100%;

      .testimonial {
        p {
          font-size: 1.5rem;
        }
      }
    }
  }
}
</style>
