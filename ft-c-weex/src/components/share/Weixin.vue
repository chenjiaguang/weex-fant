<template>
  <div class="weixin-container">
      <wxc-overlay
      :show="show"
      :has-animation="false"
      opacity="0.6"
      @wxcOverlayBodyClicked="wxcOverlayBodyClicked"></wxc-overlay>
    <div v-if="show" class="box">
      <div class="row-reverse">
        <image class="image" src='@/../static/images/throw_arrow.png' />
      </div>
      <div class="text-box">
        <div class="row">
          <text class="text">1.点击右上角</text>
          <div id="menu-dot"><div></div><div></div><div></div></div>
        </div>
        <div class="row">
          <text class="text">2.选择在</text><text class="text" style="color:#ff3f53;padding-left:5px;padding-right:5px">浏览器</text><text class="text">中打开</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { WxcOverlay } from 'weex-ui'
export default {
  components: { WxcOverlay },
  props: ['show'],
  data () {
    return {}
  },
  methods: {
    wxcOverlayBodyClicked () {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style>
#menu-dot{
  display:inline-block;
  width:40px;
  height:30px;
  background:#323233;
  border-radius:6px;
  box-sizing:border-box;
  padding-top:12px;
  font-size:0;
  line-height:0;
  text-align:center;
  transform:scale(0.5, 0.5);
  transform-origin:50% 50%;
}

#menu-dot div{
  width:5px;
  height:5px;
  border-radius:50%;
  background:#fff;
  display:inline-block;
  margin:0 2px;
}
</style>

<style src='@/common.css' />
<style scoped>
.box{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.text-box{
  margin-top:20px;
  margin-left:30px;
  margin-right:30px;
  border-radius: 3px;
  background-color: #ffffff;
  padding: 30px;
}
.text{
  font-size: 32px;
  line-height: 48px;
}
.image{
  width: 80px;
  height: 127px;
}
.weixin-container{
  z-index: 99999;
}

</style>
