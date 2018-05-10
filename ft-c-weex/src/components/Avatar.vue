<template>
  <div class="avatar-wrapper" :style="{width: width || '100px', height: height || '100px'}">
    <image class="avatar-image" :src="avatar" :style="{borderRadius: width || height || 100}"></image>
    <div class="read-sign" v-if="!read" :style="{width: (width || 100) * 0.24 + 'px', height: (height || 100) * 0.24 + 'px', borderRadius: width || height || 100}">
      <div class="read-sign-content" :style="{width: (width || 100) * 0.16 + 'px', height: (height || 100) * 0.16 + 'px', borderRadius: width || height || 100}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['avatar', 'read', 'radius', 'placeholder', 'width', 'height'],
    data () {
      return {}
    }
  }
</script>

<style scoped>
  .avatar-wrapper{
    align-items:stretch;
  }
  .avatar-image{
    flex:1;
  }
  .read-sign{
    position:absolute;
    top:0;
    right:0;
    background-color:#ffffff;
    justify-content: center;
    align-items: center;
  }
  .read-sign-content{
    background-color:#FF3F53;
  }
</style>
