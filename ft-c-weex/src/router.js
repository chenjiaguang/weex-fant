/* global Vue */
import Router from 'vue-router'
import App from '@/views/index'
import Home from '@/views/home'
import ArticleDetail from '@/views/articleDetail'
import Message from '@/views/message'
import Friend from '@/views/friend'
import BindPhone from '@/views/bindPhone'
import IdentifyPhone from '@/views/identifyPhone'
import ApplyToutiao from '@/views/applyToutiao'
import ApplyToutiaoSelect from '@/views/applyToutiaoSelect'
import ApplyToutiaoForm from '@/views/applyToutiaoForm'
import ApplyToutiaoSuccess from '@/views/applyToutiaoSuccess'
import SpecialDetail from '@/views/specialDetail'
import DynamicArticleDetail from '@/views/dynamicArticleDetail'
import SetNewPassword from '@/views/setNewPassword'
import EditPassword from '@/views/editPassword'
import fetchData from '@/lib/fetchData'
import FtNavigator from '@/lib/FtNavigator'

let domain = ''
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
  case 'release':
    domain = 'http://fanttest.fantuanlife.com'
    break
  case 'dev':
  case 'development':
  case 'test':
  case 'testing':
    domain = 'http://fanttest.fantuanlife.com'
    break
  default:
    domain = 'http://fanttest.fantuanlife.com'
}
Vue.use(Router)

const _router = new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/article/detail',
      name: 'ArticleDetail',
      component: ArticleDetail
    },
    {
      path: '/special/detail',
      name: 'SpecialDetail',
      component: SpecialDetail
    },
    {
      path: '/dynamicArticle/detail',
      name: 'DynamicArticleDetail',
      component: DynamicArticleDetail
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/friend',
      name: 'Friend',
      component: Friend
    },
    {
      path: '/phone/bind',
      name: 'BindPhone',
      component: BindPhone
    },
    {
      path: '/phone/identify',
      name: 'IdentifyPhone',
      component: IdentifyPhone
    },
    {
      path: '/toutiao/apply',
      name: 'ApplyToutiao',
      component: ApplyToutiao
    },
    {
      path: '/toutiao/select',
      name: 'ApplyToutiaoSelect',
      component: ApplyToutiaoSelect
    },
    {
      path: '/toutiao/form',
      name: 'ApplyToutiaoForm',
      component: ApplyToutiaoForm
    },
    {
      path: '/toutiao/success',
      name: 'ApplyToutiaoSuccess',
      component: ApplyToutiaoSuccess
    },
    {
      path: '/set/new/password',
      name: 'SetNewPassword',
      component: SetNewPassword
    },
    {
      path: '/edit/password',
      name: 'EditPassword',
      component: EditPassword
    }
  ]
})

Vue.prototype.$domain = domain
Vue.prototype.$fetchData = fetchData
Vue.prototype.$FtNavigator = {
  push: (options) => FtNavigator.push(_router, options),
  pop: (options) => FtNavigator.pop(_router, options),
  replace: (options) => FtNavigator.replace(_router, options)
}

module.exports = _router
