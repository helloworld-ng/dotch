<script setup>
defineProps({})
</script>

<template>
  <div id="cover" @click="openLens" :class="{'scaled': scaleLensCover}">
    Tap to scan
  </div>
  <div id="lens" v-if="showLens">
    <main>
      <div class="spinner" v-if="loading"></div>
    </main>
    <Transition name="slide-down">
    <footer v-if="!loading">
      <button class="secondary" @click="closeLens">Cancel</button>
      <button @click="scan">Scan</button>
    </footer>
    </Transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scaleLensCover: false,
      showLens: false,
      loading: false
    };
  },
  methods: {
    openLens() {
      this.scaleLensCover = true;
      setTimeout(() => {
        this.showLens = true;
      }, 300);
    },
    closeLens() {
      this.showLens = false;
      this.scaleLensCover = false;
    },
    scan() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.closeLens();
        this.$router.push('/bill/123');
      }, 1000);
    }
  }
};
</script>

<style scoped>
#cover {
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
  background: red;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
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
footer > button {
  flex: 1;
  height: 100%;
}
</style>
