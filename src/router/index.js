import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    props: (route) => (route.query)
  },
  {
    path: '/views',
    name: 'views',
    component: () => import('../views/Views.vue'),
    props: (route) => (route.query)
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('../views/Tables.vue'),
    props: (route) => (route.query)
  },
  {
    path: '/card',
    name: 'card',
    component: () => import('../views/Cards.vue'),
    props: (route) => (route.query)
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/Lists.vue'),
    props: (route) => (route.query)
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
