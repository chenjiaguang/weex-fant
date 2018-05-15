<template>
  <div class="article-box">
    <div class="row" style="justify-content: space-between;">
      <div class="article-left">
        <text class="article-content">{{article.content}}</text>
        <div class="article-foot row flex-end">
          <text class="article-username">{{article.username}}</text>
          <text class="article-dateTime"  v-if="article.dateTime">{{article.dateTime}}</text>
          <text class="article-commentNum">{{article.commentNum}}</text>
        </div>
      </div>
      <div class="article-image-box row" >
        <image class="article-image" :src="image" v-for="(image,index) in article.images" :key="index" />
      </div>
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
  width: 226px;
  height: 170px;
  background-color: #f4f4f4;
}
.article-image-box {
  flex-direction: row;
  justify-content: space-between;
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
.article-left {
  flex:1;
  height: 170px;
  justify-content:space-between;
  flex-direction:column;
}
</style>
