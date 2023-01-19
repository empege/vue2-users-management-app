<template>
  <li class="list-item">
    <span>{{user.firstName}} {{user.lastName}}</span>
    <span>{{user.dateOfBirth}}</span>
    <span>{{user.company.label}}</span>
    <span>{{user.position.label}}</span>
    <span>
      <router-link :to="{path: `/edit-user/${user.id}`}"><button class="list-item__btn">Edit</button></router-link>
    </span>
    <span><button class="list-item__btn" v-on:click="deleteUser">Delete</button></span>
  </li>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {

    }
  },
  methods: {
    deleteUser() {
      console.log('Delete user')
      console.log(this.user)
      this.$emit('deleteUser', this.user)
    }
  }
}
</script>

<style>
@import './List/List.css';
</style>