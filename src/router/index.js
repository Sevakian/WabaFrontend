import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    component: () => import('../views/Index.vue') 
  },
  {
    path: '/Datetime',
    name: 'Datetime',
    component: () => import('../views/Datetime.vue')
  },
  {
    path: '/Calendar',
    name: 'Calendar',
    component: () => import('../views/Calendar.vue')
  },
  {
    path: '/track',
    name: 'track',
    component: () => import( '../views/Track.vue')
  },
  {
    path: '/svg',
    name: 'svg',
    component: () => import( '../views/svgTest.vue')
  },
  {
    path: '/Gaming',
    name: 'Gaming',
    component: () => import( '../views/Gaming.vue')
  },
  {
    path: '/Todo',
    name: 'Todo',
    component: () => import('../views/Todo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
