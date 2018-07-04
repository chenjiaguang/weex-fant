<template>
  <div v-if="in_share" class="box">
    <div class="row space-between center">
      <div class="left row">
        <image class="logo" src='@/../static/images/logo.png' />
        <text class="text-box title">有范又有趣的海南生活圈</text>
      </div>
      <div class="right">
        <image class="open" @click="$emit('clickInShare')" src='@/../static/images/open.png' />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['dynamic'],
  data () {
    return {
      in_share: this.$route.query.in_share === 'true'
    }
  }
}
</script>
<style src='@/common.css' />
<style scoped>
.box {
  position: fixed;
  height: 128px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 30px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #262626;

  z-index: 99999;
  background: rgba(0, 0, 0, 0.8);
  /* border-top-width: 1px;
  border-top-color: #CBCBCB; */
}
.open {
  height: 60px;
  width: 180px;
}
.logo {
  height: 88px;
  width: 88px;
}
.go {
  height: 60px;
  width: 180px;
  background-color: #ff3f53;
  color: #ffffff;
  font-size: 32px;
  line-height: 60px;
  text-align: center;
}
.text-box {
  margin-left: 20px;
}
.title {
  color: #ffffff;
  font-size: 32px;
  line-height: 88px;
}
.desc {
  color: #ffffff;
  font-size: 24px;
}
</style>
