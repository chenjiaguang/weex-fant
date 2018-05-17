<template>
  <div>
    <wxc-mask :width="width"
            :height="height"
            aria-hidden="true"
            ref="mask"
            :show="show"
            :show-close="false"
            :mask-bg-color="'#000000'"
            :overlay-cfg="{
              hasAnimation: true,
              timingFunction: ['ease-in', 'ease-out'],
              canAutoClose: true,
              duration: 300,
              opacity: 1
            }"
            @wxcMaskSetHidden="wxcMaskSetHidden">

      <slider auto-play="false"
              v-if="show"
              :index="index"
              :style="{height:height + 'px',zIndex:0}"
              @change="change">
        <div v-for="(v,i) in imageList"
            :key="i" style="flex-direction:row;align-items: center;">
          <image resize="cover"
                :src="v.src"
                :style="{ height:  v.height + 'px', width: v.width  + 'px'}" />
        </div>
      </slider>

      <slot name="top"></slot>
      <slot name="bottom"></slot>
    </wxc-mask>
  </div>
</template>

<style src='@/common.css'>
</style>
<style scoped>

</style>

<script>
import Mask from './Mask.vue'

export default {
  components: {
    'wxc-mask': Mask
  },
  props: {
    width: {
      type: [Number, String],
      default: 750
    },
    height: {
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
    maskClose () {
      this.$refs.mask.appearOverlay(false)
    },
    wxcMaskSetHidden () {
      this.$emit('wxcLightboxOverlayClicked', {})
    },
    change (e) {
      this.$emit('update:index', e.index)
    }
  },
  data () {
    return {}
  }
}
</script>
