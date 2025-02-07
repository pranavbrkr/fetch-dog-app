import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DogSearchView from '@/views/DogSearchView.vue'

const routes = [
  {
    path: '/fetch-dogs-app/',
    redirect: '/fetch-dogs-app/login',
  },
  {
    path: '/fetch-dogs-app/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/fetch-dogs-app/dogs',
    name: 'Dogs',
    component: DogSearchView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
