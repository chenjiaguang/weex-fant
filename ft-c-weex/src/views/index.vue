<template>
  <div class="index-wrapper">
    <text class="greeting">The env is ready!</text>
    <text @click="navigate('home', '/home')">Home</text>
    <text @click="navigate('articleDetail', '/article/detail')">ArticleDetail</text>
  </div>
</template>

<script>
import FtNavigator from '../lib/FtNavigator'
export default {
  name: 'App',
  data () {
    return {}
  },
  methods: {
    navigate (weex, web) {
      let options = {
        instance: this,
        weex_url: weex,
        web_url: web
      }
      FtNavigator.push(options)
    }
  }
}
</script>

<style scoped>
  .wrapper {
    justify-content: center;
    align-items: center;
  }
  .greeting {
    text-align: center;
    margin-top: 70px;
    font-size: 50px;
    color: #41B883;
  }
</style>
