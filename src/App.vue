<template>
  <div id="app">
    <app-nav></app-nav>
    <main class="page__main-wrapper">
      <router-view
        v-on:addCompany="addCompany($event)"
        v-on:editCompany="editCompany($event)"
        >
      </router-view>
    </main>
  </div>
</template>

<script>
import Users from './components/Users.vue'
import UserPage from './components/UserPage.vue'
import Companies from './components/Companies.vue'
import Posts from './components/Posts.vue'
import Nav from './components/Nav/Nav.vue'

export default {
  name: 'app',
  components: {
    Users,
    UserPage,
    Companies,
    Posts,
    'app-nav': Nav
  },
  mounted() {
    console.log('Mounted')
  },
  methods: {
    closePopup() {
      this.showWeatherPopup = false
    }
  }
}
</script>

<style>
@import './App.css';
</style>