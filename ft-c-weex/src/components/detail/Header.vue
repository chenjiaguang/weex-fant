<template>
  <div>
    <text class="title">{{data.title}}</text>
    <div class="row space-between" style="align-items:center;">
      <!-- 左 -->
      <div class="row">
        <image class="avatar" :src="data.avatar" @click="clickUser(data.uid)"/>
        <div class="column space-between">
          <!-- 上 -->
          <div class="row">
            <text class="username" @click="clickUser(data.uid)">{{data.username}}</text>
          </div>
          <!-- 下 -->
          <div class="row">
            <text class="time">{{data.time}}</text>
            <text class="fromPrefix" v-if="data.fromQz">发布于</text>
            <text class="fromQz" v-if="data.fromQz" @click="clickQz(data.circle_id)">{{data.fromQz}}</text>
          </div>
        </div>
      </div>
      <!-- 右 -->
      <div>
        <text class="follow-button" v-if="!is_follow"  @click="clickFollow(data.uid)">关注</text>
        <text class="follow-cancel-button" v-if="is_follow"  @click="clickUnFollow(data.uid)">已关注</text>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    in_share: {
      type: Boolean,
      default: true
    }},
  data () {
    return {
      is_follow: false
    }
  },
  methods: {
    clickUser (uid) {
      if (this.in_share) {
        this.$emit('clickInShare')
      }
    },
    clickQz (qzId) {
      if (this.in_share) {
        this.$emit('clickInShare')
      }
    },
    clickFollow (uid) {
      if (this.in_share) {
        this.$emit('clickInShare')
      }
    },
    clickUnFollow (uid) {
      if (this.in_share) {
        this.$emit('clickInShare')
      }
    }
  }
}
</script>

<style src='@/common.css' />
<style scoped>
.title {
  color: #333333;
  font-size: 56px;
  font-weight: bold;
  margin-bottom: 40px;
}
.avatar {
  height: 76px;
  width: 76px;
  border-radius: 38px;
  margin-right: 24px;
}
.username {
  color: #333333;
  font-size: 28px;
  font-weight: bold;
}
.time {
  color: #999999;
  font-size: 24px;
  margin-right: 20px;
}
.fromPrefix{
  color: #999999;
  font-size: 24px;
}
.fromQz {
  color: #1EB0FD;
  font-size: 24px;
}
.follow-button{
  width: 100px;
  height: 46px;
  border-width: 2px;
  border-radius: 4px;
  border-color:#1EB0FD;
  text-align: center;
  font-size: 22px;
  line-height: 42px;/*height-(border-width)*2*/
  color: #1EB0FD;
}
.follow-cancel-button{
  width: 100px;
  height: 46px;
  border-width: 2px;
  border-radius: 4px;
  border-color:#ff4155;
  text-align: center;
  font-size: 22px;
  line-height: 42px;/*height-(border-width)*2*/
  color: #ff4155;
}
</style>
