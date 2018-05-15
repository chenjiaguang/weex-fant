<template>
  <div class="index-wrapper">
    <text class="greeting">The env is ready!</text>
    <text @click="navigate('home', '/home')">Home</text>
    <text @click="navigate('articleDetail', '/article/detail')">ArticleDetail</text>
    <text @click="navigate('friend', '/friend')">friend</text>
    <text @click="navigate('bindPhone', '/phone/bind')">bindPhone</text>
    <text @click="navigate('identifyPhone', '/phone/identify')">identifyPhone</text>
    <text @click="navigate('applyToutiao', '/toutiao/apply')">applyToutiao</text>
    <text @click="navigate('applyToutiaoSelect', '/toutiao/select?as=123')">applyToutiaoSelect</text>
    <text @click="navigate('applyToutiaoForm', '/toutiao/form')">applyToutiaoForm</text>
    <text @click="navigate('applyToutiaoSuccess', '/toutiao/success')">applyToutiaoSuccess</text>
  </div>
</template>

<script>
import FtNavigator from '../lib/FtNavigator'
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
      console.log('options', options, this.$router.push)
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
