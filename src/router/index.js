import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import NProgress from 'nprogress' //进度条
import 'nprogress/nprogress.css'
const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('@/views/Login/Login')
  },
  {
    path: '/home',
    name: '首页',
    component: () => import('@/views/Home/Home'),
    redirect: '/echars',
    children: [{
        path: '/echars',
        name: '数据大屏',
        component: () => import('@/views/Echars/Echars'),
      },
      {
        path: '/Goods',
        name: '商品管理',
        component: () => import('@/views/Goods/index'),
         children: [
           {
            path: '/GoodsInfo',
            name: '商品列表',
            component: () => import('@/views/Goods/GoodsInfo/index')
          },
        ]
      },
      {
        path: '/Orders',
        name: '订单管理',
        component: () => import('@/views/Orders/index'),
         children: [
           {
            path: '/OderInfo',
            name: '订单列表',
            component: () => import('@/views/Orders/OderInfo/index')
          },
          {
            path: '/ReturnOder',
            name: '退款申请',
            component: () => import('@/views/Orders/ReturnOder/index')
          }
        ]
      },
      {
        path: '/User',
        name: '用户管理',
        component: () => import('@/views/User/index'),
         children: [
           {
            path: '/UserInfo',
            name: '用户列表',
            component: () => import('@/views/User/UserInfo/index')
          },
        ]
      },
      {
        path: '/System',
        name: '系统设置',
        component: () => import('@/views/System/index'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})

router.afterEach((to) => {
  if (to.path == "/login" || to.path == "/") {
    localStorage.clear()
  }
  NProgress.done();
});

export default router