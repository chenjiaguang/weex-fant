<template>
  <div>
    <scroller style="padding-left: 30px;padding-right: 30px;" v-if="article&&article.content_type==0">
      <detailHeader :data="header" style="margin-bottom:80px" @clickInShare="clickInShare"></detailHeader>
      <articleContent ref="articleContent" :article="article"  style="margin-bottom:100px"></articleContent>
      <articleRecommend :recommends="recommends" v-if="recommends" style="margin-bottom:60px" @clickInShare="clickInShare"></articleRecommend>
      <comments style="margin-bottom:188px" @clickInShare="clickInShare"></comments>
      <fixedWelcome  @clickInShare="clickInShare"></fixedWelcome>
    </scroller>
    <div v-if="article&&article.content_type==1">
      <lightbox
        ref="lightbox"
        :show="show"
        :index.sync="index"
        :height="clientHeight"
        :image-list="imageList"
        @wxcLightboxOverlayClicked="wxcLightboxOverlayClicked">
        <div slot="bottom"  class="bottom">
          <text class="bottom-text">{{(index+1)+'/'+imageList.length + ' ' + imageList[index].text}}</text>
        </div>
      </lightbox>
      <fixedWelcome  @clickInShare="clickInShare"></fixedWelcome>
    </div>
  </div>
</template>

<script>
import Header from '../components/detail/Header.vue'
import ArticleContent from '../components/detail/ArticleContent.vue'
import ArticleRecommend from '../components/detail/ArticleRecommend.vue'
import Comments from '../components/share/Comments.vue'
import FixedWelcome from '../components/share/FixedWelcome.vue'
import Lightbox from '../components/ui/Lightbox.vue'
const stream = weex.requireModule('stream')
const dom = weex.requireModule('dom')
const modal = weex.requireModule('modal')
export default {
  components: {
    detailHeader: Header,
    articleContent: ArticleContent,
    articleRecommend: ArticleRecommend,
    comments: Comments,
    fixedWelcome: FixedWelcome,
    lightbox: Lightbox
  },
  data () {
    return {
      article: null,
      recommends: null,
      show: true,
      clientHeight: 2000,
      index: 0
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
      modal.toast({
        message: 'jump',
        duration: 0.3
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
      url: 'http://fanttest.fantuanlife.com/jv/anonymous/newsarticle/articledetail',
      type: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      // 图集7486 文章13887 微信14356
      body: JSON.stringify({'id': '7486'})
    },
    res => {
      console.log(res)
      this.article = res.data.data
      if (this.article.content_type === '0') {
        // 如果是微信则读url
        let isWeixin = this.article.news_type === '2'
        if (isWeixin) {
          let weixinUrl = this.article.article_url
          stream.fetch({
            method: 'GET',
            url: weixinUrl
          },
          res => {
            res.data = res.data.replace(/data-src/g, 'src')
            this.$refs.articleContent.setContentFromWeixin(res.data)
          })
        } else {
          this.$nextTick(() => {
            this.$refs.articleContent.setContent(this.article.content)
          })
        }

        // 推荐阅读
        stream.fetch({
          method: 'POST',
          url: 'http://fanttest.fantuanlife.com/jv/anonymous/newsarticle/recommendarticles',
          type: 'json',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({'id': '54'})
        },
        res => {
          console.log(res)
          this.recommends = res.data.data.list
        })
      }
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
}
.bottom-text{
  color: #ffffff;
  font-size: 32px;
  opacity: 1;
}
</style>
