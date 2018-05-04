/* global Vue */

/* weex initialized here, please do not move this line */
const router = require('../router')
const Friend = require('@/views/friend.vue')
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router}, Friend))
router.push('/friend')

