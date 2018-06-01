<template>
  <div>
    <div v-for="(content,index) in dynamic.contents" :key="index">
      <div @click="openLightBox(index)">
        <image class="article-image" v-if="content.type==2" :src="content.imageUrl"
        :style="{height:content.height+'px'}"
        @click="openLightBox(content.imageIndex)"/>
      </div>
      <text class="article-desc" v-if="content.type==2&&content.des">{{content.des}}</text>
      <text class="article-content" v-if="content.type==1">{{content.content}}</text>
    </div>
    <div class="foot-info-box">
      <image class="image-map" :src="mapSrc" v-if="dynamic.location"/>
      <text class="location" v-if="dynamic.location">{{dynamic.location}}</text>
      <text class="viewNum">{{dynamic.read_num}}次浏览</text>
    </div>
    <lightbox
      ref="lightbox"
      :show="show"
      :index.sync="index"
      :height="clientHeight"
      :image-list="imageList"
      @wxcLightboxOverlayClicked="wxcLightboxOverlayClicked">
      <div slot="top" :style="{height:topHeight+'px'}" class="top center">
        <text class="top-text">{{index+1}} / {{this.imageList.length}}</text>
        <image class="top-close" :src="closeImg" @click="maskClose"/>
      </div>
    </lightbox>
  </div>
</template>

<script>
import Lightbox from '@/components/ui/Lightbox.vue'
const dom = weex.requireModule('dom')
let i = 0
export default {
  components: {
    'lightbox': Lightbox
  },
  props: ['dynamic'],
  data () {
    return {
      closeImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA+CAYAAABzwahEAAAABGdBTUEAALGPC/xhBQAAAnBJREFUaAXV2z1Ow0AQBeAoRUSDlCOAcgu6FIGCjgLaNByAIwUoaaAKB6CAO3ADmhQIUZk3kYY4kZ3s2PvzZqSJHdubzLdrG+zIg0Etqqq6RX4hP5HT2ip3s6j/GPmE/EY+I8eNCKy4Q9bjB29mjRuTL0Tdgn6rYzD/gdzGY8EuWtu4w6PwJrR6Nngskd17Xwj+nHyQ1+Whzn1oNb5jZjTAixzTh4J+5AEIQavzeoiuWgWM5hG2eUErymNe0KhviTwLsMgmKxnxKVJGNCToRh5FW0ZajIv/zsGbGdIdHjVb0Y9oI3v5Jrzho6CV7wUfFe0FnwTNju+AfkCb7WNakW1TNKA64WVBa2ew4LOiWfBF0KXxRdGl8BTo3HgqdC48JTo1nhqdCu8CHRvvCh0L7xLdF+8a3QN/BfjuLWAsag37BYcWl3qKki0XNq3ChhW8aO3UBHh+dAK8H3REvD90BLxfdA0vZ29LvGJj2+0i/TKWKQDW+97SQXQ/Wpj6syNa4BI+8Si8y0ivxbUXX/hIaPX7wEdG+8B3QC/RRkY0JDhHHpVbj+l7tBkiLf/bc+G7ovVPhEt8X7RLfCy0K3xstAt8B7TpggOfz3fCS42mHPlcaCp8bjQFvhS6KL40ugieBZ0Vz4bOgmdFJ8Wzo5PgvaCj4r2ho+C9onvjAZdHlELDdMGhxaWeonjLhY08jnUiTyjITEhQorVTAbDg5wKXh9EOBTXaiJd7dxOBj5HyPFZbuEAH4n+BvNRt9+FdoRUEXNNuv42ubSwjLw+jaSww4/ZXS9QueD1/ye69GWlF6xQrR8gb5IUu8zyF4xQ5R052HX9qsZEt+r9hmwAAAABJRU5ErkJggg==',
      mapSrc: 'data:image/png;base64,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',
      imageList: this.dynamic.contents.filter(content => {
        return content.type === '2'
      }).map(content => {
        content.imageIndex = i++
        content.height = Math.round(content.height / content.width * 750)
        content.width = 750
        return {src: content.imageUrl, height: content.height, width: content.width, text: 'hahahahah'}
      }),

      show: false,
      index: 0,
      clientHeight: 2000,
      topHeight: 146
    }
  },
  created () {
    dom.getComponentRect('viewport', (e) => {
      console.log(e)
      if (e.result === true || e.result === 1) {
        this.clientHeight = e.size.height
      }
    })
  },
  methods: {
    openLightBox (i) {
      console.log(i)
      this.index = i
      this.show = true
    },
    wxcLightboxOverlayClicked () {
      // 无状态组件，需要在此次关闭
      this.show = false
    },
    maskClose () {
      this.$refs.lightbox.maskClose()
    }
  }
}
</script>

<style scoped>
.article-content{
  font-size:32px;
  color: #333333;
  margin-bottom: 30px;
}
.article-desc{
  font-size:24px;
  color: #999999;
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 50px;
}
.article-image{
  flex: 1;
  height: 418px;
  margin-left: -30px;
  margin-right: -30px;
  margin-bottom: 18px;
}
.foot-info-box{
  flex-direction: row;
  margin-top: 30px;
}
.image-map{
  height: 24px;
  width: 19px;
  margin-right: 10px;
  line-height: 28px;
}
.location{
  font-size:24px;
  line-height: 28px;
  color: #999999;
  margin-right: 30px;
}
.viewNum{
  font-size:24px;
  line-height: 28px;
  color: #999999;
}
.top{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding-left:42px;
  padding-right:42px;
  padding-top:56px;
  padding-bottom:56px;
}
.top-text{
  color: #ffffff;
  font-size: 32px;
  text-align:center;
}
.top-close{
  position: absolute;
  left:42px;
  top:56px;
  height: 34px;
  width: 34px;
}
</style>
