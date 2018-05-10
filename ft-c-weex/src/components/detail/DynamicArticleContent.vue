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
      <image class="image-map" :src="mapSrc" />
      <text class="location">{{dynamic.location}}</text>
      <text class="viewNum">{{dynamic.read_num}}次浏览</text>
    </div>
    <lightbox
      ref="lightbox"
      :show="show"
      :index="index"
      :image-list="imageList"
      @wxcLightboxOverlayClicked="wxcLightboxOverlayClicked">
    </lightbox>
  </div>
</template>

<script>
import Lightbox from '../../components/Lightbox.vue'
let i = 0
// import { WxcLightbox } from 'weex-ui'
export default {
  components: {
    'lightbox': Lightbox
  },
  props: ['dynamic'],
  data () {
    return {
      mapSrc: 'data:image/png;base64,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',
      imageList: this.dynamic.contents.filter(content => {
        return content.type === '2'
      }).map(content => {
        content.imageIndex = i++
        content.height = Math.round(content.height / content.width * 750)
        content.width = 750
        console.log(content.height + ',' + content.width)
        return {src: content.url, height: content.height, width: content.width}
      }),

      show: false,
      index: 0
    }
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
  margin-bottom: 60px;
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
</style>
