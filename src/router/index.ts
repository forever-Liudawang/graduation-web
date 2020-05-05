import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
import Home from '@/views/Home.vue'
import Detail from '@/views/Detail.vue'
import Album from '@/views/Album.vue'
import Origin from '@/views/Origin.vue'
import TalkRoom from '@/views/TalkRoom.vue'
import NProgress from 'nprogress'

Vue.use(VueRouter)
const routes: any [] = [
  {               //登录页面
    path:"/",
    name:"Login",
    component:Login
  },  
  {               //首页
    path:"/home",
    name:"Home",
    component:Home
  },
  {               //详情页面
    path:"/detail",
    name:"Detail",
    component:Detail
  },
  {               //相册页面
    path:"/album",
    name:"Album",
    component:Album
  },
  {             //班级学生地区分布页面
    path:"/origin",
    name:"Origin",
    component:Origin
  },
  {
    path:"/talkRoom",
    name:"TalkRoom",
    component:TalkRoom
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from , next) => {
  // 每次切换页面时，调用进度条
  NProgress.start();

  // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
  next();
});
router.afterEach(() => {  
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})
export default router
