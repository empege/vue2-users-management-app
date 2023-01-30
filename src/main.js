import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'

export const bus = new Vue();

Vue.filter('sliceText', function (value) {
  return `${value.slice(100)} ...`
})

new Vue({
  store,
  el: '#app',
  router,
  render: h => h(App)
})
