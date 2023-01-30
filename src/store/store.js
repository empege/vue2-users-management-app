import Vue from "vue";
import Vuex from 'vuex';
import { usersData } from '../assets/data'
import { companiesData } from '../assets/data'
import util from '../assets/utils/generateId.js'
import router from '../router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    users: usersData,
    companies: companiesData,
    posts: []
  },
  getters: {
    // Ovako uradis ako hoces da prosledis nesto u getter tamo odakle ga pozivas, inace je ovako kao dole
    users: (state) => (companyId) => {
      if (companyId) {
        const company = state.companies.find(current => current.id === companyId)
        return company.users
      }
      return state.users
    },
    upperCasedUsers(state) {
      const upperCasedUsers = state.users.map(user => {
        return { ...user, firstName: user.firstName.toUpperCase() }
      })
      return upperCasedUsers
    },
    companies(state) {
      return state.companies
    }
  },
  mutations: {
    addUser(state, newUser) {
      const userId = util.generateId()
      state.users.push({ ...newUser, id: userId })
      state.companies.forEach(company => {
        if (company.id === newUser.company.id) {
          company.users.push(newUser)
        }
      })
      router.push('/')
    },
    editUser(state, editedUser) {
      state.users.forEach(current => {
        if (current.id === editedUser.id) {
          if (!(current.company.id === editedUser.company.id)) {
            const companyIndexes = state.companies.map(curr => curr.id)
            const deleteFromCompanyIndex = companyIndexes.indexOf(current.company.id)
            const addToCompanyIndex = companyIndexes.indexOf(editedUser.company.id)

            // Delete
            state.companies[deleteFromCompanyIndex].users.splice(state.companies[deleteFromCompanyIndex].users.map(curr => curr.id).indexOf(current.id), 1)
            // Add
            state.companies[addToCompanyIndex].users.push(editedUser)
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
      router.push('/')
    },
    deleteUser: (state, user) => {
      state.users = state.users.filter(currentUser => currentUser.id !== user.id)
      const indexOfCompany = state.companies.map(curr => curr.id).indexOf(user.company.id)
      const indexOfUserInCompany = state.companies[indexOfCompany].users.map(curr => curr.id).indexOf(user.id)
      state.companies[indexOfCompany].users.splice(indexOfUserInCompany, 1)
    },
    addCompany(state, newCompany) {
      const companyId = util.generateId()
      state.companies.push({ ...newCompany, id: companyId })
      router.push('/companies')
    },
    editCompany(state, editedCompany) {
      state.companies.forEach(current => {
        if (current.id === editedCompany.id) {
          current.id = editedCompany.id
          current.label = editedCompany.label
          current.city = editedCompany.city
          current.country = editedCompany.country
        }
      })
      state.users.forEach(user => {
        if (user.company.id === editedCompany.id) {
          user.company.id = editedCompany.id
          user.company.label = editedCompany.label
        }
      })
      router.push('/companies')
    },
    deleteCompany(state, company) {
      state.companies = state.companies.filter(currentUser => currentUser.id !== company.id)
      state.users.forEach(user => {
        if (user.company.id === company.id) {
          user.company = {}
        }
      })
    },
  },
  actions: {}
})