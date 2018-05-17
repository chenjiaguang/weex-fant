import ReactDOM from 'react-dom'
import DownloadTip from '~/components/DownloadTip'

export default function () {
  function checkDownLoadCallBack (opened) {
    console.log('checkDownLoadCallBack', checkDownLoadCallBack)
    let browser = BrowserInfo()
    let url = browser.isIphone ? 'https://itunes.apple.com/cn/app/%E8%8C%83%E5%9B%A2/id1278226297?mt=8' : 'http://a.app.qq.com/o/simple.jsp?pkgname=com.wetime.fanc'
    console.log('browser', browser.isWeixin, browser.isWeibo)
    if (!opened) {
      if (browser.isWeixin || browser.isWeibo) {
        let container = createDownloadContainer()
        ReactDOM.render(
          <DownloadTip close={closeDownload} zIndex={new Date().getTime()} />,
          container
        )
        return false
      }
      window.location.href = url
    }
  }

  // 检查app是否打开
  function checkOpen (cb) {
    let _clickTime = +(new Date())

    // 启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
    let _count = 0, intHandle
    intHandle = setInterval(function () {
      _count++
      let elsTime = +(new Date()) - _clickTime
      if (_count >= 100 || elsTime > 3000) {
        clearInterval(intHandle)
        check(elsTime)
      }
    }, 20)
  }
  function check (elsTime) {
    if (elsTime > 3000 || document.hidden || document.webkitHidden) {
      cb(1)
    } else {
      cb(0)
    }
  }
  function openApp (openUrl, callback) {
    window.location.href = openUrl

    if (callback) {
      checkOpen(function (opened) {
        callback && callback(opened)
      })
    }
  }

  function BrowserInfo () {
    return {
      userAgent: navigator.userAgent.toLowerCase(),
      isAndroid: Boolean(navigator.userAgent.match(/android/ig)),
      isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
      isIpad: Boolean(navigator.userAgent.match(/ipad/ig)),
      isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
      isWeibo: Boolean(navigator.userAgent.match(/WeiBo/i))
    }
  }

  function closeDownload () {
    let _body = window.document.getElementsByTagName('body')[0]
    let container = window.document.getElementById('download-tip-container')
    ReactDOM.unmountComponentAtNode(container)
    _body.removeChild(container)
    // this.setState({
    //   show_tip: false
    // })
  }

  function createDownloadContainer () {
    let container = window.document.createElement('div')
    container.id = 'download-tip-container'
    container.style.width = '0'
    container.style.height = '0'
    container.style.overflow = 'visible'
    let _body = window.document.getElementsByTagName('body')[0]
    _body.appendChild(container)
    return container
  }

  let browser = BrowserInfo()
  console.log('browser', browser.isWeixin, browser.isWeibo)
  if (browser.isWeixin || browser.isWeibo) {
    let container = createDownloadContainer()
    ReactDOM.render(
      <DownloadTip close={closeDownload} zIndex={new Date().getTime()} />,
      container
    )
    return false
  } else if (browser.isIphone) {
    openApp('fantuanc://', checkDownLoadCallBack)
  } else if (browser.isAndroid) {
    openApp('launchapp://myhost/open', checkDownLoadCallBack)
  }
}
