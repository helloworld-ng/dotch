import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReceiptView from '../views/ReceiptView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }, {
      path: '/bill/:id',
      name: 'bill',
      component: ReceiptView
    }
  ]
})

export default router
