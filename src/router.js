import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from './components/Users.vue'
import Companies from './components/Companies.vue'
import Posts from './components/Posts.vue'
import UserPage from './components/UserPage.vue'
import CompanyPage from './components/CompanyPage.vue'
import PostPage from './components/PostPage.vue'


// ovde pises routes...moze direktno ili u odvojenom fajlu
Vue.use(VueRouter)

export default new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: "/",
      name: 'Users',
      component: Users
    },
    {
      path: "/companies",
      name: 'Companies',
      component: Companies
    },
    {
      path: "/newsletter",
      name: 'Posts',
      component: Posts
    },
    {
      path: "/add-user",
      name: 'Add User',
      component: UserPage
    },
    {
      path: "/edit-user/:id",
      name: 'Edit User',
      component: UserPage
    },
    {
      path: "/add-company",
      name: 'Add Company',
      component: CompanyPage
    },
    {
      path: "/edit-company/:id",
      name: 'Edit Company',
      component: CompanyPage
    },
    {
      path: "/newsletter/:id",
      name: 'Edit Post',
      component: PostPage
    }
  ]
})