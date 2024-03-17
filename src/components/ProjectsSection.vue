<script setup lang="ts">
import { ref } from 'vue'

import projectOneImg from '@/assets/projectOne.jpeg'
import projectThreeImg from '@/assets/projectThree.jpeg'
import projectTwoImg from '@/assets/projectTwo.jpeg'

const projects = ref([
  {
    title: 'Project 1',
    img: projectOneImg,
    cta: 'View Project'
  },
  {
    title: 'Project 2',
    img: projectTwoImg,
    cta: 'View Project'
  },
  {
    title: 'Project 3',
    img: projectThreeImg,
    cta: 'View Project'
  }
])
</script>

<template>
  <div class="projects-section">
    <h2>Projects</h2>
    <p>Holaluz is the owner of the following projects:</p>

    <ul class="projects">
      <li v-for="(project, index) in projects" :key="index">
        <img :src="project.img" :alt="project.title" />
        <h3>{{ project.title.toUpperCase() }}</h3>
        <button>{{ project.cta }}<span></span></button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.projects-section {
  text-align: center;

  .projects {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;

    li {
      display: flex;
      flex-direction: column;
      margin: 1rem;

      img {
        width: 280px;
        height: auto;
        border-radius: 10px;
      }

      button {
        border-color: #e5007e;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 250px;
        margin: 0 auto;

        span {
          display: inline-block;
          background-image: url('../assets/arrow.svg');
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          width: 16px;
          height: 16px;
        }
      }
    }
  }
}

@media (min-width: 769px) {
  .projects-section {
    .projects {
      flex-direction: row;
      justify-content: space-evenly;

      li {
        img {
          width: 450px;
        }
      }
    }
  }
}
</style>
