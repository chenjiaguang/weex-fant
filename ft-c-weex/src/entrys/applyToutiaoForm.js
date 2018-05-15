/* global Vue */

/* weex initialized here, please do not move this line */
const router = require('../router')
const applyToutiaoForm = require('@/views/applyToutiaoForm.vue')
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router}, applyToutiaoForm))
router.push('/toutiao/form')
