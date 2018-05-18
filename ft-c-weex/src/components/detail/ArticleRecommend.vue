<template>
  <div>
    <text class="title">推荐阅读</text>
    <div class="box column">
      <div v-for="(recommend,index) in recommends" :key="index" @click="clickArticle(recommend.id)">
        <div class="line row center border"  v-if="index<(recommends.length-1)">
          <text class="article-title">{{recommend.name}}</text>
        </div>
        <div class="line row center"  v-if="!(index<(recommends.length-1))">
          <text class="article-title">{{recommend.name}}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array
    }},
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
.title{
  color: #333333;
  font-size: 36px;
  margin-bottom: 60px;
  font-weight:bold;
}
.box{
  background-color: #F9F9F9;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 4px ;
}
.line{
  height: 138px;
}
.article-title{
  color: #333333;
  font-size: 32px;
  flex: 1;
  lines: 2;
  text-overflow: ellipsis;
}
.border{
  border-bottom-width: 1px;
  border-bottom-color: #E5E5E5;
}
</style>
