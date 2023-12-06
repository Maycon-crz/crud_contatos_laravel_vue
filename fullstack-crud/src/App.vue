<template>
  <HeaderVue title="CRUD Laravel + VueJS"/>
  <router-view></router-view>
</template>

<script>
  import HeaderVue from './components/HeaderVue.vue'
  export default {
    name: 'App',
    components: {
      HeaderVue
    }
  }
</script>

<style>
</style>
