<template>
  <div>
    <div style="align-items: flex-start;" class="article-content toutiaohao" id="article-frame"></div>
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

      let els1 = iframe.contentWindow.document.getElementsByClassName('rich_media_area_extra')
      if (els1.length > 0) {
        for (const el of els1) {
          el.remove()
        }
      }

      // 视频兼容
      let els = iframe.contentWindow.document.getElementsByClassName('video_iframe')
      if (els.length > 0) {
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

      // div.style.fontSize = '32px'
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
xmteditor{
  max-width: 100%;
}
.video_iframe{
  width:100%
}

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
#article-frame *{
  font-size: 32px;
  line-height: 1.68;
}
#article-frame a:active{
  background-color: #e5e5e5;
}
#article-frame img{
  max-width:100% !important;
  display:block;
  margin:30px 0;
}
#article-frame strong{
  font-weight: bold;
}

#article-frame img.default{
  background:#f0f0f0;
}
#article-frame p{
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  margin:20px 0;
}
#article-frame h1,
#article-frame h2,
#article-frame h3,
#article-frame h4,
#article-frame h5,
#article-frame h6{
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  font-size:34px;
}
/*今日头条图片说明样式*/
#article-frame .pgc-img-caption{
  text-align: center;
  color: #777;
  font-size: 24px;
  line-height: 24px;
  margin-top: -20px;
  margin-bottom: 20px;
}
#article-frame blockquote {
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
#article-frame blockquote p{
  font-size: 32px;
  line-height: 44px;
  margin: 20px !important;
  color: #505050;
}
</style>
<style scoped>

</style>
