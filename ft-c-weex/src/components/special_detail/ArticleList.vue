<template>
  <div class="article-list">
    <articleImageOne  @clickInShare="clickInShare" v-for="(article,index) in articles" :key="index" :article="article" v-if="article.type==1"></articleImageOne>
    <articleAtlas  @clickInShare="clickInShare" v-for="(article,index) in articles" :key="index" :article="article" v-if="article.type==2"></articleAtlas>
    <articleImageThree  @clickInShare="clickInShare" v-for="(article,index) in articles" :key="index" :article="article" v-if="article.type==3"></articleImageThree>
  </div>
</template>

<script>
import ArticleImageOne from '../list/ArticleImageOne.vue'
import ArticleImageThree from '../list/ArticleImageThree.vue'
import ArticleAtlas from '../list/ArticleAtlas.vue'

export default {
  components: {
    articleImageOne: ArticleImageOne,
    articleImageThree: ArticleImageThree,
    articleAtlas: ArticleAtlas
  },
  props: {
    articles: {
      type: Array
    }
  },
  data () {
    return {
    }
  },
  methods: {
    clickInShare () {
      this.$emit('clickInShare')
    }
  }
}
</script>

<style src='@/common.css' />
<style scoped>
</style>
