<template>
  <div class="article-box">
    <text class="article-content">{{article.content}}</text>
    <div class="article-image-box" >
      <image class="article-image" :src="image" v-for="(image,index) in article.images" :key="index" />
      <text class="pic-num">{{article.picNum}}</text>
    </div>
    <div class="article-foot row flex-end">
      <text class="article-username">{{article.username}}</text>
      <text class="article-dateTime" v-if="article.dateTime">{{article.dateTime}}</text>
      <text class="article-commentNum">{{article.commentNum}}</text>
    </div>
  </div>
</template>

<script>
export default {
  props: ['article'],
  data () {
    return {}
  }
}
</script>

<style src='../../common.css' />
<style scoped>
.article-box {
  border-bottom-width: 1px;
  border-bottom-color: #e5e5e5;
  padding-bottom: 20px;
  padding-top: 30px;
}
.article-content {
  font-size: 34px;
  color: #444444;
}
.article-image {
  flex:1;
  height: 388px;
  background-color: #f4f4f4;
  border-radius: 4px;
}
.article-image-box {
  margin-top: 20px;
}
.article-foot {
  padding-top: 20px;
}
.article-username {
  color: #999999;
  margin-right: 20px;
  font-size: 22px;
  line-height: 22px;
}
.article-dateTime {
  color: #999999;
  margin-right: 20px;
  font-size: 22px;
  line-height: 22px;
}
.article-commentNum {
  color: #999999;
  margin-right: 20px;
  font-size: 22px;
  line-height: 22px;
}
.pic-num{
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 60px;
  height: 38px;
  font-size: 24px;
  color: #FFFFFF;
  background-color:#999999;
  text-align: center;
  line-height: 38px;
  border-radius: 4px;
}
</style>
