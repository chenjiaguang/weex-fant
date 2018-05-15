module.exports = (url, formData = {}, callback = {}) => {
  let stream = weex.requireModule('stream')
  if ((typeof url).toLowerCase() !== 'string') {
    return false
  }
  // fetch 前置钩子
  if (callback.before instanceof Function) callback.before()
  console.log('url', url)
  return stream.fetch({
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    type:'json',
    body: JSON.stringify(formData)
  }, function (res) {
    if (callback.after instanceof Function) callback.after()
    if (res.ok) {
      callback.success && callback.success(res.data)
    } else {
      callback.fail && callback.fail(res.data)
    }
  }, function (res) {
    // 请求状态处理（如果需要的话）
    if (callback.after instanceof Function) callback.after()
  })
};
