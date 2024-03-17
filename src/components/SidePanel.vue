<script setup lang="ts">
import { ref } from 'vue'

import { hasSlotContent } from '@/helpers/slots'

type Props = {
  isVisible: boolean
}

defineProps<Props>()

const emit = defineEmits(['close'])
const isClosing = ref<boolean>(false)

const close = (): void => {
  isClosing.value = true
  setTimeout(() => {
    emit('close')
    isClosing.value = true
  }, 250)
}
</script>

<template>
  <transition name="slide">
    <div v-if="isVisible" class="side-panel" data-qa="side-panel">
      <div class="wrapper" data-qa="container" :class="{ 'slide-out': isClosing }">
        <div class="header">
          <template v-if="hasSlotContent($slots.title)">
            <div class="title">
              <slot name="title" />
            </div>
          </template>

          <button type="button" data-close @click="close"><span aria-hidden="true">&times;</span></button>
        </div>

        <div class="content">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.side-panel {
  position: fixed;
  z-index: 1025;
}

.wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  overflow: hidden auto;
  width: 100%;
  height: 100%;
  flex-direction: column;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-name: slide;
  background: #fff;
  box-shadow: 0 0 25px gray;

  @media (min-width: 789px) {
    width: clamp(400px, 30%, 30%);
  }

  .header {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: flex-end;
    padding: 6px 8px;
    background: #fff;
  }

  .title {
    flex: 1;
  }

  .content {
    flex: 1;
    padding: 0 8px;
  }
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.45s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
