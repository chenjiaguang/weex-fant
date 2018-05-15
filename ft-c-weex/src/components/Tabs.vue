<template>
  <div class="tab-wrapper">
    <div class="tab-header" :style="{'justify-content': align || 'flex-start'}">
      <div v-for="(tab, idx) in tabs" :key="idx" class="tab-header-item" @click="tabClick(idx)">
        <text class="tab-text" :style="{fontWeight: tabs[selected] === tab ? 'bold' : 'normal'}">{{tab}}</text>
      </div>
      <div style="height:1px;background-color:#E5E5E5;position:absolute;left:0;bottom:0;width:750px;"></div>
      <div class="tab-indecator" :style="{left: min_left + 'px'}"></div>
    </div>
    <slider class="slider" :scrollable="true" :index="selected" :infinite="false" :keep-index="false" @change="tabChange" @scroll="handleScroll">
      <div class="tab-content" v-for="(tabData, idx) in data" :key="idx">
        <slot v-bind:tabData="tabData" v-bind:index="idx" style="flex:1;height:800px;"></slot>
      </div>
    </slider>
  </div>
</template>

<script>
export default {
  props: ['tabs', 'align', 'selected', 'data'],
  data () {
    return {}
  },
  created () {},
  methods: {
    tabClick (idx) {
      this.selected = idx
    },
    tabChange (event) {
      if (this.selected !== event.index) {
        this.selected = event.index
      }
    },
    handleScroll (e) {
      console.log('handleScroll', e)
    }
  },
  computed: {
    min_left () {
      return (750 / this.tabs.length - 40) / 2 + (this.selected * 750 / this.tabs.length)
    },
    max_left () {
      return (750 / this.tabs.length - 40) / 2 + ((this.tabs.length - 1) * 750 / this.tabs.length)
    }
  }
}
</script>

<style scoped>
  .tab-wrapper{
    flex:1;
  }
  .tab-header{
    align-items: stretch;
    flex-direction: row;
  }
  .tab-header-item{
    height:88px;
    justify-content: space-between;
    align-items: center;
  }
  .tab-text{
    line-height:82px;
    font-size:32px;
    flex:1;
  }
  .tab-indecator{
    width:40px;
    height:6px;
    background-color:#1EB0FD;
    border-radius:3px;
    flex:0;
    position:absolute;
    bottom:1px;
    left:0;
  }
  .slider{
    flex:1;
    align-items:stretch;
  }
  .tab-content{
    align-items:stretch;
    flex:1;
  }
</style>
