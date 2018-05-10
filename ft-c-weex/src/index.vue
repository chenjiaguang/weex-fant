<template>
  <div class="wrapper">
    <div class="inner-wrapper" v-if="platform === 'web'">
      <router-view></router-view>
    </div>
    <div class="inner-wrapper" v-else>
      <text class="greeting">The env is ready!</text>
      <text @click="navigate('home', '/home')">Home</text>
      <text @click="navigate('articleDetail', '/article/detail')">ArticleDetail</text>
      <text @click="navigate('friend', '/friend')">friend</text>
      <text @click="navigate('test', '/test')">test</text>
    </div>
  </div>
</template>

<script>
import FtNavigator from './lib/FtNavigator'
export default {
  name: 'App',
  data () {
    return {
      platform: weex.config.env.platform.toLowerCase()
    }
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
  .greeting {
    text-align: center;
    margin-top: 70px;
    font-size: 50px;
    color: #41B883;
  }
</style>
