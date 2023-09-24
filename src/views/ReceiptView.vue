<script setup>
import ShareReceipt from '../components/ShareReceipt.vue'
import ReceiptItem from '../components/ReceiptItem.vue'
import CopyToClipboard from '../components/CopyToClipboard.vue'
</script>

<template>
  <header>
    <nav>
      <a href="/">
        <img alt="Dotch logo" src="../assets/logo.svg" />
      </a>
    </nav>
   <Transition name="fade" appear>
    <div id="title">
      <h3>{{ receipt.title }}</h3>
      <p id="date">{{ receipt.date }}</p>
    </div>
   </Transition>
   <Transition name="slide-up" appear>
    <ShareReceipt :id="receipt.id" />
  </Transition>
  </header>
  <main>
    <div id="receipt">
      <div id="toolbar">
        <Transition name="slide-up" mode="out-in">
          <div id="tooltip" v-if="!selectedItems.length">
            Tap items to add up
          </div>
          <div id="metadata" v-else>
            <div id="count">{{ selectedItems.length }} {{ selectedItems.length == 1 ? 'item' : 'items' }}</div>
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
          <span>{{ receipt.metadata.subtotal }}</span>
        </li>
        <li>
          <span>Fees</span>
          <span>{{ receipt.metadata.fees }}</span>
        </li>
        <li>
          <span>Total</span>
          <span>{{ receipt.metadata.total }}</span>
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
      selectedItems: [],
    };
  },
  computed: {
    subtotal() {
      return this.selectedItems.reduce((acc, item) => {
        return acc + parseInt(item.amount);
      }, 0);
    },
    total() {
      return this.items.reduce((acc, item) => {
        return acc + item.amount;
      }, 0);
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
    }
  },
  created() {
    this.receipt = {
      id: this.$route.params.id,
      date: "September 12, 2023",
      items: [{
        type: "product",
        count: 1,
        name: "Hot Chocolate",
        currency: "N",
        amount: 1500.00
      },
      {
        type: "product",
        count: 1,
        name: "Water",
        currency: "N",
        amount: 1000.00
      },
      {
        type: "product",
        count: 1,
        name: "Lamb Chops",
        currency: "N",
        amount: 11500.00
      },
      {
        type: "product",
        count: 1,
        name: "Pork Chops",
        currency: "N",
        amount: 9500.00
      },
      {
        type: "product",
        count: 1,
        name: "Shepherd's Pie",
        currency: "N",
        amount: 3500.00
      },
      {
        type: "product",
        count: 1,
        name: "Mango Smoothie",
        currency: "N",
        amount: 2500.00
      },
      {
        type: "product",
        count: 1,
        name: "Cheesecake",
        currency: "N",
        amount: 3000.00
      },
      {
        type: "product",
        count: 1,
        name: "The Bistro Classic",
        currency: "N",
        amount: 3000.00
      },
      {
        type: "fee",
        count: 1,
        name: "Service Charge",
        currency: "N",
        amount: 5300.00
      },
      {
        type: "fee",
        count: 1,
        name: "VAT",
        currency: "N",
        amount: 2368.00
      },
      {
        type: "fee",
        count: 1,
        name: "State Tax",
        currency: "N",
        amount: 1577.00
      }],
      metadata: {
        subtotal: 40800.00,
        fees: 9245.00,
        total: 40800.00
      },
      title: "The Orchid Bistro",
      url: "https://cloudinary.image"
    };
    let counter = 0;
    this.items = this.receipt.items.map(item => {
      counter++;
      return {
        ...item,
        selected: false,
        key: counter,
      };
    });
  }
};
</script>

<style scoped>
header {
  padding: 0 0 48px;
  position: sticky;
  top: 0;
}
#title {
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
#subtotal {
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
