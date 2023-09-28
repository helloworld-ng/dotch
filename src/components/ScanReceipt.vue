<script setup>
import WebCam from '../components/WebCam.vue'
import axios from 'axios'
</script>

<template>
  <div id="cover" @click="openLens" :class="{'scaled': isLensCoverScaled}">
    <span v-if="!file">Tap to scan</span>
    <div v-else class="spinner"></div>
  </div>
  <div id="lens" v-if="isLensOpen">
    <WebCam @close="closeLens" @capture="onImageCapture"  />
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
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
    async onImageCapture(file) {
      this.file = file;
      this.closeLens();
      let formData = new FormData();
      formData.append('file', this.file);
      try {
        const response = await axios.post(
          'https://dotch.glitch.me/scan',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log(response);
        this.$router.push(`/receipt/${response.id}`);
      } catch (error) {
        this.openLens();
        console.error(error);
      }
    },
  },
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
