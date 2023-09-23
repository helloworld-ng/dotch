<script setup>
import CameraMan from '../components/CameraMan.vue'
</script>

<template>
  <div id="home">
    <header>
      <img alt="Dotch logo" src="../assets/logo.svg" />
    </header>
    <main>
      <CameraMan v-if="!aboutVisible" />
      <div v-else>
        Dotch is an app for scanning recipts.
      </div>
    </main>
    <footer>
      <div id="default" v-if="!aboutVisible">
        <a @click="toggleAbout">About</a>
        <div class="divider"></div>
        <a href="mailto:dotch.app@gmail.com?subject=Help">Help</a>
      </div>
      <div id="about" v-else>
        <button @click="toggleAbout">Close</button>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aboutVisible: false
    };
  },
  methods: {
    toggleAbout() {
      this.aboutVisible = !this.aboutVisible;
    }
  }
};
</script>

<style scoped>
  #home {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  main {
    flex: 1;
    display: flex;
    justify-content: center;
    place-items: center;
  }
  footer {
    height: 60px;
    margin: 24px 0;
  }
  footer > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  footer > div > a {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .divider {
    flex: inherit;
    width: 1px;
    height: 100%;
    background-color: var(--color-border);
  }
</style>