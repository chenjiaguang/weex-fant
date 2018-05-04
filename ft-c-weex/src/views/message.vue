<template>
  <div class="wrapper">
    <text>消息中心</text>
    <tabs :tabs="['sdfsd', '说到减肥', '水电费']"></tabs>
  </div>
</template>

<script>
  import Tabs from '../components/Tabs.vue'
  export default {
    data () {
      return {}
    },
    components: { Tabs }
  }
</script>

<style scoped></style>
