import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './filters' //引入全局过滤器

import VuePreview from 'vue-preview'
Vue.use(VuePreview) //引入图片预览插件    "moment": "^2.25.3",
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  preLoad: 0.8,
  error: require('../src/assets/images/lazyload/error.jpg'),
  loading:require('../src/assets/images/lazyload/loading.gif'),
  attempt: 3
}) //引入图片懒加载插件
import VueAwesomeSwiper from 'vue-awesome-swiper' //引入轮播滑块插件
import 'swiper/css/swiper.css' //引入轮播滑块样式
Vue.use(VueAwesomeSwiper, /* { default options with global component } */) //安装轮播插件
import './network' //引入网络请求模块
import 'amfe-flexible/index.js' //引入rem+flex适配布局
import './assets/fonts/iconfont.css' //引入阿里字体图标库
import 'normalize.css' //引入标准重置样式

import './assets/css/base.css' //引入基准样式

Vue.prototype.$bus = new Vue()  //创建单独的事件中心
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
