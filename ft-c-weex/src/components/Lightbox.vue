<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
  <div>
    <wxc-mask :width="width"
            :height="750"
            aria-hidden="true"
            :show="show"
            :show-close="true"
            :mask-bg-color="'#000000'"
            :overlay-cfg="{
              hasAnimation: true,
              timingFunction: ['ease-in', 'ease-out'],
              canAutoClose: true,
              duration: 300,
              opacity: 1
            }"
            @wxcMaskSetHidden="maskOverlayClick">
      <slider auto-play="false"
              v-if="show"
              :index="index"
              style="height:750px;">
        <div v-for="(v,index) in imageList"
            :key="index" style="height:750px;flex-direction:row;align-items: center;">
          <image resize="cover"
                :src="v.src"
                :style="{ height:  v.height + 'px', width: v.width  + 'px'}" />
        </div>

      </slider>
    </wxc-mask>
  </div>
</template>

<style scoped>
</style>

<script>
import { WxcMask } from 'weex-ui'

export default {
  components: {
    WxcMask
  },
  props: {
    width: {
      type: [Number, String],
      default: 750
    },
    show: {
      type: Boolean,
      default: false
    },
    imageList: Array,
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    maskOverlayClick () {
      this.$emit('wxcLightboxOverlayClicked', {})
    }
  }
}
</script>
