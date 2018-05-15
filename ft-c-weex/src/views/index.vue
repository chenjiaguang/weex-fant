<template>
  <div class="index-wrapper">
    <text class="greeting">The env is ready!</text>
    <text @click="navigate('home', '/home')">Home</text>
    <text @click="navigate('articleDetail', '/article/detail?id=7486')">文章-图集</text>
    <text @click="navigate('articleDetail', '/article/detail?id=13887')">文章-普通</text>
    <text @click="navigate('articleDetail', '/article/detail?id=14356')">文章-微信</text>
    <text @click="navigate('specialDetail', '/special/detail')">专题</text>
    <text @click="navigate('dynamicArticleDetail', '/dynamicArticle/detail?id=506')">动态长文</text>
    <text @click="navigate('friend', '/friend')">friend</text>
    <text @click="navigate('bindPhone', '/phone/bind')">bindPhone</text>
    <text @click="navigate('identifyPhone', '/phone/identify')">identifyPhone</text>
    <text @click="navigate('applyToutiao', '/toutiao/apply')">applyToutiao</text>
    <text @click="navigate('applyToutiaoSelect', '/toutiao/select')">applyToutiaoSelect</text>
    <text @click="navigate('applyToutiaoForm', '/toutiao/form')">applyToutiaoForm</text>
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
  .greeting {
    text-align: center;
    margin-top: 70px;
    font-size: 50px;
    color: #41B883;
  }
</style>
