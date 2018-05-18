<template>
  <div v-if="in_share">
    <text class="text" @click="$emit('clickInShare')" v-if="num==0">暂无评论，来范团APP写神评！</text>
    <text class="text" @click="$emit('clickInShare')" v-if="num>0">打开范团APP，查看全部精彩评论</text>
  </div>
</template>
<script>
export default {
  props: {
    num: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      in_share: this.$route.query.in_share === 'true'
    }
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
