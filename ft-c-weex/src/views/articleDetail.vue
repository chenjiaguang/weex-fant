<template>
  <div class="wrapper">
    <div class="article-container">
      <web :style="{width: '750px', height: '700px'}" src="https://www.baidu.com"></web>
    </div>
    <div class="buttons">
      <div class="line"></div>
      <div class="comment-btn">
        <text style="color:#C5C5C5">发表一下高见吧～</text>
      </div>
      <div class="go-comments-btn">
        <text>评</text>
      </div>
      <div class="collect-btn">
        <text>收</text>
      </div>
      <div class="share-btn">
        <text>分</text>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped>
  .wrapper {
    justify-content: center;
    align-items: center;
  }
  .article-container{
    flex:1;
  }
  .buttons{
    width:750px;
    height:100px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size:30px;
    padding-left:30px;
    padding-right:30px;
  }
  .line{
    width:750px;
    height:1px;
    background-color:#CBCBCB;
    position:absolute;
    left:0;
    top:0;
  }
  .comment-btn{
    height:60px;
    background-color:#F1F1F1;
    flex: 1;
    border-radius: 16px;
    justify-content: center;
    margin-right:30px;
    padding-left:20px;
  }
</style>
