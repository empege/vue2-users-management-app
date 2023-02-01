<template>
  <div class="list page__inner-wrapper">
    <div class="content_header">
      <h1 class="page__title">{{page_title}}:</h1>
      <div class="page__additional-btn-wrapper">
      </div>
    </div>
    <section v-if="posts.length > 0" class="list__posts">
      <post-item v-for="post in posts" class="list__post" v-bind:post="post"></post-item>
    </section>
    <section v-else>
      <h1>Loading...</h1>
    </section>
    <div ref="infiniteScrollTrigger" class="list__scroll-trigger">...</div>
  </div>
</template>

<script>
import PostItem from './PostItem.vue'

export default {
  name: "Posts",
  components: {'post-item': PostItem},
  data() {
    return {
      page_title: this.$route.name,
      posts: [],
      startFrom: 0,
      amountPerPage: 5,
      currentAmount: 5,
      maxAmount: 100
    }
  },
  methods: {
    scrollTrigger() {
      const observer = new IntersectionObserver((entries) => {
        console.log('entries', entries)
        entries.forEach((entry) => {
          if(entry.intersectionRatio > 0 && this.currentAmount < this.maxAmount) {
            console.log('vece od nula - znaci ides na dole, prikazuje se nesto sto do sad nije')
            this.currentAmount += this.amountPerPage
            this.fetchPosts()
          }
        })
      })
      observer.observe(this.$refs.infiniteScrollTrigger)
    },
    fetchPosts() {
      fetch(`https://jsonplaceholder.typicode.com/posts?_start=${this.startFrom}&_limit=${this.currentAmount}`)
        .then(res=>res.json())
        .then(data => {
          console.log(data)
          this.posts = data
        })
    }
  },
  mounted() {
    this.scrollTrigger();
  },
  created() {
    this.fetchPosts();
  }
}
</script>

<style>
@import './List/List.css';
</style>