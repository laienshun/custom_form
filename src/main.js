import Vue from 'vue'
import App from './App'
import store from 'storejs'
import router from './router'
import VueCookie from 'vue-cookie'
import draggable from 'vuedraggable'
import iView from 'iview'
import './assets/style/iviewtheme.less'

// 过滤器
import './services/filter'

import config from './services/config'
import utils from './services/utils'
import axios from './services/axios'
import api from './services/api'

// 样式
// import 'iview/dist/styles/iview.css'
import './assets/style/reset.scss'
import './assets/style/common.scss'

utils.serializeUse(VueCookie, iView)

Vue.component('draggable', draggable)

// 挂载
Vue.prototype.$store = store
Vue.prototype.$config = config
Vue.prototype.$utils = utils
Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.prototype.$log = utils.console

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
