<template>
  <div class="list page__inner-wrapper">
    <div class="content_header">
      <h1 class="page__title">{{page_title || 'Users'}}:</h1>
      <div class="page__additional-btn-wrapper">
        <router-link to="/add-company">
          <button class="page__additional-btn">Add Company</button>
        </router-link>
      </div>
    </div>
    <section class="list-item list-item--header">
      <span>Name</span>
      <span>City</span>
      <span>Country</span>
      <span>No. of users</span>
      <span></span>
      <span></span>
    </section>
    <section class="list__list">
      <company-item v-for="company in companies" v-bind:company="company" v-on:deleteCompany="deleteCompany($event)"/>
    </section>
  </div>
</template>

<script>
import CompanyItem from './CompanyItem.vue'
import ContentHeader from './ContentHeader.vue'

export default {
  name: "Companies",
  props: ['companies'],
  components: {
    'company-item':CompanyItem,
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
    deleteCompany(company) {
      this.$emit('deleteCompany', company)
    }
  }
}
</script>

<style>
@import './List.css';
</style>