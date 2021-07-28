import Vue from 'vue'
import App from './App'
import mpvueToastRegistry from 'mptoast/src/registry'
import fly from './utils/request'
import '../static/sdk/ald-stat'
import MpvueRouterPatch from 'mpvue-router-patch'

Vue.use(MpvueRouterPatch)
Vue.prototype.$fly = fly

Vue.config.productionTip = false
App.mpType = 'app'

mpvueToastRegistry(Vue)
const app = new Vue(App)
app.$mount()
