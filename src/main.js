import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  nprogress.start()
  next()
})
router.afterEach(() => {
  nprogress.done()
})

axios.interceptors.request.use(
  config => {
    nprogress.start()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function(response) {
    nprogress.done()
    return response
  },
  function(error) {
    nprogress.done()
    return Promise.reject(error)
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
