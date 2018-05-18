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
  }
}

export default utilFunc
