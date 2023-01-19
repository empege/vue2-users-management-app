<template>
  <nav class="nav">
    <router-link to="/">
        <div class="nav__logo">
        <img src="https://clickup.com/images/schema_org/logo.png" alt="logo">
      </div>
    </router-link>
    <div class="nav__content">
      <ul class="nav__items">
        <transition name="slide-up"><li class="nav__item"><router-link to="/">Users</router-link></li></transition>
        <transition name="slide-up"><li class="nav__item"><router-link to="/companies">Companies</router-link></li></transition>
        <transition name="slide-up"><li class="nav__item"><router-link to="/newsletter">Newsletter</router-link></li></transition>
      </ul>
      <span class="weather" @click="toggleWeatherPopup">Weather</span>
      <keep-alive>
        <component v-bind:is="this.showWeatherPopup && 'weather-popup'" v-on:closePopup="closePopup"></component>
      </keep-alive>
    </div>
  </nav>
</template>

<script>
import Weather from './Weather.vue'
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
      this.showWeatherPopup = false
    }
  }
}
</script>

<style>
@import '../App.css';
</style>