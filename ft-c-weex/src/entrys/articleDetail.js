/* global Vue */

/* weex initialized here, please do not move this line */
const router = require('../router')
const ArticleDetail = require('@/views/articleDetail.vue')
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router}, ArticleDetail))

