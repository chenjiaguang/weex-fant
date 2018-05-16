<template>
  <div ref="wrapper" class="apply-toutiao-wrapper" style="align-items:center;flex:1;" @viewappear="viewAppear">
    <image :src="success_icon" style="width:190px;height:190px;margin-top:120px;"></image>
    <text style="font-size:36px;line-height:50px;color:#333333;margin-top:40px;">申请成功！</text>
    <text style="width:690px;font-size:28px;line-height:40px;color:#333333;margin-top:50px;text-align:center;">您可以在电脑上进入（{{toutiao_link}}），用此账号登录范团头条作者后台即可。</text>
    <button text="完成" :disabled="{value: false}" :primary="true" :clickHandler="backNative" style="width:690px;height:90px;margin-top:130px;"></button>
  </div>
</template>

<script>
  import Button from '../components/Button.vue'
  export default {
    data () {
      return {
        success_icon: '../static/images/success_icon.png',
        toutiao_link: 'toutiao.fantuanlife.com'
      }
    },
    components: { Button },
    methods: {
      viewAppear() {
        const animation = weex.requireModule('animation')
        const animation_el = this.$refs['wrapper']
        animation.transition(animation_el, {
          styles: {
            'backgroundColor': '#f5f5f5'
          },
          duration: 500, //ms
          timingFunction: 'ease',
          delay: 0 //ms
        })
      },
      backNative () {
        console.log('backNative')
        // 跳转原生'我的'页面
      }
    }
  }
</script>

<style scoped>
  .section{
    width:750px;
    padding-top:35px;
    padding-left:30px;
    padding-right:30px;
    align-items:stretch;
  }
  .section-header{
    font-size:48px;
    line-height:58px;
    font-weight:700;
    color:#333333;
  }
  .item-title{
    font-size:28px;
    line-height:38px;
    color:#333333;
  }
  .err-tip{
    flex-direction: row;
    align-items:center;
    justify-content: flex-start;
    margin-left:23px;
  }
  .err-icon{
    width:24px;
    height:24px;
    margin-right:19px;
  }
  .err-title{
    font-size:24px;
    line-height:24px;
    color:#FF3F53;
  }
  .form-item{
    margin-top:35px;
  }
  .err-item{
    border-bottom-width:1px;
    border-bottom-color:#FF3F53;
  }
  .correct-item{
    border-bottom-width:1px;
    border-bottom-color:#e5e5e5;
  }
  .item-value-tip{
    flex-direction: row;
    padding-top:20px;
  }
  .item-value{
    font-size:32px;
    line-height:72px;
    height:72px;
    flex:1;
    font-weight:700;
    flex-direction:row;
    align-items:center;
  }
  .correct-textarea{
    font-size:32px;
    line-height:40px;
    color:#333333;
    font-weight:700;
    padding-top:16px;
    padding-bottom:14px;
    padding-left:12px;
    padding-right:12px;
    border-radius:4px;
    border-width:1px;
    border-color:#e5e5e5;
    margin-top:35px;
  }
  .err-textarea{
    font-size:32px;
    line-height:40px;
    color:#333333;
    font-weight:700;
    padding-top:16px;
    padding-bottom:14px;
    padding-left:12px;
    padding-right:12px;
    border-radius:4px;
    border-width:1px;
    border-color:#FF3F53;
    margin-top:35px;
  }
  .empty-input{
    font-weight:400;
    color:#999999;
  }
  .section-separator{
    width:750px;
    height:10px;
    background-color:#E5E5E5;
    margin-top:40px;
  }
</style>
