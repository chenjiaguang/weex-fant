<template>
  <div class="box">
    <div class="row space-between center">
      <div class="left row">
        <image class="logo" src="@/../static/images/logo.png" />
        <div class="text-box column space-between">
          <text class="title">范团</text>
          <text class="desc">一手掌握海南新鲜事</text>
        </div>
      </div>
      <div class="right">
        <text class="go" @click="$emit('clickInShare')">立即打开</text>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['dynamic'],
  data () {
    return {}
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
  opacity: 0.8;

  z-index:99999;

  /* border-top-width: 1px;
  border-top-color: #CBCBCB; */
}
.logo{
  height: 88px;
  width: 88px;
}
.go{
  height: 60px;
  width: 180px;
  background-color: #ff3f53;
  color: #FFFFFF;
  font-size: 32px;
  line-height: 60px;
  text-align: center;
}
.text-box{
  margin-left: 20px
}
.title{
  color: #FFFFFF;
  font-size: 36px;
}
.desc{
  color: #FFFFFF;
  font-size: 24px;
}
</style>
