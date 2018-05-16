<template>
  <div ref="wrapper" class="apply-toutiao-wrapper" style="align-items:center;background-color:#F5F5F5;flex:1;padding-top:30px;" @disappear="disappearHandler">
    <div v-for="(item, idx) in options" :key="idx" @click="goForm(item.account_type)" style="width:690px;height:350px;justify-content:center;align-items:center;border-radius:8px;background-color:#ffffff;margin-bottom:30px;">
      <image :src="item.icon" style="width:168px;height:168px;margin-bottom:30px;"></image>
      <text style="font-size:32px;line-height:32px;color:#333333;">{{item.title}}</text>
    </div>
  </div>
</template>

<script>
  let modal = weex.requireModule('modal')
  const storage = weex.requireModule('storage')
  export default {
    data () {
      return {
        platform: weex.config.env.platform,
        options: [
          {
            title: '个人用户',
            icon: '../static/images/apply_person.png',
            account_type: 1
          },
          {
            title: '组织机构',
            icon: '../static/images/apply_organization.png',
            account_type: 2
          }
        ]
      }
    },
    methods: {
      disappearHandler (event) {
        console.log('disappearHandler')
      },
      goForm (type) {
        console.log('goForm', type)
        storage.setItem('apply_account_type', type, event => {
          if (event.result.toString() === 'success') {
            this.$FtNavigator.push({weex_url: 'applyToutiaoForm', web_url: '/toutiao/form'})
          }
        })
      }
    },
    mounted () {
      console.log('mounted', this.$route)
    }
  }
</script>

<style scoped>
  .main-box-android{
    border-width:1px;
    border-color:rgba(100,100,100,0.36);
  }
</style>
