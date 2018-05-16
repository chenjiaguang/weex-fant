<template>
  <div class="index-wrapper">
    <text class="greeting">The env is ready!</text>
    <text @click="$FtNavigator.push({weex_url: 'home', web_url: '/home'})">Home</text>
    <text @click="$FtNavigator.push({weex_url: 'articleDetail', web_url: '/article/detail?id=7486'})">文章-图集</text>
    <text @click="$FtNavigator.push({weex_url: 'articleDetail', web_url: '/article/detail?id=13887'})">文章-普通</text>
    <text @click="$FtNavigator.push({weex_url: 'articleDetail', web_url: '/article/detail?id=14356'})">文章-微信</text>
    <text @click="$FtNavigator.push({weex_url: 'specialDetail', web_url: '/special/detail'})">专题</text>
    <text @click="$FtNavigator.push({weex_url: 'dynamicArticleDetail', web_url: '/dynamicArticle/detail?id=506'})">动态长文</text>
    <text @click="$FtNavigator.push({weex_url: 'friend', web_url: '/friend'})">friend</text>
    <text @click="$FtNavigator.push({weex_url: 'bindPhone', web_url: '/phone/bind'})">bindPhone</text>
    <text @click="$FtNavigator.push({weex_url: 'identifyPhone', web_url: '/phone/identify'})">identifyPhone</text>
    <text @click="$FtNavigator.push({weex_url: 'applyToutiao', web_url: '/toutiao/apply'})">applyToutiao</text>
    <text @click="$FtNavigator.push({weex_url: 'applyToutiaoSelect', web_url: '/toutiao/select'})">applyToutiaoSelect</text>
    <text @click="$FtNavigator.push({weex_url: 'applyToutiaoForm', web_url: '/toutiao/form'})">applyToutiaoForm</text>
    <text @click="$FtNavigator.push({weex_url: 'applyToutiaoSuccess', web_url: '/toutiao/success'})">applyToutiaoSuccess</text>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      platform: weex.config.env.platform.toLowerCase()
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
