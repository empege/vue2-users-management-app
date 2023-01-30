<template>
  <div class="list page__inner-wrapper">
    <div class="content_header">
      <h1 class="page__title" :class="{'page__title--users-in-company': usersInCompany}">{{usersInCompany ? 'Users' : (page_title || 'Users')}}:</h1>
      <div class="page__additional-btn-wrapper">
        <button v-on:click="navigateToAddUser" class="page__additional-btn" :class="{'page__additional-btn--users-in-company': usersInCompany}">Add User</button>
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
      <user-item v-for="user in users" v-bind:user="user"/>
    </section>
  </div>
</template>

<script>
import UserItem from './UserItem.vue'
import ContentHeader from './ContentHeader.vue'

export default {
  name: "Users",
  props: ['usersInCompany', 'companyId', 'companyLabel'],
  components: {
    'user-item':UserItem,
    'content-header': ContentHeader
  },
  data() {
    return {
      page_title: this.$route.name,
      page_id: this.$route.params.id
    }
  },
  methods: {
    navigateToAddUser() {
      this.$router.push({ path: '/add-user', query: { companyId: this.companyId, companyLabel: this.companyLabel }})
    }
  },
  computed: {
    users() {
      if(this.page_title === 'Edit Company' && this.page_id) {
        return this.$store.getters.users(this.page_id)
      }
      return this.$store.getters.users()
    },
    upperCasedUsers() {
      return this.$store.state.upperCasedUsers
    }
  }
}
</script>

<style>
@import './List/List.css';
</style>