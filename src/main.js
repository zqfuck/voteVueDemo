// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import { Loadmore, Toast } from 'mint-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import '../static/rem'
import '../static/css/border.css'
import '../static/css/reset.css'
import 'swiper/dist/css/swiper.min.css'
Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)
Vue.use(Loadmore, Toast)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
