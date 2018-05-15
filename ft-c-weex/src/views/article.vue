<template>
  <div class="wrapper" style="padding-bottom:188px">
    <scroller style="padding-left: 30px;padding-right: 30px;" v-if="article">
      <detailHeader :data="article"></detailHeader>
      <!-- <articleContent :article="article"></articleContent> -->
      <articleRecommend></articleRecommend>
      <comments></comments>
      <fixedWelcome></fixedWelcome>
    </scroller>
  </div>
</template>

<script>
import Header from '../components/detail/Header.vue'
import ArticleContent from '../components/detail/ArticleContent.vue'
import ArticleRecommend from '../components/detail/ArticleRecommend.vue'
import Comments from '../components/share/Comments.vue'
import FixedWelcome from '../components/share/FixedWelcome.vue'
const stream = weex.requireModule('stream')
export default {
  components: {
    detailHeader: Header,
    articleContent: ArticleContent,
    articleRecommend: ArticleRecommend,
    comments: Comments,
    fixedWelcome: FixedWelcome
  },
  data () {
    return {
      article: null
    }
  },
  computed: {
    header: function () {
      if (!this.article) {
        return null
      } else {
        return {
          title: this.article.name,
          avatar: this.article.avatar,
          username: this.article.news_name,
          time: this.article.time
        }
      }
    }
  },
  created () {
    stream.fetch({
      method: 'POST',
      url: 'http://fanttest.fantuanlife.com/news/detail',
      type: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'article_id': '12056'})
    },
    res => {
      console.log(res)
      this.article = res.data.data
    })
  }
}
</script>

<style scoped>

</style>
