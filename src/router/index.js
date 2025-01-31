// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DogSearchView from '@/views/DogSearchView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/dogs',
    name: 'Dogs',
    component: DogSearchView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
