<template>
  <li class="list-item">
    <span>{{company.label}}</span>
    <span>{{company.city}}</span>
    <span>{{company.country}}</span>
    <span>{{company.users.length}}</span>
    <span>
      <router-link :to="{path: `/edit-company/${company.id}`}"><button class="list-item__btn">Edit</button></router-link>
    </span>
    <span><button class="list-item__btn" v-on:click="deleteCompany">Delete</button></span>
  </li>
</template>

<script>
export default {
  props: ['company'],
  data() {
    return {

    }
  },
  methods: {
    deleteCompany() {
      console.log('Delete company')
      console.log(this.company)
      this.$emit('deleteCompany', this.company)
    }
  }
}
</script>

<style>
@import './List.css';
</style>