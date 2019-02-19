//工厂模式的  创建实例 路由
import Vue from 'vue'
import Router from 'vue-router'

const HelloWorld = () => import('@/components/HelloWorld');
const ShowPage = () => import('@/components/ShowPage');
const Login = () => import('@/page/login/index.vue');
const stlview = () => import('@/page/stlview/index.vue');


Vue.use( Router );

export function createRouter () {
    return new Router({
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
            },
            {
                path: '/stlview',
                name: 'stlview',
                component: stlview
            }
        ]
    }) 
}