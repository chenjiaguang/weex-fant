let utilFunc = {
  setNavigatorUrl (path) {
    let url = weex.config.bundleUrl.split('/').slice(0, -1).join('/') + '/' + path + '.js'
    return url
  }
}

export default utilFunc
