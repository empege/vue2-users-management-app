<template>
  <div class="add-edit">
    <div v-if="post">
      <h2>Title:</h2>
      <textarea name="" id="" cols="50" rows="5">{{post.title}}</textarea>
      <h2>Description:</h2>
      <textarea name="" id="" cols="50" rows="10">{{post.body}}</textarea>
      <section class="add-edit__comments">
        <h2>Comments</h2>
        <article v-for="comment in comments" class="add-edit__comment">
          <h3>{{comment.name}}</h3>
          <h4 v-if="showMore">{{comment.body | sliceText}}</h4>
          <h4 v-else>{{comment.body}}</h4>
          <transition name="slide-up"><span class="add-edit__comment-email">{{comment.email}}</span></transition>
          <button @click="showToggle" class="add-edit__comment-toggle-description">{{showMore ? 'Show more' : 'Show less'}}</button>
        </article>
      </section>
    </div>
    <div v-else><h1>Loading...</h1></div>
  </div>
</template>

<script>
export default {
  name: 'PostPage',
  data() {
    return {
      post: '',
      comments: [],
      showMore: true
    }
  },
  methods: {
    showToggle(){
      this.showMore = !this.showMore
    }
  },
  created() {
    fetch(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`)
    .then(res=>res.json())
    .then(data => {
      this.post = data
    })
    fetch(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}/comments`)
    .then(res=>res.json())
    .then(data => {
      this.comments = data
      console.log(data)
    })
  }
}
</script>

<style>
@import './AddEditPage/AddEditPage.css';
</style>