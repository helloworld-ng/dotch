<script setup>
defineProps({
  type: String,
  count: Number,
  name: String,
  currency: String,
  amount: Number,
  selected: Boolean
})
</script>

<template>
  <div class="item" :class="{'selected': selected}">
    <div>{{count}} × {{ name }}</div>
    <div>{{ amount }}</div>
  </div>
</template>

<style scoped>
  .item {
    padding: 12px 24px;
    border: solid 1px var(--vt-c-white-mute);
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    color: var(--vt-c-grey);
  }
  .item.selected {
    background-color: var(--vt-c-white-soft);
    color: var(--vt-c-text-light-1);
  }
</style>
