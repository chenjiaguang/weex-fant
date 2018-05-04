<template>
  <div class="tab-wrapper">
    <div class="tab-header" :style="{'justify-content': align || 'flex-start'}">
      <div v-for="(tab, idx) in tabs" :key="idx" class="tab-header-item">
        <text class="tab-text">{{tab}}</text>
        <div class="tab-indecator" :class="{selected: selected === tab}"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tabs', 'align', 'selected'],
  data () {
    return {}
  },
  created () {
    console.log('selected', this.selected)
  }
}
</script>

<style scoped>
  .tab-header{
    align-items: center;
    flex-direction: row;
  }
  .tab-header-item{
    height:88px;
    justify-content: space-between;
    align-items: center;
  }
  .tab-text{
    line-height:82px;
    flex:1;
  }
  .tab-indecator{
    width:40px;
    height:6px;
    background-color:#1EB0FD;
    border-radius:3px;
    flex:0;
    opacity:0;
  }
  .tab-indecator.selected{
    opacity:1;
  }
</style>
