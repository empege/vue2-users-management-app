<template>
  <div class="add-edit page__inner-wrapper">
    <div class="content_header">
      <h1 class="page__title">{{page_title || 'Companies'}}:</h1>
      <div class="page__additional-btn-wrapper">
        <button v-on:click="validateCompany" class="page__additional-btn">{{this.page_id ? 'Save change' : 'Save company'}}</button>
      </div>
    </div>
    <div class="add-edit__form-wrapper">
      <form class="add-edit__form">
        <!-- Ovde ce ti trebati v-model svuda -->
        <label for="label">
          <span>Name:</span>
          <input type="text" v-model.lazy="company.label">
          <transition>
            <div v-if="this.company.label === '' && this.submitClicked" class="add-edit__error">Please enter the company name.</div>
          </transition>
        </label>

        <label for="city">
          <span>City:</span>
          <input type="text" v-model="company.city">
          <transition>
            <div v-if="this.company.city === '' && this.submitClicked" class="add-edit__error">Please enter the company city.</div>
          </transition>
        </label>

        <label for="country">
          <span>City:</span>
          <input type="text" v-model="company.country">
          <transition>
            <div v-if="this.company.country === '' && this.submitClicked" class="add-edit__error">Please enter the company country.</div>
          </transition>
        </label>

      </form>
      <div v-if="this.page_id" class="add-edit__users-wrapper">
        <users
          v-bind:users=" this.company.users"
          v-bind:usersInCompany="true"
          v-on:deleteUser="deleteUser($event)"
          v-bind:companyId="this.company.id"
          v-bind:companyLabel="this.company.label"
          ></users>
      </div>
    </div>
  </div>
</template>

<script>
import ContentHeader from './ContentHeader.vue';
import Users from './Users.vue'
import util from '../assets/utils/generateId.js'

export default {
  props: ['users', 'companies'],
  components: {
    'content-header': ContentHeader,
    'users': Users
  },
  name: 'CompanyPage',
  data() {
    return {
      page_id: this.$route.params.id,
      page_title: this.$route.name,
      company: {
        id: '',
        label: '',
        city: '',
        country: '',
        users: [],
      },
      submitClicked: false,
      shouldSubmit: []
    }
  },
  methods: {
    validateCompany(event) {
      console.log('Add Company!')
      
      this.submitClicked = true
      this.shouldSubmit = []

      if(this.company.label === '') {
        this.shouldSubmit.push(false)
      }
      if(this.company.city === '0') {
        this.shouldSubmit.push(false)
      }
      if(this.company.country === '') {
        this.shouldSubmit.push(false)
      }
      // Add a Company
      if(this.page_id){
        this.editCompany()
      }else{
        this.addCompany()
      }
    },
    addCompany() {
      if(!this.shouldSubmit.includes(false)){
        const companyId = this.generateNewUserId()
        const newCompany = {...this.company, id: companyId}
        this.$emit('addCompany', newCompany)
      }
    },
    editCompany() {
      if(!this.shouldSubmit.includes(false)){
        const editedCompany = {...this.company}
        this.$emit('editCompany', editedCompany)
      }
    },
    deleteUser(user) {
      this.$emit('deleteUser', user)
    }
  },
  created() {
    console.log('Created')
    this.generateNewUserId = util.generateId
    if(this.page_id) {
      const selectedCompany = this.companies.find(currentCompany => currentCompany.id === this.page_id)
      this.company.id = selectedCompany.id
      this.company.label = selectedCompany.label
      this.company.city = selectedCompany.city
      this.company.country = selectedCompany.country
      this.company.users = selectedCompany.users
    }
  }
}
</script>

<style>
  @import './AddEditPage.css';
</style>