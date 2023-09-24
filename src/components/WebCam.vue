<template>
  <main>
    <video ref="camera" autoplay playsinline v-show="!isPhotoTaken"></video>
    <canvas ref="canvas" v-show="isPhotoTaken"></canvas>
    <div id="loading" v-if="isLoading">
      <div class="spinner"></div>
    </div>
    <footer>
      <button class="secondary" v-if="!isPhotoTaken" @click="closeCamera">Cancel</button>
      <button class="secondary" v-else @click="resetCamera">Retake</button>
      <Transition name="slide-up" mode="out-in">
      <button v-if="!isLoading && !isPhotoTaken" @click="capturePhoto">Capture</button>
      <button v-else-if="isPhotoTaken" class="danger" @click="completeCapture">Scan</button>
      </Transition>
    </footer>
  </main>
</template>

<script>
export default {
  data() {
    return {
      url: null,
      isLoading: true,
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
    };
  },
  created() {
    this.openCamera();
  },
  methods: {
    openCamera() {
      this.isCameraOpen = true;
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: "environment"
          },
          audio: false
        })
        .then(stream => {
          this.$refs.camera.srcObject = stream;
          this.$refs.camera.play();
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    stopCamera() {
      this.$refs.camera.pause();
      this.$refs.camera.srcObject.getTracks().forEach(track => {
        track.stop();
      });
    },
    closeCamera() {
      this.stopCamera();
      this.isCameraOpen = false;
      this.$emit('close');
    },
    capturePhoto() {
      this.$refs.canvas.width = this.$refs.camera.videoWidth;
      this.$refs.canvas.height = this.$refs.camera.videoHeight;
      this.$refs.canvas
        .getContext('2d')
        .drawImage(this.$refs.camera, 0, 0);
      this.url = this.$refs.canvas.toDataURL('image/png');
      this.isPhotoTaken = true;
      this.stopCamera();
    },
    resetCamera() {
      this.isPhotoTaken = false;
      this.openCamera();
    },
    completeCapture() {
      this.$emit('capture', this.url);
    },
  },
};
</script>

<style scoped>
main {
  width: 100%;
  height: auto;
}
video, canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
footer {
  height: 60px;
  margin: 24px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
footer button {
  flex: 1;
  height: 100%;
}
#loading {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--vt-c-black);
  z-index: 10;
}
</style>
