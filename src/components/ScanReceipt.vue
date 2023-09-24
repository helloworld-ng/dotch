<script setup>
import WebCam from '../components/WebCam.vue'
</script>

<template>
  <div id="cover" @click="openLens" :class="{'scaled': isLensCoverScaled}">
    <span v-if="!url">Tap to scan</span>
    <div v-else class="spinner"></div>
  </div>
  <div id="lens" v-if="isLensOpen">
    <WebCam @close="closeLens" @capture="scanImage"  />
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: null,
      isLensCoverScaled: false,
      isLensOpen: false,
      isLoading: false
    };
  },
  methods: {
    openLens() {
      this.isLensCoverScaled = true;
      setTimeout(() => {
        this.isLensOpen = true;
      }, 300);
    },
    closeLens() {
      this.isLensOpen = false;
      this.isLensCoverScaled = false;
    },
    scanImage(url) {
      this.url = url;
      this.closeLens();
      setTimeout(() => {
        this.isLoading = false;
        this.$router.push('/bill/123');
      }, 1000);
    }
  }
};
</script>

<style scoped>
#cover {
  cursor: pointer;
  width: 265px;
  height: 265px;
  left: 0px;
  top: 0px;
  background: var(--vt-c-black);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  place-items: center;
  transition: transform 0.3s ease-in-out;
}
#cover.scaled {
  transform: scale(3);
  color: var(--vt-c-black);
}
#lens {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
