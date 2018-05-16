<template>
  <div ref="wrapper" class="apply-toutiao-wrapper" style="align-items:center;background-color:#F5F5F5;flex:1;padding-top:30px;">
    <div v-for="(item, idx) in options" :key="idx" @click="goForm(item.account_type)" style="width:690px;height:350px;justify-content:center;align-items:center;border-radius:8px;background-color:#ffffff;margin-bottom:30px;">
      <image :src="item.icon" style="width:168px;height:168px;margin-bottom:30px;"></image>
      <text style="font-size:32px;line-height:32px;color:#333333;">{{item.title}}</text>
    </div>
  </div>
</template>

<script>
  import FtNavigator from '../lib/FtNavigator'
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
      navigate (weex, web) {
        let options = {
          instance: this,
          weex_url: weex,
          web_url: web
        }
        FtNavigator.push(options)
      },
      goForm (type) {
        console.log('goForm', type)
        storage.setItem('apply_account_type', type, event => {
          if (event.result.toString() === 'success') {
            this.navigate('applyToutiaoForm', '/toutiao/form')
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
