<template>
  <div>
    <image class="image" :src="special.covers[0].compress" resize="cover"/>
    <text class="title">{{special.name}}</text>
    <text class="desc">{{special.intro}}</text>
  </div>
</template>

<script>
export default {
  props: ['special'],
  data () {
    return {
    }
  }
}
</script>

<style src='@/common.css' />
<style scoped>
.image{
  margin-left: -30px;
  margin-right: -30px;
  flex: 1;
  height: 300px;
  margin-bottom: 36px;
}
.title{
  color: #333333;
  font-size: 32px;
  margin-bottom: 24px;
  font-weight: bold;
}
.desc{
  color: #999999;
  font-size: 24px;
}
</style>
