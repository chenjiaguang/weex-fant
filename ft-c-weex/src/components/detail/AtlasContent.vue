<template>
  <lightbox
    ref="lightbox"
    :show="show"
    :index="index"
    :height="clientHeight"
    :image-list="imageList"
    @wxcLightboxOverlayClicked="wxcLightboxOverlayClicked">
  </lightbox>
</template>

<script>
import Lightbox from '@/components/ui/Lightbox.vue'
export default {
  components: {
    'lightbox': Lightbox
  },
  props: ['article'],
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
