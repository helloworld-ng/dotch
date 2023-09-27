<script setup>
import ShareText from '../components/ShareText.vue'
import ReceiptItem from '../components/ReceiptItem.vue'
import CopyToClipboard from '../components/CopyToClipboard.vue'
import mockData from '../mock.json'
</script>

<template>
  <header>
    <nav>
      <a href="/">
        <img alt="Dotch logo" src="../assets/logo.svg" />
      </a>
    </nav>
    <div id="merchant">
      <h3>{{ metadata.merchant }}</h3>
      <p id="date">{{ metadata.date }}</p>
    </div>
    <ShareText :value="longURL" :display="shortURL" title="Dotch" text="Check out my receipt" />
  </header>
  <main>
    <div id="receipt">
      <div id="toolbar">
        <Transition name="slide-up" mode="out-in">
          <div id="tooltip" v-if="!selectedItems.length">
            Tap items to add up
          </div>
          <div id="metadata" v-else>
            <div id="count" @click="resetCount">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 1.3335L2 4.00016V13.3335C2 13.6871 2.14048 14.0263 2.39052 14.2763C2.64057 14.5264 2.97971 14.6668 3.33333 14.6668H12.6667C13.0203 14.6668 13.3594 14.5264 13.6095 14.2763C13.8595 14.0263 14 13.6871 14 13.3335V4.00016L12 1.3335H4Z" stroke="#191A26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 4H14" stroke="#191A26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.6663 6.6665C10.6663 7.37375 10.3854 8.05203 9.88529 8.55212C9.3852 9.05222 8.70692 9.33317 7.99967 9.33317C7.29243 9.33317 6.61415 9.05222 6.11406 8.55212C5.61396 8.05203 5.33301 7.37375 5.33301 6.6665" stroke="#191A26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ selectedItems.length }}
            </div>
            <div id="subtotal">
              <CopyToClipboard :text="subtotal" />
            </div>
          </div>
        </Transition>
      </div>
      <div id="items">
        <ReceiptItem v-for="item in items" :key="item.key" v-bind="item" @click="toggleItem(item)" />
      </div>
      <ul id="totals">
        <li>
          <span>Subtotal</span>
          <span>{{ metadata.subtotal }}</span>
        </li>
        <li>
          <span>Tax</span>
          <span>{{ metadata.tax }}</span>
        </li>
        <li>
          <span>Total</span>
          <span>{{ metadata.total }}</span>
        </li>
      </ul>
    </div>
  </main>
  <footer>
    <a href="/">Scan another receipt</a>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      receipt: null,
      items: [],
      metadata: {},
      selectedItems: [],
    };
  },
  computed: {
    shortURL() {
      return `dotch.app/bill/${this.metadata.id}`;
    },
    longURL() {
      return `https://dotch.app/bill/${this.metadata.id}`;
    },
    subtotal() {
      let subtotal = this.selectedItems.reduce((acc, item) => {
        return acc + item.amount;
      }, 0);
      return `${ this.metadata.currency} ${ subtotal.toFixed(2) }`;
    },
  },
  methods: {
    toggleItem(item) {
      item.selected = !item.selected;
      if (item.selected) {
        this.selectedItems.push(item);
      } else {
        this.selectedItems = this.selectedItems.filter(i => i.name !== item.name);
      }
    },
    resetCount() {
      this.items.forEach(item => {
        item.selected = false;
      });
      this.selectedItems = [];
    }
  },
  created() {
    this.receipt = mockData;
    let { prediction } = mockData;
    let { supplier_name, locale, line_items, total_tax, total_amount } = prediction;
    let items = line_items.map(line_item => ({
      count: line_item.quantity || 1,
      name: line_item.description,
      amount: line_item.total_amount,
    }));
    let counter = 0;
    this.items = items.map(item => {
      counter++;
      return {
        ...item,
        selected: false,
        key: counter,
      };
    });
    let subtotal = items.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);
    this.metadata = {
      id: this.$route.params.id,
      merchant: supplier_name.raw_value,
      date: new Date(prediction.date.value).toLocaleDateString(),
      currency: locale.currency,
      subtotal: subtotal.toFixed(2),
      tax: parseFloat(total_tax.value || 0).toFixed(2),
      total: parseFloat(total_amount.value).toFixed(2),
    };
  }
};
</script>

<style scoped>
header {
  padding: 0 0 48px;
  position: sticky;
  top: 0;
}
#merchant {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 30px 24px;
}
#date {
  color: var(--color-text-mute)
}
main {
  position: relative;
  top: 0;
}
#receipt {
  position: relative;
  background: white;
  color: var(--vt-c-text-light-1);
  font-family: Roboto Mono, monospace;
  text-transform: uppercase;
  font-size: 15px;
  padding: 0 24px 30px;
  z-index: 10;
}
#receipt:before, #receipt:after {
  content: " ";
  display: block;
  height: 12px;
  width: 100%;
  position: absolute;
  left: 0;
}
#receipt:before {
  background: linear-gradient(-45deg, #FFF 8px, red 8px, blue 8px, transparent 0), linear-gradient(45deg, #FFF 8px, transparent 0);
  background-size: 12px 16px;
  background-position: left top;
  top: -12px;
}
#receipt:after {
  background: linear-gradient(-225deg, #FFF 8px, red 8px, blue 8px, transparent 0), linear-gradient(225deg, #FFF 8px, transparent 0);
  background-size: 12px 16px;
  background-position: left bottom;
  bottom: -12px;
}
#toolbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 70%, rgba(255, 255, 255, 0) 100%);
}
#toolbar > div {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
}
#toolbar > div#metadata {
  justify-content: space-between;
}
#metadata {
  position: sticky;
  top: 0;
}
#items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
#subtotal, #count {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
#totals {
  list-style: none;
  padding: 0 12px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
#totals > li {
  display: flex;
  justify-content: space-between;
}
footer {
  height: 100px;
  position: sticky;
  bottom: 0;
}
footer > a {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--color-text-mute);
}
</style>
