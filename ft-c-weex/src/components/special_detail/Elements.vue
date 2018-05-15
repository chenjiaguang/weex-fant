<template>
  <div>
    <div class="elements-title-slider row">
      <text v-for="(element,index) in elements" :key="index">{{element.name}}</text>
    </div>
  </div>
</template>

<script>
export default {
  props: ['elements'],
  data () {
    return {
    }
  }
}
</script>

<style src='../../common.css' />
<style scoped>
</style>
