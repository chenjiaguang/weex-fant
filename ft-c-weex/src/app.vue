<template>
    <router-view v-if="platform === 'web'"></router-view>
    <index v-else></index>
</template>

<script>
import FtNavigator from './lib/FtNavigator'
import Index from '@/views/index.vue'
export default {
  name: 'App',
  data () {
    return {
      platform: weex.config.env.platform.toLowerCase()
    }
  },
  components: { Index },
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
