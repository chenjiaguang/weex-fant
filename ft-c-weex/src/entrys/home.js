/* global Vue */

/* weex initialized here, please do not move this line */
const router = require('../router')
const Home = require('@/views/home.vue')
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router}, Home))
router.push('/home')
