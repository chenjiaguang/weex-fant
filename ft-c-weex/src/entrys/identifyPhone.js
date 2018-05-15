/* global Vue */

/* weex initialized here, please do not move this line */
const router = require('../router')
const identifyPhone = require('@/views/identifyPhone.vue')
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router}, identifyPhone))
router.push('/phone/identify')
