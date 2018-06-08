<template>
  <div class="index-wrapper">
    <text class="greeting">The env is ready!</text>
    <text @click="$FtNavigator.push({weex_url: 'home', web_url: '/home'})">Home</text>
    <text @click="$FtNavigator.push({weex_url: 'articleDetail', web_url: '/article/detail?in_share=true&id=7486'})">文章-图集</text>
    <text @click="$FtNavigator.push({weex_url: 'articleDetail', web_url: '/article/detail?in_share=true&id=13887'})">文章-普通</text>
    <text @click="$FtNavigator.push({weex_url: 'articleDetail', web_url: '/article/detail?in_share=true&id=14356'})">文章-微信</text>
    <text @click="$FtNavigator.push({weex_url: 'specialDetail', web_url: '/special/detail?in_share=true'})">专题</text>
    <text @click="$FtNavigator.push({weex_url: 'dynamicArticleDetail', web_url: '/dynamicArticle/detail?in_share=true&id=506'})">动态长文</text>
    <text @click="$FtNavigator.push({weex_url: 'friend', web_url: '/friend'})">friend</text>
    <text @click="$FtNavigator.push({weex_url: 'bindPhone', web_url: '/phone/bind'})">bindPhone</text>
    <text @click="$FtNavigator.push({weex_url: 'identifyPhone', web_url: '/phone/identify'})">identifyPhone</text>
    <text @click="$FtNavigator.push({weex_url: 'applyToutiao', web_url: '/toutiao/apply'})">applyToutiao</text>
    <text @click="$FtNavigator.push({weex_url: 'applyToutiaoSelect', web_url: '/toutiao/select'})">applyToutiaoSelect</text>
    <text @click="$FtNavigator.push({weex_url: 'applyToutiaoForm', web_url: '/toutiao/form'})">applyToutiaoForm</text>
    <text @click="$FtNavigator.push({weex_url: 'applyToutiaoSuccess', web_url: '/toutiao/success'})">applyToutiaoSuccess</text>
    <text @click="$FtNavigator.push({weex_url: 'setNewPassword', web_url: '/set/new/password'})">设置新密码</text>
    <text @click="$FtNavigator.push({weex_url: 'editPassword', web_url: '/edit/password'})">修改密码</text>
    <text @click="$FtNavigator.push({weex_url: 'userAgreement', web_url: '/user/agreement'})">范团用户协议</text>
    <text @click="$FtNavigator.push({weex_url: 'toutiaoAgreement', web_url: '/agreement?type=user'})">用户协议</text>
    <text @click="$FtNavigator.push({weex_url: 'communityRules', web_url: '/agreement?type=activity'})">活动协议</text>
    <text @click="$FtNavigator.push({weex_url: 'circleManageRules', web_url: '/agreement?type=author'})">作者协议</text>
  </div>
</template>

<script>
const modal = weex.requireModule('modal')
const navigator = weex.requireModule('navigator')
// todos:
// 1.原生封装上传图片，拍照上传功能
// 2.原生封装navigator导航功能（修改title/color，监听返回按钮回调，回退多级页面或replace功能，最好有传参功能）
// 3.关闭weex页面
// 4.原生跳转weex页面传参问题
// 5.weex跳转原生页面、及weex跳转原生页面传参问题
export default {
  name: 'App',
  data () {
    return {
      platform: weex.config.env.platform.toLowerCase(),
      navigator: navigator
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
