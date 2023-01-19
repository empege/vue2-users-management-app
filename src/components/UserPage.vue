<template>
  <div class="add-edit page__inner-wrapper">
    <div class="content_header">
      <h1 class="page__title">{{page_title || 'Users'}}:</h1>
      <div class="page__additional-btn-wrapper">
        <button v-on:click="validateUser" class="page__additional-btn">{{this.$route.params.id ? 'Save change' : 'Save user'}}</button>
      </div>
    </div>
    <div class="add-edit__form-wrapper">
      <form class="add-edit__form">
        <!-- Ovde ce ti trebati v-model svuda -->
        <label for="firstName">
          <span>First name:</span>
          <span style="font-size: 12px; color: #2c3e50;">Lazy: {{user.firstName}}</span>
          <input type="text" v-model.lazy="user.firstName">
          <transition>
            <div v-if="this.user.firstName === '' && this.submitClicked" class="add-edit__error">Please enter the persons first name.</div>
          </transition>
        </label>

        <label for="lastName">
          <span>Last name:</span>
          <span style="font-size: 12px; color: #2c3e50;">Regular: {{user.lastName}}</span>
          <input type="text" v-model="user.lastName">
          <transition>
            <div v-if="this.user.lastName === '' && this.submitClicked" class="add-edit__error">Please enter the persons last name.</div>
          </transition>
        </label>

        <label for="company">
          <span>Company:</span>
          <select v-model="user.company" v-on:change="showSelected">
            <option disabled selected="selected" v-bind:value="0">Choose a company: </option>
            <option v-for="company in companies" v-bind:value="{label:company.label, id:company.id}">{{company.label}}</option>
          </select>
          <transition>
            <div v-if="this.user.company === '0' && this.submitClicked" class="add-edit__error">Please enter the persons company.</div>
          </transition>
        </label>

        <label for="dateOfBirth">
          <span>Date 0f birth:</span>
          <span style="font-size: 12px; color: #2c3e50;">Regular: {{user.dateOfBirth}}</span>
          <date-picker v-model="user.dateOfBirth" valueType="format" format="DD.MM.YYYY" :disabled-date="(date) => date >= new Date()"></date-picker>
          <transition>
            <div v-if="this.user.dateOfBirth === '' && this.submitClicked" class="add-edit__error">Please enter the persons date of birth.</div>
          </transition>
        </label>

        <label for="position">
          <span>Position:</span>
          <select v-model="user.position" v-on:change="showSelected">
            <option disabled selected="selected" v-bind:value="0">Choose a position: </option>
            <option v-for="position in positions" v-bind:value="{label:position.label, id:position.id}">{{position.label}}</option>
          </select>
          <transition>
            <div v-if="this.user.position === '0' && this.submitClicked" class="add-edit__error">Please enter the persons work position.</div>
          </transition>
        </label>

        <label for="number">
          <span>Number:</span>
          <span style="font-size: 12px; color: #2c3e50;">(Exactly 9 digits required)</span>
          <input type="text" v-model="user.number"  min-length="9" :maxlength="9" pattern="[0-9]{9}" v-on:input="validateUserNumber">
          <transition>
            <div v-if="this.user.number === '' && this.submitClicked" class="add-edit__error">Please enter the persons phone number.</div>
          </transition>
        </label>

      </form>
    </div>
  </div>
</template>

<script>
import ContentHeader from './ContentHeader.vue';
import {bus} from '../main'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import util from '../assets/utils/generateId.js'

export default {
  props: ['users', 'companies'],
  components: {
    'content-header': ContentHeader,
    DatePicker
  },
  name: 'UserPage',
  data() {
    return {
      page_title: this.$route.name,
      preselected_company: this.$route.params.companyId,
      user: {
        id: '',
        firstName: '',
        lastName: '',
        company: {},
        dateOfBirth: '',
        position: {},
        number: ''
      },
      positions: [
        {
          id: 1,
          label: 'Frontend',
        },
        {
          id: 2,
          label: 'Backend'
        },
        {
          id: 3,
          label: 'Sideend?'
        },
        {
          id: 4,
          label: 'Ninja'
        }
      ],
      submitClicked: false,
      shouldSubmit: []
    }
  },
  methods: {
    validateUser(event) {
      console.log('Add User!')
      
      this.submitClicked = true
      this.shouldSubmit = []

      if(this.user.firstName === '') {
        this.shouldSubmit.push(false)
      }
      if(this.user.company === '0') {
        this.shouldSubmit.push(false)
      }
      if(this.user.dateOfBirth === '') {
        this.shouldSubmit.push(false)
      }
      if(this.user.position === '0') {
        this.shouldSubmit.push(false)
      }
      if(this.user.number === '' || this.user.number.length < 9) {
        this.shouldSubmit.push(false)
      }
      // Add a User
      if(this.$route.params.id){
        this.editUser()
      }else{
        this.addUser()
      }
    },
    addUser() {
      if(!this.shouldSubmit.includes(false)){
        const userId = this.generateNewUserId()
        const newUser = {...this.user, id: userId}
        this.$emit('addUser', newUser)
      }
    },
    editUser() {
      if(!this.shouldSubmit.includes(false)){
        const editedUser = {...this.user}
        this.$emit('editUser', editedUser)
      }
    },
    validateUserNumber(e) {
      if(!Number(e.target.value)){
        this.user.number = this.user.number.slice(0, this.user.number.length-1)
      }
      this.$forceUpdate()
    },
    showSelected(e) {
      console.log(e.target)
    }
  },
  created() {
    // console.log('Created')
    this.generateNewUserId = util.generateId
    if(this.$route.params.id) {
      const selectedUser = this.users.find(currentUser => currentUser.id === this.$route.params.id)
      this.user.id = selectedUser.id
      this.user.firstName = selectedUser.firstName
      this.user.lastName = selectedUser.lastName
      this.user.company = JSON.parse(JSON.stringify(selectedUser.company))
      this.user.dateOfBirth = selectedUser.dateOfBirth
      this.user.position = JSON.parse(JSON.stringify(selectedUser.position))
      this.user.number = Number(selectedUser.number)
    }
    if(this.$route.query.companyId && this.$route.query.companyLabel) {
      // Preselected company when adding user from company edit page
      console.log(JSON.parse(JSON.stringify({id: this.$route.query.companyId, label: this.$route.query.companyLabel})))
      this.user.company = JSON.parse(JSON.stringify({id: this.$route.query.companyId, label: this.$route.query.companyLabel}))
    }
  }
}
</script>

<style>
  @import './AddEditPage/AddEditPage.css';
</style>