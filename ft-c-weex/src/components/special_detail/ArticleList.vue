<template>
  <div class="article-list">
    <articleImageOne  @clickInShare="clickInShare" v-for="(article,index) in articles" :key="index" :article="article" v-if="article.type==1"></articleImageOne>
    <articleImageThree  @clickInShare="clickInShare" v-for="(article,index) in articles" :key="index" :article="article" v-if="article.type==3"></articleImageThree>
  </div>
</template>

<script>
import ArticleImageOne from '../list/ArticleImageOne.vue'
import ArticleImageThree from '../list/ArticleImageThree.vue'

export default {
  components: {
    articleImageOne: ArticleImageOne,
    articleImageThree: ArticleImageThree
  },
  props: {
    articles: {
      type: Array
    },
    in_share: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    // console.log('mounted')
    // if (this.articles == null || this.articles.length === 0) {
    //   this.$emit('loadArticles')
    // }
  },
  methods: {
    clickInShare () {
      this.$emit('clickInShare')
    }
  }
}
</script>

<style src='../../common.css' />
<style scoped>
</style>
