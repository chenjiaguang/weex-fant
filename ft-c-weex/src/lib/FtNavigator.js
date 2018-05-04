import utils from './utils'
let navigator = weex.requireModule('navigator')
// let FtNavigator = {
//   push: function (instance, url, params, callback) {
//     if (weex.config.env.platform.toLowerCase() === 'web') {
//       instance.$router.push('/' + url)
//     } else {
//       navigator.push({
//         url: utils.setNavigatorUrl(url),
//         params: params,
//         animated: 'true'
//       }, event => {
//         callback && callback(event)
//       })
//     }
//   },
//   pop: function (instance, params, callback) {
//     if (weex.config.env.platform.toLowerCase() === 'web') {
//       instance.$router.back()
//     } else {
//       navigator.pop({
//         params: params,
//         animated: 'true'
//       }, event => {
//         callback && callback(event)
//       })
//     }
//   }
// }
module.exports = {
  push: (options) => { // instance: 页面的this指向, weex_url: 页面的weex路径, web_url: 页面的web路径, params: 传递的参数, callback: 回调函数
    if (weex.config.env.platform.toLowerCase() === 'web') {
      // console.log(options.instance, options.web_url)
      options.instance && options.instance.$router.push(options.web_url)
    } else {
      navigator.push({
        url: utils.setNavigatorUrl(options.weex_url),
        params: options.params,
        animated: 'true'
      }, event => {
        options.callback && options.callback(event)
      })
    }
  },
  pop: (options) => {
    if (weex.config.env.platform.toLowerCase() === 'web') {
      options.instance && options.instance.$router.back()
    } else {
      navigator.pop({
        params: options.params,
        animated: 'true'
      }, event => {
        options.callback && options.callback(event)
      })
    }
  }
}
