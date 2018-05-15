<template>
  <div class="wrapper">
    <text @click="showWeex">我的好友</text>
    <div class="tab-container" style="flex:0;">
      <div class="tab-header" style="align-items: stretch;flex-direction: row;justify-content: space-around;">
        <div v-for="(tab, idx) in tabs" :key="idx" class="tab-header-item" @click="tabClick(idx)" style="height:88px;justify-content: space-between;align-items: center;">
          <text class="tab-text" style="line-height:82px;font-size:32px;flex:1;" :style="{fontWeight: tabs[selected] === tab ? 'bold' : 'normal'}">{{tab}}</text>
        </div>
        <div style="height:1px;background-color:#E5E5E5;position:absolute;left:0;bottom:0;width:750px;"></div>
        <div class="tab-indecator" :style="{left: min_left + 'px', width: '40px', height: '6px', backgroundColor: '#1EB0FD', borderRadius: '3px', flex: 0, position: 'absolute', bottom: '1px', transform: 'translateX(' + ( offsetXRatio * 100 * 750 / tabs.length + (750 / this.tabs.length - 40) / 2 ) / 40 + '%)'}"></div>
      </div>
      <slider class="slider" :scrollable="true" :index="selected" :infinite="false" @change="tabChange" @scroll="handleScroll" style="flex:1;align-items:stretch;">
        <list v-for="(tabData, idx) in tabs_data" :key="idx" class="list" loadmoreoffset="0" @loadmore="(e) => onloading(tabData, idx, e)" style="width:750px;flex:1;">
          <refresh class="refreshing-box" @refresh="(e) => onrefresh(tabData, idx, e)" @pullingdown="(e) => onpullingdown(tabData, idx, e)" :display="tabData.refreshing ? 'show' : 'hide'">
            <loading-indicator v-if="tabData.refreshing" class="loading-indicator"></loading-indicator>
            <text class="indicator-text">{{refreshing_text}}</text>
          </refresh>
          <cell v-for="(row, i) in tabData.row_data" class="list-item" :key="i">
            <avatar :avatar="row.avatar" :read="row.is_read" radius="50px" :placeholder="row.placeholder"></avatar>
            <text class="item-name">{{row.name}}</text>
            <div :class="['button', row.has_followed ? '' : 'effect-button']" v-if="idx !== 0">
              <text v-if="row.has_followed && row.be_followed" class="button-text">互相关注</text>
              <text v-else-if="row.has_followed" class="button-text">已关注</text>
              <text v-else class="button-text effect-text">关注</text>
            </div>
            <div class="item-line"></div>
          </cell>
        </list>
      </slider>
    </div>
  </div>
</template>

