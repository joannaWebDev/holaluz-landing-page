<script setup lang="ts">
import { ref } from 'vue'

import { CombinedClientSupplyPoint } from '@/types'

defineProps<{
  client: CombinedClientSupplyPoint
}>()

const borderColor = ref('#e5007e')
</script>

<template>
  <div class="wrapper">
    <div class="client-info">
      <h3>{{ client.full_name }}</h3>
      <p>
        <span :style="{ textDecoration: `underline ${borderColor}`, webkitTextDecoration: `underline ${borderColor}` }"
          >CUPS:</span
        >
        {{ client.cups }}
      </p>
      <p>Role: {{ client.role }}</p>
      <p>Address: {{ client.address }}</p>
      <p>Building Type: {{ client.building_type }}</p>

      <!-- Display supply point information if available -->
      <div v-if="client.supplyPoint">
        <p>
          <span
            :style="{ textDecoration: `underline ${borderColor}`, webkitTextDecoration: `underline ${borderColor}` }"
            >Tariff:</span
          >
          {{ client.supplyPoint.tariff }}
        </p>
        <p>Invoiced Amount: {{ client.supplyPoint.invoiced_amount }}</p>
        <p>Power P1: {{ client.supplyPoint.power.p1 }}</p>
        <p>Power P2: {{ client.supplyPoint.power.p2 }}</p>
      </div>
    </div>

    <!-- Display offer if available -->
    <div v-if="client.offerDetails" class="client-offer">
      <p>
        <span :style="{ textDecoration: `underline ${borderColor}`, webkitTextDecoration: `underline ${borderColor}` }"
          >Offer Type:</span
        >{{ client.offerDetails.offerType }}
      </p>
      <p v-if="client.offerDetails.discount">
        <span :style="{ textDecoration: `underline ${borderColor}`, webkitTextDecoration: `underline ${borderColor}` }"
          >Discount:</span
        >{{ client.offerDetails.discount }}%
      </p>
      <div v-else class="no-discount">
        <p>
          <span
            :style="{ textDecoration: `underline ${borderColor}`, webkitTextDecoration: `underline ${borderColor}` }"
            >Discount:</span
          >
          Not available.
        </p>
        <p>
          Contact us for more details:<br /><strong><a href="tel:+34900 67 07 07">900 67 07 07</a></strong> <br /><i
            >(from 9:00 to 20:00 from Monday to Fridays)</i
          >
        </p>
      </div>
    </div>

    <div v-else-if="client.offerDetails === null" class="no-offer-details">
      <p>Offer details are not available for this client.</p>
    </div>
    <div v-else>
      <p>No current offers available.</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  margin: 2rem auto;
  max-width: 60vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 10px;

  .client-info {
    border: 1px solid #d4d7db;
    padding: 1rem;
    border-radius: 8px;
    width: 90%;

    h3 {
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0.5rem 0;
    }
  }

  .client-offer {
    border: 1px solid #d4d7db;
    padding: 1rem;
    border-radius: 8px;
    width: 90%;

    .no-discount {
      strong {
        color: #e5007e;
        font-size: 24px;
      }
    }
  }

  .no-offer-details {
    border: 1px solid #d4d7db;
    padding: 1rem;
    border-radius: 8px;
    width: 90%;
  }
}

@media (min-width: 769px) {
  .wrapper {
    flex-direction: row;

    .client-info,
    .client-offer,
    .no-offer-details {
      width: 40%;
    }
  }
}
</style>
