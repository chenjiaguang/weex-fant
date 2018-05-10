<template>
  <div class="wrapper" style="padding-bottom:188px">
    <scroller style="padding-left: 30px;padding-right: 30px;" v-if="dynamic">
      <detailHeader :data="dynamic"></detailHeader>
      <dynamicArticleContent :dynamic="dynamic"></dynamicArticleContent>
      <comments></comments>
      <fixedWelcome></fixedWelcome>
    </scroller>
  </div>
</template>

<script>
import Header from '../components/detail/Header.vue'
import DynamicArticleContent from '../components/detail/DynamicArticleContent.vue'
import Comments from '../components/share/Comments.vue'
import FixedWelcome from '../components/share/FixedWelcome.vue'
const stream = weex.requireModule('stream')
export default {
  components: {
    detailHeader: Header,
    dynamicArticleContent: DynamicArticleContent,
    comments: Comments,
    fixedWelcome: FixedWelcome
  },
  data () {
    return {
      dynamic: null
    }
  },
  created () {
    stream.fetch({
      method: 'POST',
      url: 'https://fanttest.fantuanlife.com/jv/anonymous/qz/dynamicarticle',
      type: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'id': '506'})
    },
    res => {
      console.log(res)
      this.dynamic = res.data.data
    })
  }
}
</script>

<style scoped>

</style>
