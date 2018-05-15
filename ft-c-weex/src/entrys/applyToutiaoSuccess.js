/* global Vue */

/* weex initialized here, please do not move this line */
const router = require('../router')
const applyToutiaoSuccess = require('@/views/applyToutiaoSuccess.vue')
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router}, applyToutiaoSuccess))
