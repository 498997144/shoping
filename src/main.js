import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'amfe-flexible/index.js' //引入rem+flex适配布局js
import 'normalize.css' //引入标准重置css样式
import './assets/css/base.css' //引入基础样式
import './assets/fonts/iconfont.css' //引入字体css

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
