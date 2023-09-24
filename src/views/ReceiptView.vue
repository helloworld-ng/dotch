<script setup>
import ShareReceipt from '../components/ShareReceipt.vue'
import ReceiptItem from '../components/ReceiptItem.vue'
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
        <Transition name="slide-up" mode="out-in" appear>
          <div id="tooltip" v-if="!selectedItems.length">
            Tap items to add up
          </div>
          <div id="metadata" v-else>
            <div id="count">{{ selectedItems.length }} {{ selectedItems.length == 1 ? 'item' : 'items' }}</div>
            <div id="subtotal">
              {{ subtotal }}
              <span id="copy">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_539_4254)">
                    <path d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z" stroke="#CACBD0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3.33301 10.0002H2.66634C2.31272 10.0002 1.97358 9.85969 1.72353 9.60964C1.47348 9.35959 1.33301 9.02045 1.33301 8.66683V2.66683C1.33301 2.31321 1.47348 1.97407 1.72353 1.72402C1.97358 1.47397 2.31272 1.3335 2.66634 1.3335H8.66634C9.01996 1.3335 9.3591 1.47397 9.60915 1.72402C9.8592 1.97407 9.99967 2.31321 9.99967 2.66683V3.3335" stroke="#CACBD0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_539_4254">
                      <rect width="16" height="16" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </span>
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
      console.log(item);
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
