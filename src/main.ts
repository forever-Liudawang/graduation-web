import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import axios from 'axios';
import VueSocketIO from 'vue-socket.io';
import 'element-ui/lib/theme-chalk/index.css';
import './reset.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
import './common/global.css';
import preview from 'vue-photo-preview';
import 'vue-photo-preview/dist/skin.css';
import cookies from 'vue-cookies';

Vue.prototype.$cookies = cookies;

Vue.use(preview)


NProgress.configure({     
  easing: 'ease',  // 动画方式    
  speed: 1000,  // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
})

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(new VueSocketIO({
  debug: true,
  // 服务器端地址
  connection: 'http://localhost:3000',
  }))
Vue.prototype.$http=axios.create({
  baseURL:"http://localhost:3000"
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
