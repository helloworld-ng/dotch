<script setup>
import ScanReceipt from '../components/ScanReceipt.vue'
</script>

<template>
  <div id="home">
    <nav>
      <img alt="Dotch logo" src="../assets/logo.svg" />
    </nav>
    <main>
      <Transition name="fade" mode="out-in">
        <div id="scan" v-if="!aboutVisible">
          <ScanReceipt />
        </div>
        <div id="about" v-else>
          Dotch is an app for <br> scanning receipts.
        </div>
    </Transition>
    </main>
    <footer>
      <Transition name="slide-up" mode="out-in">
        <div id="nav" v-if="!aboutVisible">
          <a @click="toggleAbout">About</a>
          <div class="divider"></div>
          <a href="mailto:dotch.app@gmail.com?subject=Help">Help</a>
        </div>
        <div id="closeAbout" v-else>
          <button @click="toggleAbout">Close</button>
        </div>
      </Transition>
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
    overflow: hidden;
  }
  nav {
    z-index: 100;
  }
  main {
    flex: 1;
    display: flex;
    justify-content: center;
    place-items: center;
  }
  #about {
    padding: 24px 36px;
    text-align: center;
  }
  footer {
    height: 60px;
    margin: 24px 0;
  }
  #nav, #closeAbout {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  footer a {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-text-mute);
  }
  .divider {
    flex: inherit;
    width: 1px;
    height: 100%;
    background-color: var(--color-border);
  }
</style>