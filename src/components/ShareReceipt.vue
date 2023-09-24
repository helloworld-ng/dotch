<script setup>
defineProps({
  id: String
})
</script>

<template>
  <main>
    <div id="url">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.33366 1.3335H4.00033C3.6467 1.3335 3.30756 1.47397 3.05752 1.72402C2.80747 1.97407 2.66699 2.31321 2.66699 2.66683V13.3335C2.66699 13.6871 2.80747 14.0263 3.05752 14.2763C3.30756 14.5264 3.6467 14.6668 4.00033 14.6668H12.0003C12.3539 14.6668 12.6931 14.5264 12.9431 14.2763C13.1932 14.0263 13.3337 13.6871 13.3337 13.3335V5.3335L9.33366 1.3335Z" stroke="#CACBD0" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.33301 1.3335V5.3335H13.333" stroke="#CACBD0" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10.6663 8.6665H5.33301" stroke="#CACBD0" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10.6663 11.3335H5.33301" stroke="#CACBD0" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6.66634 6H5.99967H5.33301" stroke="#CACBD0" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      {{shortURL}}
    </div>
    <a @click="share" id="share">Share</a>
  </main>
</template>

<script>
export default {
  data() {
    return {
      shortURL: `dotch.app/bill/${this.id}`,
      longURL: `dotch.app/bill/${this.id}`
    };
  },
  computed: {
    shareData() {
      return {
        title: 'Dotch',
        text: 'Check out my receipt',
        url: this.longURL
      };
    }
  },
  methods: {
    share() {
      if (navigator.share) {
        navigator.share(this.shareData)
          .then(() => {
            console.log('Shared successfully');
          })
          .catch((error) => {
            console.error('Error sharing:', error);
          });
      } else {
        console.log('Web Share API is not supported in this browser');
      }
    }
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
  margin: 0 24px;
  padding: 0 24px;
  border-radius: 30px;
}
#url {
  color: var(--color-text-mute);
  display: flex;
  align-items: center;
}
svg {
  margin-right: 12px;
}
</style>
