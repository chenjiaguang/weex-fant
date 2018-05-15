// TODO:clickInShare事件；logo图片；url读取参数
<template>
  <div class="wrapper">
    <scroller style="padding-left: 30px;padding-right: 30px;padding-top: 30px;" v-if="dynamic">
      <detailHeader :data="dynamic" style="margin-bottom:80px" @clickInShare="clickInShare"></detailHeader>
      <dynamicArticleContent :dynamic="dynamic"  style="margin-bottom:60px"></dynamicArticleContent>
      <comments  style="margin-bottom:188px" @clickInShare="clickInShare"></comments>
      <fixedWelcome @clickInShare="clickInShare"></fixedWelcome>
    </scroller>
  </div>
</template>

<script>
import Header from '../components/detail/Header.vue'
import DynamicArticleContent from '../components/detail/DynamicArticleContent.vue'
import Comments from '../components/share/Comments.vue'
import FixedWelcome from '../components/share/FixedWelcome.vue'
const stream = weex.requireModule('stream')
const modal = weex.requireModule('modal')
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
      url: 'http://fanttest.fantuanlife.com/jv/anonymous/qz/dynamicarticle',
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
  },
  methods: {
    clickInShare () {
      modal.toast({
        message: 'jump',
        duration: 0.3
      })
    }
  }
}
</script>

<style scoped>

</style>
