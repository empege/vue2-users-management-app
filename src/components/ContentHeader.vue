<!-- NOT USED ANYMORE -->
<template>
  <div>
    <h1 class="page__title">{{page_title || 'Users'}}:</h1>
    <div class="page__additional-btn-wrapper">
      <router-link v-bind:to="additional_btn_url">
        <button v-on:click="$emit('callback', 'not needed but you can pass something here to send to parent!')" class="page__additional-btn">{{additional_btn_label}}</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentHeader',
  props: ['additional_btn_url', 'additional_btn_label', 'callback'],
  // props: {
  //   receivedPropVar: {
  //     type: String, // Kao neki PropTypes
  //     required: true // Ako ga nema, izbaci gresku
  //   }
  // }
  data () {
    return {
      page_title: this.$route.name
    }
  },
}
</script>