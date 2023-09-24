<script setup>
import ScanReceipt from '../components/ScanReceipt.vue'
</script>

<template>
  <div class="frame">
    <nav>
      <img alt="Dotch logo" src="../assets/logo.svg" />
    </nav>
    <main>
      <Transition name="fade" appear>
      <ScanReceipt />
      </Transition>
    </main>
    <footer>
      <Transition name="slide-up" tag="footer" appear>
      <div>
        <a href="/about">About</a>
        <div class="divider"></div>
        <a href="/help">Help</a>
      </div>
      </Transition>
    </footer>
  </div>
</template>

<style scoped>
</style>