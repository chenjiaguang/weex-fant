<template>
  <div>
    <div style="" class="article-content toutiaohao" id="article-frame"></div>
    <!-- <iframe height="1000" width="750" src="https://mp.weixin.qq.com/s?__biz=MzIxMTYyMTEzMA==&mid=2247486253&idx=1&sn=e897f0aa65f556d0ea8735d6e580ad00&chksm=9753cf48a024465eb904efa7fe31bea7289af0236f1cd99e221a7572db11e88eac40e4a81c05&scene=27#wechat_redirect"></iframe> -->
    <iframe style="margin-left:-30px;margin-right:-30px;width:750px" height="1000" frameborder="0" src="about:blank" scrolling="no" id="article-frame-weixin"></iframe>
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
      if (iframe.contentWindow.document.getElementById('js_view_source')) {
        iframe.contentWindow.document.getElementById('js_view_source').remove()
      }

      iframe.contentWindow.document.getElementById('page-content').style.backgroundColor = '#ffffff'
      iframe.contentWindow.document.body.style.fontSize = '12px'

      // 视频兼容
      let els = iframe.contentWindow.document.getElementsByClassName('video_iframe')
      for (const el of els) {
        el.style.width = '100%'
        let src = el.src
        let rexW = /width=(\d+)/
        let w = rexW.exec(src)[1]
        let rexH = /height=(\d+)/
        let h = rexH.exec(src)[1]
        let newW = Math.round(els[0].clientWidth)
        let newH = Math.round(h / w * newW)

        src = src.replace('width=' + w, 'width=' + newW)
        src = src.replace('height=' + h, 'height=' + newH)
        els[0].src = src
        el.style.height = newH + 'px'
      }

      setIframeHeight(iframe)
      setInterval(() => {
        setIframeHeight(iframe)
      }, 1000)
    },
    setContentFromFantuanWeixin (data) {
      document.getElementById('article-frame-weixin').remove()
      let div = document.getElementById('article-frame')
      div.innerHTML = data

      let _editor = document.getElementsByTagName('xmteditor"')[0]
      if (_editor) {
        _editor.style.display = 'block'
      }
    },

    setContent (data) {
      document.getElementById('article-frame-weixin').remove()
      let div = document.getElementById('article-frame')
      div.innerHTML = data

      // div.style.fontSize = '18px'
    }
  }
}

// frame高度适应
function setIframeHeight (iframe) {
  if (iframe) {
    var iframeWin = iframe.contentWindow || (iframe.contentDocument && iframe.contentDocument.parentWindow)
    if (iframeWin && iframeWin.document.body) {
      iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight
    }
  }
};

</script>

<style>
.video_iframe{
  width:100%
}
/* .weex-root, .weex-root * {
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
} */

#preview {
  box-sizing: border-box;
  overflow-y: auto;
  margin: 0 auto;
  padding: 10px;
  width: 100%;
  max-width: 750px;
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
  font-size:34px;
}
.article-content.toutiaohao{
  line-height:1.5;
  font-size:34px;
}
/*今日头条图片说明样式*/
.article-content.toutiaohao .pgc-img-caption{
  text-align: center;
  color: #777;
  font-size: 24px;
  line-height: 32px;
  margin-top: 16px;
  margin-bottom: 30px;
}
.article-content.toutiaohao p{
  margin:20px 0;
}
.article-content.toutiaohao img{
  display:block;
  margin:8px auto;
}
.article-content.toutiaohao blockquote {
  font-size: 32px;
  line-height: 44px;
  padding: 30px;
  color: #999;
  border: 2px solid #E8E8E8;
  background: #F4F5F6;
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  -webkit-margin-start: 0;
  -webkit-margin-end: 0;
}
.article-content.toutiaohao blockquote p{
  font-size: 32px;
  line-height: 44px;
  margin: 20px !important;
  color: #505050;
}
</style>
<style scoped>

</style>
