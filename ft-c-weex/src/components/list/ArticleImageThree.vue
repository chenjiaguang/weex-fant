<template>
  <div class="article-box" @click="clickArticle(article.id)">
    <text class="article-content">{{article.name}}</text>
    <div class="article-image-box row space-between" >
      <image class="article-image" :src="cover.compress" v-for="(cover,index) in article.covers" :key="index"  resize="cover"/>
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
    },
    in_share: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  methods: {
    clickArticle (id) {
      this.$FtNavigator.push({weex_url: 'articleDetail', web_url: '/article/detail?id=' + id})
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
  width: 226px;
  height: 170px;
  background-color: #f4f4f4;
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
</style>
