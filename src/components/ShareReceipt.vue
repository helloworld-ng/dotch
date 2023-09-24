<script setup>
defineProps({
  id: String
})
</script>

<template>
  <main>
    <div id="url">{{shortURL}}</div>
    <a href="#" id="share">Share</a>
  </main>
</template>

<script>
export default {
  data() {
    return {
      shortURL: `dotch.app/bill/${this.id}`,
      longURL: `dotch.app/bill/${this.id}`
    };
  }
}
</script>

<style scoped>
main {
  background: var(--vt-c-black);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  margin: 0 12px;
  padding: 0 24px;
  border-radius: 30px;
}
#url {
  color: var(--color-text-mute);
}
</style>
