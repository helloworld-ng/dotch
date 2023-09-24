import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReceiptView from '../views/ReceiptView.vue'
import AboutView from '../views/AboutView.vue'
import HelpView from '../views/HelpView.vue'

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
    }, {
      path: '/about',
      name: 'about',
      component: AboutView
    }, {
      path: '/help',
      name: 'help',
      component: HelpView
    }
  ]
})

export default router
