<script setup>
import CameraMan from '../components/CameraMan.vue'
</script>

<template>
  <header>
    <img alt="Dotch logo" src="../assets/logo.svg" />
  </header>
  <main>
    <CameraMan />
  </main>
  <footer>
    <div id="default">
      <div><a href="#">About</a></div>
      <div class="divider"></div>
      <div><a href="#">Help</a></div>
    </div>
    <div id="about">
      <button>Close</button>
    </div>
  </footer>
</template>
