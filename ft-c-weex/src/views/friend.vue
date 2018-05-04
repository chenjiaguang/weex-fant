<template>
  <div class="wrapper">
    <text>我的好友</text>
    <tabs :tabs="tabs" align="space-around" :selected="tabs[selected] || tabs[0]"></tabs>
  </div>
</template>

<script>
  import Tabs from '../components/Tabs.vue'
  export default {
    data () {
      return {
        tabs: ['好友', '关注', '粉丝'],
        selected: 0
      }
    },
    components: { Tabs }
  }
</script>

<style scoped></style>
