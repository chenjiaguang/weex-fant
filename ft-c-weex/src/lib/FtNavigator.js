import utils from './utils'
let navigator = weex.requireModule('navigator')

module.exports = {
  push: (router, options) => { // instance: 页面的this指向, weex_url: 页面的weex路径, web_url: 页面的web路径, params: 传递的参数, callback: 回调函数
    if (weex.config.env.platform.toLowerCase() === 'web') {
      // console.log(options.instance, options.web_url)
      options.web_url && router.push(options.web_url)
    } else {
      navigator.push({
        url: utils.setNavigatorUrl(options.weex_url),
        params: options.params,
        animated: options.animated || 'true'
      }, event => {
        options.callback && options.callback(event)
      })
    }
  },
  pop: (router, options) => {
    if (weex.config.env.platform.toLowerCase() === 'web') {
      router.back()
    } else {
      navigator.pop({
        params: options.params,
        animated: options.animated || 'true'
      }, event => {
        options.callback && options.callback(event)
      })
    }
  },
  replace: (router, options) => {
    if (weex.config.env.platform.toLowerCase() === 'web') {
      options.web_url && router.replace(options.web_url)
    } else {
      // 研究实现中
      // navigator.pop({
      //   params: options.params,
      //   animated: 'false'
      // }, eve => {
      //   const modal = weex.requireModule('modal')
      //   modal.toast({
      //     message: 'pop_callback2',
      //     duration: 0.5
      //   })
      //   navigator.push({
      //     url: utils.setNavigatorUrl(options.weex_url),
      //     params: options.params,
      //     animated: options.animated || 'true'
      //   }, event => {
      //     options.callback && options.callback(event)
      //   })
      // })
    }
  }
}
