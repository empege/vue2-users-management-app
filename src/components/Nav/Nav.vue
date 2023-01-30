<template>
  <div class="nav__wrapper">
    <nav class="nav">
      <div class="nav__logo-wrapper">
        <div class="nav__logo">
          <a href="https://www.ivanmitov.com">
            <span class="ivan">Ivan</span>
            <span class="mitov">Mitov</span>.com
          </a> 
        </div>
        <span>|</span>
        <div class="nav__logo">
          <a href="https://github.com/empege/vue2-users-management-app">View on Github</a> 
        </div>
      </div>
      <div class="nav__content">
        <ul class="nav__items">
          <transition name="slide-up"><li class="nav__item"><router-link to="/">Users</router-link></li></transition>
          <transition name="slide-up"><li class="nav__item"><router-link to="/companies">Companies</router-link></li></transition>
          <transition name="slide-up"><li class="nav__item"><router-link to="/newsletter">Newsletter</router-link></li></transition>
        </ul>
        <span class="weather" @click="toggleWeatherPopup">
          Weather
          <keep-alive>
            <component v-bind:is="this.showWeatherPopup && 'weather-popup'" v-on:closePopup="closePopup"></component>
          </keep-alive>
        </span>
      </div>
    </nav>
  </div>
</template>

<script>
import Weather from '../Weather/Weather.vue'
export default {
  name: 'Nav',
  components: {
    'weather-popup': Weather,
  },
  data() {
    return {
      showWeatherPopup: false,
    }
  },
  methods: {
    toggleWeatherPopup() {
      this.showWeatherPopup = this.showWeatherPopup ? false : 'weather-popup'
    },
    closePopup() {
      this.$emit('closePopup', false)
    }
  }
}
</script>

<style>
@import './Nav.css';
</style>