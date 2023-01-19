<template>
  <article class="list-item list-item--post">
    <router-link v-bind:to="`/newsletter/${post.id}`">
      <span>Title: <h4>{{post.title}}</h4></span>
      <br/>
      <span>Description: <h5>{{post.body}}</h5></span>
  </router-link>
  </article>
</template>

<script>
export default {
  props: ['post'],
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>

<style>
@import './List/List.css';
</style>