<script>
import Avatar from '../components/Avatar.vue'
export default {
  data () {
    return {
      tabs: ['好友', '关注', '粉丝'],
      selected: 0,
      tabs_data: [
        {
          title: '好友',
          row_data: [
            {
              avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1041521719,4046775256&fm=27&gp=0.jpg',
              is_read: false,
              name: '锦鲤大王'
            },
            {
              avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1760172527,1473711532&fm=27&gp=0.jpg',
              is_read: false,
              name: '方片儿尖'
            },
            {
              avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1033062629,3975475618&fm=27&gp=0.jpg',
              is_read: true,
              name: '梁鮰鱼儿'
            },
            {
              avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1033062629,3975475618&fm=27&gp=0.jpg',
              is_read: true,
              name: '梁鮰鱼儿'
            },
            {
              avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1033062629,3975475618&fm=27&gp=0.jpg',
              is_read: true,
              name: '梁鮰鱼儿'
            },
            {
              avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1033062629,3975475618&fm=27&gp=0.jpg',
              is_read: true,
              name: '梁鮰鱼儿'
            },
            {
              avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1033062629,3975475618&fm=27&gp=0.jpg',
              is_read: true,
              name: '梁鮰鱼儿'
            },
            {
              avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1033062629,3975475618&fm=27&gp=0.jpg',
              is_read: true,
              name: '梁鮰鱼儿'
            },
            {
              avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1033062629,3975475618&fm=27&gp=0.jpg',
              is_read: true,
              name: '小叶',
              placeholder: './default_avatar.png'
            }
          ],
          refreshing: false,
          loading: false
        },
        {
          title: '关注',
          row_data: [
            {
              avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1041521719,4046775256&fm=27&gp=0.jpg',
              is_read: false,
              name: '锦鲤大王',
              has_followed: true,
              be_followed: true
            },
            {
              avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1760172527,1473711532&fm=27&gp=0.jpg',
              is_read: false,
              name: '方片儿尖',
              has_followed: false,
              be_followed: false
            },
            {
              avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1033062629,3975475618&fm=27&gp=0.jpg',
              is_read: true,
              name: '梁鮰鱼儿',
              has_followed: false,
              be_followed: true
            },
            {
              avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1033062629,3975475618&fm=27&gp=0.jpg',
              is_read: true,
              name: '小叶',
              has_followed: true,
              be_followed: false
            }
          ],
          refreshing: false,
          loading: false
        },
        {
          title: '粉丝',
          row_data: [
            {
              avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1041521719,4046775256&fm=27&gp=0.jpg',
              is_read: false,
              name: '锦鲤大王',
              has_followed: false,
              be_followed: true
            },
            {
              avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1760172527,1473711532&fm=27&gp=0.jpg',
              is_read: false,
              name: '方片儿尖',
              has_followed: false,
              be_followed: false
            },
            {
              avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1033062629,3975475618&fm=27&gp=0.jpg',
              is_read: true,
              name: '梁鮰鱼儿',
              has_followed: true,
              be_followed: false
            },
            {
              avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1033062629,3975475618&fm=27&gp=0.jpg',
              is_read: true,
              name: '小叶',
              has_followed: true,
              be_followed: true
            }
          ],
          refreshing: false,
          loading: false
        }
      ],
      refreshing_text: '下拉刷新',
      offsetXRatio: 0
    }
  },
  components: { Avatar },
  methods: {
    onrefresh (tabData, index) {
      this.tabs_data[index].refreshing = true
      setTimeout(() => {
        this.tabs_data[index].refreshing = false
      }, 2000)
    },
    onpullingdown (tabData, index, event) {
      let distance = Math.abs(event.pullingDistance)
      if (distance <= 120 && this.refreshing_tex !== '下拉刷新' && !this.tabs_data[index].refreshing) {
        this.refreshing_text = '下拉刷新'
      } else if (distance > 120 && this.refreshing_tex !== '松开立即刷新' && !this.tabs_data[index].refreshing) {
        this.refreshing_text = '松开立即刷新'
      } else if (this.tabs_data[index].refreshing) {
        this.refreshing_text = '刷新中...'
      }
      console.log('selected', this.selected)
    },
    onloading (tabData, index, e) {
      console.log('event', e)
      // this.tabs_data[index].loading = true
      // setTimeout(() => {
      //   let item = {
      //     avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1033062629,3975475618&fm=27&gp=0.jpg',
      //     is_read: true,
      //     name: '梁鮰鱼儿'
      //   }
      //   this.tabs_data[index].row_data.push(item)
      //   this.tabs_data[index].loading = false
      // }, 1000)
    },
    showWeex () {
      console.log('weex', weex)
    },
    tabClick (idx) {
      this.selected = idx
    },
    tabChange (event) {
      console.log('tabChange')
      if (this.selected !== event.index) {
        this.selected = event.index
      }
    },
    handleScroll (e) {
      let num = -e.offsetXRatio
      // if (num > 0.5 && this.selected < this.tabs.length - 1) {
      //   this.selected = this.selected + 1
      // } else if (num < 0.5 && this.selected !== 0) {
      //   this.selected = this.selected - 1
      // }
      this.offsetXRatio = num + this.selected
    }
  },
  computed: {
    min_left () {
      return (750 / this.tabs.length - 40) / 2
    },
    max_left () {
      return (750 / this.tabs.length - 40) / 2 + ((this.tabs.length - 1) * 750 / this.tabs.length)
    }
  }
}
</script>

<style scoped>
  .wrapper{
    flex:1;
  }
  .tab-container{
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
  .slider{
    flex:1;
    align-items:stretch;
  }
  .list{
    width:750px;
    flex:1;
  }
  .list-item{
    width:750px;
    height:160px;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
    flex-wrap: wrap;
    padding-left:30px;
    padding-right:30px;
  }
  .item-line{
    width:690px;
    height:1px;
    background-color:#E1E1E1;
    position:absolute;
    left:30px;
    bottom:0;
  }
  .item-name{
    margin-left:20px;
    flex:1;
  }
  .button{
    width:110px;
    height:50px;
    border-width:2px;
    border-color:#999999;
    border-radius:6px;
    justify-content: center;
    align-items: center;
  }
  .effect-button{
    border-width:2px;
    border-color:#1EB0FD;
  }
  .button-text{
    font-size:24px;
    color:#999999;
  }
  .effect-text{
    color:#1EB0FD;
  }
  .refreshing-box,.loading-box{
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height:120px;
    width:750px;
  }
  .loading-indicator {
    color: #888888;
    font-size: 42px;
    text-align: center;
    padding-right:52px;
  }
  .indicator-text{
    font-size:28px;
    color:#888888;
  }
</style>
