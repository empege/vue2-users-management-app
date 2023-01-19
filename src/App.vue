<template>
  <div id="app">
    <app-nav></app-nav>
    <main class="page__main-wrapper">
      <!-- <router-view v-bind:page_title="page_title" @get-title="getTitle"/> -->
      <router-view
        v-bind:users="users"
        v-on:addUser="addUser($event)"
        v-on:editUser="editUser($event)"
        v-on:deleteUser="deleteUser($event)"
        v-bind:companies="companies"
        v-on:addCompany="addCompany($event)"
        v-on:editCompany="editCompany($event)"
        v-on:deleteCompany="deleteCompany($event)"
        >
        <!-- Nece da update, ne znam zasto -->
        <!-- <h1 slot="page_title" class="page__title">{{page_title || 'Users'}}:</h1> -->
      </router-view>
    </main>
  </div>
</template>

<script>
import Users from './components/Users.vue'
import UserPage from './components/UserPage.vue'
import Companies from './components/Companies.vue'
import Posts from './components/Posts.vue'
import Nav from './components/Nav.vue'
import {usersData} from './assets/data'
import {companiesData} from './assets/data'

export default {
  name: 'app',
  components: {
    Users,
    UserPage,
    Companies,
    Posts,
    'app-nav': Nav
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      users: usersData,
      companies: companiesData
      // page_title: this.$route.name
    }
  },
  // Ne radi
  // beforeRouteUpdate() {
  //   this.page_title = this.$route.name
  //   console.log('Route update')
  // }
  mounted() {
    console.log('Mounted')
    // this.init()
  },
  methods: {
  //   init() {
  //     console.log(this.$route)
  //   },
  //   getTitle() {
  //     this.page_title = this.$route.name
  //     console.log('get title')
  //     this.init()
  //   }
    addUser(newUser){
      this.users.push(newUser)
      this.companies.forEach(company => {
        if(company.id === newUser.company.id) {
          console.log('Dodaj novog u companies')
          company.users.push(newUser)
        }
      })
      this.$router.push('/')
    },
    editUser(editedUser){
      console.log(editedUser)
      this.users.forEach(current => {
        if(current.id === editedUser.id) {
          // Edit companies for user arrays
          // If users company didn't change, don't do anything. If it did, delete this user from companies users array, and add this user to the new companies users array
          if(!(current.company.id === editedUser.company.id)) {
            const companyIndexes = this.companies.map(curr => curr.id)
            const deleteFromCompanyIndex = companyIndexes.indexOf(current.company.id)
            const addToCompanyIndex = companyIndexes.indexOf(editedUser.company.id)

            // Delete
            this.companies[deleteFromCompanyIndex].users.splice(this.companies[deleteFromCompanyIndex].users.map(curr => curr.id).indexOf(current.id), 1)
            // Add
            this.companies[addToCompanyIndex].users.push(editedUser)
          }

          // Edit user
          current.id = editedUser.id
          current.firstName = editedUser.firstName
          current.lastName = editedUser.lastName
          current.company = JSON.parse(JSON.stringify(editedUser.company))
          current.dateOfBirth = editedUser.dateOfBirth
          current.position = JSON.parse(JSON.stringify(editedUser.position))
          current.number = Number(editedUser.number)


        }
      })
      // this.companies.forEach(company => {
      //   if(company.id === editedUser.company.id) {
      //     console.log(company.id, editedUser.company.id, editedUser.id)
          // Vue vraca neki observer umesto objekta, i mora ovako da bi se resetovao na obican objekat... :P
          // https://stackoverflow.com/questions/52873516/vue-js-returns-ob-observer-data-instead-of-my-array-of-objects
          // const editedUserInCompanyIndex = JSON.parse(JSON.stringify(company)).users.indexOf(editedUser)
          // console.log(editedUser.id)
          // console.log(company.users.map(user => user.id))
          // company.users.slice(company.users.indexOf(editedUser), 1)
      //   }
      // })
      this.$router.push('/')
    },
    deleteUser(user) {
      this.users = this.users.filter(currentUser => currentUser.id !== user.id)
      const indexOfCompany = this.companies.map(curr => curr.id).indexOf(user.company.id)
      const indexOfUserInCompany = this.companies[indexOfCompany].users.map(curr => curr.id).indexOf(user.id)
      this.companies[indexOfCompany].users.splice(indexOfUserInCompany, 1)
    },
    addCompany(newCompany){
      this.companies.push(newCompany)
      this.$router.push('/companies')
    },
    editCompany(editedCompany){
      this.companies.forEach(current => {
        if(current.id === editedCompany.id) {
          current.id = editedCompany.id
          current.label = editedCompany.label
          current.city = editedCompany.city
          current.country = editedCompany.country
        }
      })
      this.users.forEach(user => {
        if(user.company.id === editedCompany.id) {
          user.company.id = editedCompany.id
          user.company.label = editedCompany.label
        }
      })
      this.$router.push('/companies')
    },
    deleteCompany(company) {
      this.companies = this.companies.filter(currentUser => currentUser.id !== company.id)
      this.users.forEach(user => {
        if(user.company.id === company.id) {
          user.company = {}
        }
      })
    }
  }
}
</script>

<style>
@import './App.css';
</style>