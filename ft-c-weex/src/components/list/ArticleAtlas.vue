<template>
  <div class="article-box"   @click="clickArticle(article.id)">
    <text class="article-content">{{article.name}}</text>
    <div class="article-image-box" >
      <image class="article-image" :src="article.covers[0].compress" resize="cover"/>
      <text class="pic-num">{{article.atlas_num}}</text>
    </div>
    <div class="article-foot row flex-end">
      <text class="article-username">{{article.username}}</text>
      <text class="article-dateTime" v-if="article.time">{{article.time}}</text>
      <text class="article-commentNum">{{article.read_num}}</text>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object
    }
  },
  data () {
    return {
      in_share: this.$route.query.in_share === 'true'
    }
  },
  methods: {
    clickArticle (id) {
      this.$FtNavigator.push({weex_url: 'articleDetail', web_url: '/article/detail?' + (this.in_share ? 'in_share=true&' : '') + 'id=' + id})
    }
  }
}
</script>

<style src='@/common.css' />
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
