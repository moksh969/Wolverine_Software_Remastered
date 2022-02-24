import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Settings from '../screens/Settings.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/newrecord',
    name: 'NewRecord',
    component: () => import('../screens/NewRecord.vue')
  },
  {
    path: '/doctors',
    name: 'Doctors',
    component: () => import('../screens/Doctors.vue')
  },
  {
    path: '/facilities',
    name: 'Facilities',
    component: () => import('../screens/Facilities.vue')
  },
  {
    path: '/payments',
    name: 'Payments',
    component: () => import('../screens/Payments.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router