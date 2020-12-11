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
    path: '/dateTime',
    name: 'dateTime',
    component: () => import('../views/DateTime.vue')
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
    path: '/gameTable',
    name: 'gameTable',
    component: () => import( '../views/gameTable.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
