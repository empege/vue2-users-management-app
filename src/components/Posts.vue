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
      posts: []
    }
  },
  created() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res=>res.json())
    .then(data => {
      console.log(data)
      this.posts = data
    })
  }
}
</script>

<style>
@import './List/List.css';
</style>