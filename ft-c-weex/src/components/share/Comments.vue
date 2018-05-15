<template>
  <text class="text" @click="$emit('clickInShare')">打开范团APP，查看全部精彩评论</text>
</template>

<script>
export default {
  props: ['dynamic'],
  data () {
    return {}
  }
}
</script>

<style scoped>
.text {
  flex: 1;
  text-align: center;
  color:#1EB0FD;
  font-size: 34px;
  background-color: #eff9ff;
  border-radius: 4px ;
  padding-top:28px;
  padding-bottom:28px;
}
</style>
