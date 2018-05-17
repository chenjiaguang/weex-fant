<template>
  <div>
    <text style="font-size:28px;color:#333333;margin-bottom: 40px;font-weight:bold">{{dynamic.comment_num}}条评论</text>
    <div v-for="(comment,index) in dynamic.comment_list" :key="'comments'+index">
      <div class="comment-box row"  style="justify-content: space-between;">
        <div class="column">
          <a href="http://baidu.com">
            <image class="user-avatar" :src="comment.avatar" />
          </a>
        </div>
        <div class="comment-right-box column">
          <div class="row">
            <a href="http://baidu.com">
              <text class="comment-username">{{comment.username}}</text>
            </a>
          </div>
          <text class="comment-content">{{comment.content}}</text>
          <text class="comment-time">{{comment.time}}</text>
          <div v-if="comment.replys.list.length>0" class="comment-replies-box">
            <richtext style="" class="reply-box" v-for="(reply,index) in comment.replys.list" :key="index" @click="$emit('textInputFocus','回复'+reply.username+':')">
              <span class="reply-from" v-if="reply.pusername">{{reply.username}}</span>
              <span class="reply-from" v-if="!reply.pusername">{{reply.username}}: </span>
              <span class="reply-reply" v-if="reply.pusername">回复</span>
              <span class="reply-to" v-if="reply.pusername">{{reply.pusername}}: </span>
              <span class="reply-content">{{reply.content}}</span>
            </richtext>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['dynamic'],
  data () {
    return {}
  },
  methods: {
    getNewReplyContent: function (reply) {
      let contentPrefix = ''
      contentPrefix += reply.username
      if (reply.pusername) {
        contentPrefix += '回复'
        contentPrefix += reply.pusername
        contentPrefix += ': '
      } else {
        contentPrefix += ': '
      }
      let content = contentPrefix + reply.content
      return content
    }
  }
}
</script>

<style src='@/common.css' />
<style scoped>
.user-avatar{
  height: 60px;
  width: 60px;
  border-radius: 30px;
  margin-right: 20px;
}
.comment-box {
  margin-bottom: 40px;
}
.comment-right-box{
  flex: 1;
}
.comment-username{
  color: #225894;
  font-size: 28px;
  line-height: 28px;
  margin-bottom: 14px;
}
.comment-content{
  color: #333333;
  font-size: 30px;
  line-height: 42px;
  margin-bottom: 14px;
}
.comment-time{
  color: #999999;
  font-size: 24px;
  line-height: 24px;
  margin-bottom: 24px;
}
.comment-replies-box{
  padding: 24px;
  background-color:#F6F6F6;
  border-radius: 4px;
}
.reply-box{
  background-color:transparent;
}
.reply-box:active{
  background-color:#cccccc;
}
.reply-from{
  color: #255A96;
  font-size: 26px;
}
.reply-reply{
  color: #666666;
  font-size: 26px;
}
.reply-to{
  color: #255A96;
  font-size: 26px;
}
.reply-content{
  color: #333333;
  font-size: 26px;
}
</style>
