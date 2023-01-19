<template>
  <div class="list page__inner-wrapper">
    <div class="content_header">
      <h1 class="page__title" :class="{'page__title--users-in-company': usersInCompany}">{{usersInCompany ? 'Users' : (page_title || 'Users')}}:</h1>
      <div class="page__additional-btn-wrapper">
        <!-- <router-link to="/add-user"> -->
          <button v-on:click="navigateToAddUser" class="page__additional-btn" :class="{'page__additional-btn--users-in-company': usersInCompany}">Add User</button>
        <!-- </router-link> -->
      </div>
    </div>
    <section class="list-item list-item--header">
      <span>Name</span>
      <span>Date of birth</span>
      <span>Company</span>
      <span>Position</span>
      <span></span>
      <span></span>
    </section>
    <section class="list__list">
      <user-item v-for="user in users" v-bind:user="user" v-on:deleteUser="deleteUser($event)"/>
    </section>
  </div>
</template>

<script>
import UserItem from './UserItem.vue'
import ContentHeader from './ContentHeader.vue'
// import {bus} from '../main'

export default {
  name: "Users",
  props: ['users', 'usersInCompany', 'companyId', 'companyLabel'],
  components: {
    'user-item':UserItem,
    'content-header': ContentHeader
  },
  data() {
    return {
      page_title: this.$route.name
    }
  },
  methods: {
    busMethod() {
    },
    deleteUser(user) {
      this.$emit('deleteUser', user)
    },
    navigateToAddUser() {
      this.$router.push({ path: '/add-user', query: { companyId: this.companyId, companyLabel: this.companyLabel }})
    }
  },
  created() {
      // console.log('created')
      // bus.$on('addUser', (data) => {
      //   // console.trace('trace')
      //   console.log('New user: ', data)
      //   this.users.push(data)
      // })
  },
  beforeDestroy () {
    // console.log('before destroy')
  //   bus.$off('addUser')
  }
}
</script>

<style>
@import './List/List.css';
</style>