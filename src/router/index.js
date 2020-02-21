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
    path: '/tables1',
    name: 'tables1',
    component: () => import('../views/Tables1.vue'),
    props: (route) => (route.query)
  },
  {
    path: '/tables2',
    name: 'tables2',
    component: () => import('../views/Tables2.vue'),
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
