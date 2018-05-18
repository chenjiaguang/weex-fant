// TODO:幻灯片模式时背景可滚动问题
<template>
  <div v-if="dynamic">
    <scroller style="padding-left: 30px;padding-right: 30px;padding-top: 30px;" >
      <dynamicArticleDetailHeader :data="dynamic" style="margin-bottom:80px" @clickInShare="clickInShare"></dynamicArticleDetailHeader>
      <dynamicArticleContent :dynamic="dynamic"  style="margin-bottom:60px"></dynamicArticleContent>
      <comments  style="margin-bottom:188px" :num="dynamic.comment_num" @clickInShare="clickInShare"></comments>
    </scroller>
    <fixedWelcome @clickInShare="clickInShare"></fixedWelcome>
    <weixin :show.sync="showWeixin"></weixin>
  </div>
</template>

<script>
import DynamicArticleDetailHeader from '@/components/detail/DynamicArticleDetailHeader.vue'
import DynamicArticleContent from '@/components/detail/DynamicArticleContent.vue'
import Comments from '@/components/share/Comments.vue'
import Weixin from '@/components/share/Weixin.vue'
import FixedWelcome from '@/components/share/FixedWelcome.vue'
import Download from '@/lib/download'
const stream = weex.requireModule('stream')
export default {
  components: {
    dynamicArticleDetailHeader: DynamicArticleDetailHeader,
    dynamicArticleContent: DynamicArticleContent,
    comments: Comments,
    fixedWelcome: FixedWelcome,
    weixin: Weixin
  },
  data () {
    return {
      dynamic: null,
      showWeixin: false
    }
  },
  created () {
    stream.fetch({
      method: 'POST',
      url: this.$domain + '/jv/anonymous/qz/dynamicarticle',
      type: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'id': this.$route.query.id})
    },
    res => {
      console.log(res)
      this.dynamic = res.data.data
    })
  },
  methods: {
    clickInShare () {
      Download.click(() => {
        this.showWeixin = true
      })
    }
  }
}
</script>

<style scoped>

</style>
