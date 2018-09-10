// TODO:图集图片尺寸适应
// 图集7486 文章13887 微信14356
<template>
  <div>
    <div v-if="article&&article.content_type==0">
      <scroller style="padding-left: 30px;padding-right: 30px;padding-top: 30px;">
        <articleDetailHeader :data="header" style="margin-bottom:36px" @clickInShare="clickInShare"></articleDetailHeader>
        <articleContent ref="articleContent" :article="article"  style="margin-bottom:100px"></articleContent>
        <articleRecommend :recommends="recommends" v-if="recommends" style="margin-bottom:60px" @clickInShare="clickInShare"></articleRecommend>
        <comments style="margin-bottom:188px" :num="article.comment_num" @clickInShare="clickInShare"></comments>
      </scroller>
      <fixedWelcome @clickInShare="clickInShare"></fixedWelcome>
    </div>
    <div v-if="article&&article.content_type==1">
      <lightbox
        ref="lightbox"
        :show="show"
        :index.sync="index"
        :height="clientHeight"
        :image-list="imageList"
        @wxcLightboxOverlayClicked="wxcLightboxOverlayClicked">
        <div slot="bottom"  class="bottom" :style="{paddingBottom:this.in_share?'158px':'30px'}">
          <text class="bottom-text">{{(index+1)+'/'+imageList.length + ' ' + imageList[index].text}}</text>
        </div>
      </lightbox>
      <fixedWelcome @clickInShare="clickInShare"></fixedWelcome>
    </div>
    <weixin :show.sync="showWeixin"></weixin>
  </div>
</template>

<script>
import ArticleDetailHeader from '@/components/detail/ArticleDetailHeader.vue'
import ArticleContent from '@/components/detail/ArticleContent.vue'
import ArticleRecommend from '@/components/detail/ArticleRecommend.vue'
import Comments from '@/components/share/Comments.vue'
import Weixin from '@/components/share/Weixin.vue'
import FixedWelcome from '@/components/share/FixedWelcome.vue'
import Lightbox from '@/components/ui/Lightbox.vue'
import Download from '@/lib/download'
import utils from '@/lib/utils'
const stream = weex.requireModule('stream')
const dom = weex.requireModule('dom')
export default {
  components: {
    articleDetailHeader: ArticleDetailHeader,
    articleContent: ArticleContent,
    articleRecommend: ArticleRecommend,
    comments: Comments,
    fixedWelcome: FixedWelcome,
    lightbox: Lightbox,
    weixin: Weixin
  },
  data () {
    return {
      article: null,
      recommends: null,
      show: true,
      clientHeight: 2000,
      index: 0,
      showWeixin: false,
      in_share: this.$route.query.in_share === 'true',
      showAll: this.$route.query.showAll === 'true'
    }
  },
  watch: {
    '$route': function (val) {
      const { platform } = weex.config.env
      const isWeb = typeof (window) === 'object' && platform.toLowerCase() === 'web'
      if (isWeb) {
        window.location.reload()
      }
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
    },
    imageList: function () {
      let i = 0
      return this.article.atlas_content.map(content => {
        content.imageIndex = i++
        content.height = 750
        content.width = 750
        return {src: content.img_url, height: content.height, width: content.width, text: content.content}
      })
    }
  },
  methods: {
    wxcLightboxOverlayClicked () {
      this.show = false
    },
    clickInShare () {
      Download.click(() => {
        this.showWeixin = true
      })
    }
  },
  created () {
    dom.getComponentRect('viewport', (e) => {
      if (e.result === true || e.result === 1) {
        this.clientHeight = e.size.height
      }
    })

    stream.fetch({
      method: 'POST',
      url: this.$domain + '/jv/anonymous/newsarticle/articledetail',
      type: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'id': this.$route.query.id, 'showAll': this.showAll})
    },
    res => {
      console.log(res)
      this.article = res.data.data
      if (this.article.content_type === '0') {
        // 如果是微信则读url
        let isWeixin = this.article.news_type === '2'
        if (isWeixin) {
          if (this.article.article_url.indexOf('mp.weixin.qq.com') > -1) {
            console.log(this.article.article_url)
            // 如果是微信链接
            let weixinUrl = encodeURIComponent(this.article.article_url)
            stream.fetch({
              method: 'GET',
              url: this.$domain + '/jv/anonymous/call/get?url=' + weixinUrl,
              type: 'json'
            },
            res => {
              let text = res.data.data.result
              // let rex = /<body id[^>]*>([\s\S]{100,})<\/body>/
              // text = rex.exec(text)[0]
              text = text.replace(/data-src/g, 'src')
              text = text.replace(/\\n/, '')
              this.$refs.articleContent.setContentFromWeixin(text)
            })
          } else {
            // 如果是范团微信内容链接
            // https://fanttest.fantuanlife.com/index.html#/article/detail?article_id=65
            this.$nextTick(() => {
              this.$refs.articleContent.setContentFromFantuanWeixin(this.article.content)
            })
          }
        } else {
          this.$nextTick(() => {
            this.$refs.articleContent.setContent(this.article.content)
          })
        }

        if (this.in_share) {
          // 推荐阅读
          stream.fetch({
            method: 'POST',
            url: this.$domain + '/jv/anonymous/newsarticle/recommendarticles',
            type: 'json',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({'id': this.$route.query.id})
          },
          res => {
            console.log(res)
            this.recommends = res.data.data.list
          })
        }
      }
      utils.weixinShareSet({
        title: res.data.data.shareInfo.shareTitle,
        desc: res.data.data.shareInfo.shareContent,
        url: res.data.data.shareInfo.shareUrl,
        imgUrl: res.data.data.shareInfo.shareImage
      })
    })
  }
}
</script>

<style scoped>
.bottom{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-left:30px;
  padding-right: 30px;
  padding-top: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  padding-bottom:158px;
  z-index: 1;
}
.bottom-text{
  color: #ffffff;
  font-size: 32px;
  opacity: 1;
}
</style>
