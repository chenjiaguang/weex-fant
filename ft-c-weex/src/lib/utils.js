let utilFunc = {
  setNavigatorUrl (path) {
    let url = weex.config.bundleUrl.split('/').slice(0, -1).join('/') + '/' + path + '.js'
    return url
  },
  isInShare (route) {
    if (route.query.in_app === 'true') {
      return false
    } else {
      return true
    }
  },
  ajaxGet (url) {
    let xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', url, true)
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        var d = xmlHttp.responseText
        console.log(d)
        // 处理返回结果
      }
    }
    xmlHttp.send()
  }
}

export default utilFunc
