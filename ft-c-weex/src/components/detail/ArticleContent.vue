<template>
  <div>
    <div style="" class="article-content toutiaohao" id="article-frame"></div>
    <iframe style="margin-left:-30px;margin-right:-30px;" frameborder="0" src="about:blank" scrolling="no" id="article-frame-weixin"></iframe>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      isWeixin: false
    }
  },
  methods: {
    setContentFromWeixin (data) {
      document.getElementById('article-frame').remove()
      let iframe = document.getElementById('article-frame-weixin')
      iframe.contentDocument.body.innerHTML = data
      // iframe.contentDocument.body.style.zoom = '180%'
      // 删除多余元素，修改样式
      iframe.contentWindow.document.getElementById('activity-name').remove()
      iframe.contentWindow.document.getElementById('meta_content').remove()
      iframe.contentWindow.document.getElementById('page-content').style.backgroundColor = '#ffffff'
      iframe.contentWindow.document.body.style.fontSize = '12px'

      setIframeHeight(iframe)
      setInterval(() => {
        setIframeHeight(iframe)
      }, 1000)
    },
    setContent (data) {
      document.getElementById('article-frame-weixin').remove()
      let iframe = document.getElementById('article-frame')
      iframe.innerHTML = data
      // iframe.style.zoom = '180%'
    }
  }
}

// frame高度适应
function setIframeHeight (iframe) {
  if (iframe) {
    var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow
    if (iframeWin.document.body) {
      iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight
    }
  }
};

</script>

<style>
.weex-root, .weex-root * {
  color: unset;
  cursor: unset;
  direction: unset;
  font-family: unset;
  font-size: unset;
  font-style: unset;
  font-variant: unset;
  font-weight: unset;
  line-height: unset;
  text-align: unset;
  text-indent: unset;
  visibility: unset;
  white-space: unset;
  word-spacing: unset;
}

body {
  font-size: 12px;
}
#preview {
  box-sizing: border-box;
  overflow-y: auto;
  margin: 0 auto;
  padding: 10px;
  width: 100%;
  max-width: 375px;
  min-height: 667px;
  max-height: 100vh;
  background-color: #ffffff;
}
.article-content img{
  max-width:100% !important;
  display:block;
}
.article-content strong{
  font-weight: bold;
}

.article-content img.default{
  background:#f0f0f0;
}
.article-content p{
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
}
.article-content h1,
.article-content h2,
.article-content h3,
.article-content h4,
.article-content h5,
.article-content h6{
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  font-size:17px;
}
.article-content.toutiaohao{
  line-height:1.5;
  font-size:17px;
}
/*今日头条图片说明样式*/
.article-content.toutiaohao .pgc-img-caption{
  text-align: center;
  color: #777;
  font-size: 12px;
  line-height: 16px;
  margin-top: 8px;
  margin-bottom: 15px;
}
.article-content.toutiaohao p{
  margin:10px 0;
}
.article-content.toutiaohao img{
  display:block;
  margin:4px auto;
}
.article-content.toutiaohao blockquote {
  font-size: 16px;
  line-height: 22px;
  padding: 15px;
  color: #999;
  border: 1px solid #E8E8E8;
  background: #F4F5F6;
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  -webkit-margin-start: 0;
  -webkit-margin-end: 0;
}
.article-content.toutiaohao blockquote p{
  font-size: 16px;
  line-height: 22px;
  margin: 10px !important;
  color: #505050;
}
</style>
<style scoped>

</style>
