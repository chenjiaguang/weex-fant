/* global Vue */
import Router from 'vue-router'
import App from '@/views/index'
import Home from '@/views/home'
import ArticleDetail from '@/views/articleDetail'
import Message from '@/views/message'
import Friend from '@/views/friend'
import bindPhone from '@/views/bindPhone'

Vue.use(Router)

module.exports = new Router({
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
      component: bindPhone
    }
  ]
})
