// TODO:正在加载中及没有更多数据的提示
// TODO:clickInShare事件；
// TODO:暂时放弃修改:title左右滑动条出现问题
<template>
  <div>
    <scroller ref="scroller" :style="{height:clientHeight+'px'}" v-if="specialinfo" show-scrollbar="false">
      <div ref="detailHeader" style="padding-left: 30px;padding-right: 30px;">
        <specialDetailHeader :special="specialinfo.special" style="margin-bottom:80px"></specialDetailHeader>
      </div>
      <div ref="scrollerFlag"></div>
      <tabPage
                :tab-titles="getTabs()"
                :tab-styles="{
                  bgColor: '#FFFFFF',
                  titleColor: '#000000',
                  isActiveTitleBold: true,
                  width: 240,
                  height: 86,
                  fontSize: 32,
                  hasActiveBottom: true,
                  activeBottomColor: '#1EB0FD',
                  activeBottomHeight: 6,
                  activeBottomWidth: 40,
                  textPaddingLeft: 30,
                  textPaddingRight: 30
                }"
                title-type="text"
                :tab-page-height="clientHeight"
                @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
          <list :ref="`list${i}`" v-for="(articles,i) in articlesList"
                :key="i"
                class="item-container"
                :style="{height:listHeight+'px'}"
                @scroll="scroll" offset-accuracy="80" @loadmore="loadArticlesMore(i)" loadmoreoffset="200">
            <cell style="padding-left: 30px;padding-right: 30px;">
              <articleList :ref="`articleList${i}`"
              :articles="articles" :key="i" @clickInShare="clickInShare"></articleList>
            </cell>
          </list>
      </tabPage>

    </scroller>
    <fixedWelcome  @clickInShare="clickInShare"></fixedWelcome>
  </div>
</template>

<script>
import SpecialDetailHeader from '@/components/special_detail/SpecialDetailHeader.vue'
import Elements from '@/components/special_detail/Elements.vue'
import ArticleList from '@/components/special_detail/ArticleList.vue'
import FixedWelcome from '@/components/share/FixedWelcome.vue'
import TabPage from '@/components/ui/TabPage.vue'
import Download from '@/lib/download'
const stream = weex.requireModule('stream')
const dom = weex.requireModule('dom')
var lastContentOffset = null
export default {
  components: {
    specialDetailHeader: SpecialDetailHeader,
    fixedWelcome: FixedWelcome,
    elements: Elements,
    articleList: ArticleList,
    tabPage: TabPage
  },
  data () {
    return {
      specialinfo: null,
      selected: 0,
      articlesList: [],
      headerHeight: 2000,
      clientHeight: 2000,
      listHeight: 2000,
      scrollDistance: 80,
      lastScrollDownTime: 0
    }
  },
  methods: {
    clickInShare () {
      Download.click()
    },
    // 获取tabtitle
    getTabs () {
      return this.specialinfo ? this.specialinfo.elements.map((element) => { return {title: element.name} }) : []
    },
    // tabtitle点击事件
    wxcTabPageCurrentTabSelected (e) {
      this.loadArticlesFirst(e.page)
    },
    // 初始加载
    loadArticlesFirst (i) {
      if (!this.articlesList[i] || this.articlesList[i].length === 0) {
        this.loadArticlesMore(i)
      }
    },
    // 加载更多
    loadArticlesMore (i) {
      let id = this.specialinfo.elements[i].id
      if (this.specialinfo.elements[i].pn === undefined) {
        this.specialinfo.elements[i].pn = 0
      }
      let pn = ++this.specialinfo.elements[i].pn
      stream.fetch({
        method: 'POST',
        url: this.$domain + '/jv/anonymous/newsarticle/elementarticles',
        type: 'json',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, pn: pn})
      },
      res => {
        let newArticles = res.data.data.list
        for (let j = 0; j < newArticles.length; j++) {
          // Vue.set(this.articlesList, i, newArticles[j])
          this.articlesList[i].push(newArticles[j])
        }
        if (newArticles.length > 0) {
          let index = 'list' + i
          if (this.$refs[index] && this.$refs[index].length > 0) {
            this.$refs[index][0].resetLoadmore()
          }
        }
      })
    },
    scroll (e) {
      if (lastContentOffset && e.contentOffset.y <= -this.scrollDistance && e.contentOffset.y <= lastContentOffset.y) {
        // 每隔一段时间，才检测一次触发
        let now = new Date().getTime()
        if (now > this.lastScrollDownTime + 1500) {
          // let el = this.$refs.list0[0]
          let el = this.$refs.scrollerFlag
          dom.scrollToElement(el, { offset: 0 })
          this.lastScrollDownTime = now
        }
      } else if (lastContentOffset && lastContentOffset.y < this.scrollDistance && e.contentOffset.y >= this.scrollDistance) {
        dom.scrollToElement(this.$refs.detailHeader, { offset: 0 })
      }
      lastContentOffset = e.contentOffset
    }
  },
  created () {
    dom.getComponentRect('viewport', (e) => {
      console.log(e)
      if (e.result === true || e.result === 1) {
        this.clientHeight = e.size.height
        this.listHeight = e.size.height - 86
        console.log('this.clientHeight' + this.clientHeight)
      }
    })
    stream.fetch({
      method: 'POST',
      url: this.$domain + '/jv/anonymous/newsspecial/specialinfo',
      type: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    res => {
      this.specialinfo = res.data.data
      for (let i = 0; i < this.specialinfo.elements.length; i++) {
        this.articlesList.push([])
      }
      this.loadArticlesFirst(0)
      this.$nextTick(() => {
        dom.getComponentRect(this.$refs.detailHeader, (e) => {
          if (e.result === true || e.result === 1) {
            this.headerHeight = e.size.height
            console.log('this.headerHeight' + this.headerHeight)
          }
        })
      })
    })
  }
}
</script>

<style scoped>
  .item-container {
    width: 750px;
    background-color: #ffffff;
  }
</style>
