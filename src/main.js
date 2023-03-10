import Vue from 'vue'
import App from './App.vue'
import router from './router'

export const bus = new Vue();

Vue.filter('sliceText', function (value) {
  return `${value.slice(100)} ...`
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
