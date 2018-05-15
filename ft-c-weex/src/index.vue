<template>
  <div class="wrapper">
    <div class="inner-wrapper" style="flex:1;width:750px;" v-if="platform === 'web'">
      <router-view></router-view>
    </div>
    <div class="inner-wrapper" v-else>
      <text class="greeting">The env is ready!</text>
      <text @click="navigate('home', '/home')">Home</text>
      <text @click="navigate('articleDetail', '/article/detail')">ArticleDetail</text>
      <text @click="navigate('friend', '/friend')">friend</text>
      <text @click="navigate('bindPhone', '/phone/bind')">bindPhone</text>
      <text @click="navigate('identifyPhone', '/phone/identify')">identifyPhone</text>
      <text @click="navigate('applyToutiao', '/toutiao/apply')">applyToutiao</text>
      <text @click="navigate('applyToutiaoSelect', '/toutiao/select')">applyToutiaoSelect</text>
      <text @click="navigate('applyToutiaoForm', '/toutiao/form')">applyToutiaoForm</text>
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
  .wrapper{
    flex:1;
  }
  .greeting {
    text-align: center;
    margin-top: 70px;
    font-size: 50px;
    color: #41B883;
  }
</style>
