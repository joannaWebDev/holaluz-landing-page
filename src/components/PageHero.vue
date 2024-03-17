<script setup lang="ts">
defineEmits(['check-eligibility'])
</script>

<template>
  <div class="hero-image">
    <div class="hero-text">
      <h1>Join the Rooftop Revolution with <span>Holaluz</span>!</h1>
      <p>Save on Energy Costs and Support the Environment</p>
      <button @click="$emit('check-eligibility')" aria-label="check-eligibility">Check Eligibility</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero-image {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../assets/giphy-min.gif');
  height: auto;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 1rem 0;

  .hero-text {
    text-align: center;
    color: rgb(255, 255, 255);
    max-width: 600px;
    padding: 30px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    h1 {
      font-size: 2.5rem;
      line-height: 1.05;
      letter-spacing: -1.5px;
      text-transform: none;
      color: rgb(255, 255, 255);
      text-align: center;

      span {
        text-shadow: 0 0 3px #ff0000, 0 0 5px #e5007e;
      }
    }

    p {
      font-size: 1.125rem;
      line-height: 1.35;
      text-align: center;
      color: rgb(255, 255, 255);
    }

    button {
      background: #e5007e;
      color: #fff;
    }
  }
}

@media (min-width: 769px) {
  .hero-image {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../assets/giphy-min.gif');
    height: 70vh;

    border-radius: 10px;
    margin: 2rem 0;
  }
}
</style>
