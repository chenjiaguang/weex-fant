<template>
  <iframe v-if="src" ref="wrapper"  id="agreement-wrapper" :src="src" height="1000"></iframe>
</template>

<style scoped>
  #agreement-wrapper{
    width: 100%;
    box-sizing: border-box;
    padding: 0 4%;
    border: none;
    margin: 0;
    position: relative;
  }
  #agreement-wrapper /deep/ body{
    margin: 0;
  }
  #agreement-wrapper /deep/ p{
    line-height: 1.375 !important;
  }
</style>

<script>
function setIframeHeight (iframe) {
  if (iframe) {
    var iframeWin = iframe.contentWindow || (iframe.contentDocument && iframe.contentDocument.parentWindow)
    if (iframeWin && iframeWin.document.body) {
      iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight
    }
  }
};
export default {
  name: 'Agreement',
  data () {
    return {
      src: '',
      srcObject: {
        user: '@/../static/userAgreement.html',
        author: '@/../static/authorAgreement.html',
        activity: '@/../static/activityAgreement.html'
      }
    }
  },
  created () {
    console.log('route', this.$route)
    let _type = this.$route.query && this.$route.query.type
    if (_type) {
      this.src = this.srcObject[_type]

      setInterval(() => {
        setIframeHeight(this.$refs.wrapper)
      }, 1000)
    }
  }
}
</script>
