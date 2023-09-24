<script setup>
import ScanReceipt from '../components/ScanReceipt.vue'
</script>

<template>
  <div id="home">
    <nav>
      <img alt="Dotch logo" src="../assets/logo.svg" />
    </nav>
    <main>
      <Transition name="fade" mode="out-in" appear>
        <div id="scan" v-if="!aboutVisible">
          <ScanReceipt />
        </div>
        <div id="about" v-else>
          <div id="copy">
            <h4>An app for your receipts</h4>
            <p>Dotch lets you digitise and <br> share your purchases. </p>
          </div>
          <ul id="features">
            <li>Scan receipts with AI</li>
            <li>Select and count items</li>
            <li>Share link with anyone</li>
          </ul>
        </div>
    </Transition>
    </main>
    <footer>
      <Transition name="slide-up" mode="out-in" appear>
        <div id="nav" v-if="!aboutVisible">
          <a @click="toggleAbout">About</a>
          <div class="divider"></div>
          <a href="mailto:dotch.app@gmail.com?subject=Help">Help</a>
        </div>
        <div id="closeAbout" v-else>
          <a @click="toggleAbout">Close</a>
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
  #about ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
  }
  #about li {
    border: solid 1px #7b7fa5;
    box-shadow: 0 2px 3px rgba(0,0,0,0.2);
    padding: 12px 16px;
    border-radius: 36px;
    font-size: 18px;
    color: #7b7fa5;
  }
  #about h4 {
    font-size: 18px;
  }
  #copy {
    margin-bottom: 24px;
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