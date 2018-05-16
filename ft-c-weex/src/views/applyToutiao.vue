<template>
  <div class="apply-toutiao-wrapper" style="align-items:center;">
    <image ref="banner" :src="banner_image" @load="bannerLoaded" style="width:750px;height:540px;opacity:0;position:absolute;top:0;left:0;"></image>
    <div :class="['main-box', platform.toLowerCase() === 'android' ? 'main-box-android' : '']" style="margin-top:254px;width:690px;background-color:#ffffff;border-radius:11px;box-shadow: 0 2px 30px 0 rgba(100,100,100,0.36);padding-top:5px;padding-bottom:36px;">
      <div class="statement-box" v-for="(item, idx) in statements" :key="idx" style="margin-left:30px;margin-right:30px;padding-top:28px;">
        <div class="header" style="flex-direction:row;align-items:center;height:54px;">
          <image class="hint-icon" :src="hint_icon" style="width:40px;height:40px;margin-right:20px;"></image>
          <text style="font-size:34px;">{{item.title}}</text>
        </div>
        <text style="font-size:28px;color:#666666;line-height:38px;margin-left:60px;word-break:break-all;">{{item.content}}</text>
      </div>
    </div>
    <button text="成为头条号作者" :disabled="{value: false}" :primary="true" :clickHandler="goSelect" style="width:690px;height:90px;margin-top:40px;"></button>
  </div>
</template>

<script>
  import Button from '../components/Button.vue'
  import FtNavigator from '../lib/FtNavigator'
  export default {
    data () {
      return {
        platform: weex.config.env.platform,
        show_page: false,
        banner_image: '../static/images/apply_banner.png',
        hint_icon: '../static/images/icon_question.png',
        statements: [
          {
            title: '什么是范团头条？',
            content: '范团头条是海南本土首个内容创作平台，我们鼓励所有人在这里创作内容、分享自己的生活。目前范团头条主要以文章的形式展现，任何兴趣领域的内容都可以在这里发布。'
          },
          {
            title: '入驻范团头条有什么好处？',
            content: '你可以在这里获得对你的内容感兴趣的粉丝、志同道合的朋友、棋逢对手的知己，你可以在这里和他们互动、交流、分享。后期我们还会逐步增加作者收益，让你的所写有所得。'
          },
          {
            title: '如何入驻范团头条？',
            content: '点击下方“成为头条号作者”的按钮，填写简单的资料后，即可以在电脑上进入 http://toutiao.fantuanlife.com，开始进行创作。'
          }
        ]
      }
    },
    components: { Button },
    methods: {
      bannerLoaded (e) {
        if (e.success) {
          this.show_page = true
          const animation = weex.requireModule('animation')
          const anima_el = this.$refs['banner']
          animation.transition(anima_el, {
            styles: {
              opacity: 1
            },
            duration: 500, //ms
            timingFunction: 'ease',
            delay: 0 //ms
          })
        }
      },
      goSelect () {
        console.log('goSelect')
        this.$FtNavigator.push({weex_url: 'applyToutiaoSelect', web_url: '/toutiao/select'})
      }
    }
  }
</script>

<style scoped>
  .main-box-android{
    border-width:1px;
    border-color:rgba(100,100,100,0.36);
  }
</style>
