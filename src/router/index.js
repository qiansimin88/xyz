import Vue from 'vue';
import Router from 'vue-router';

const HelloWorld = () => import('@/components/HelloWorld');
const ShowPage = () => import('@/components/ShowPage');
const Login = () => import('@/page/login/index.vue');

import Store from '@/vuex/store.js';

Vue.use(Router);
//导航实例
const  constInstanceRouter = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    }, {
      path: '/show',
      name: 'ShowPage',
      component: ShowPage,
      //添加登录鉴权开关（路由级开关）
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
});

//全局的路由导航守卫
constInstanceRouter.beforeEach( ( to, from, next ) => {
  //如果需要判断
  if( to.meta.requireAuth ) {
    //判断store是否有token
    if( Store.state.token ) {
      next();
    }else {
      // 跳转登录并且 带有referrer 方便回跳
      next({
        path: '/login',
        query: {
          referrer: to.fullPath 
        }
      })
    }
  }else {
    next();
  }
} );

export default constInstanceRouter;
