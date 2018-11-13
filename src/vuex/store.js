import Vuex from 'vuex';
import Vue from 'vue';
import * as types from './types';
import { flyio as api } from '@/http';
import loginHanlder from '@/utils/login.js';
import store from 'store';

Vue.use( Vuex );

//数据
const state = {
    count: 1,
    token: store.get('session_token')
};

//方法（同步）
const mutations = {
    add( state, n ) {
        state.count += n;
    },
    reduce( state ) {
        state.count--; 
    },
    //清除登录信息
    [types.LOGIN_OUT] ( state ) {
        state.token = null;
    },
    //登录
    [types.LOGIN_IN] ( state, payload) {
        state.token = payload.token;
    }
}

//异步
const actions = {
    //context上下文
    addAction ( context, n) {
        setTimeout( _ => {
            context.commit( 'add', n );  //执行上面 muptations里面的add
        },2000 );
    },
    //登录
    login ( { commit }, payload ) {
        return new Promise( ( resolve, reject ) => {
            api.get( '/user/doLogin',  payload)
                .then( data => {
                    //登录了
                    loginHanlder.success( data, commit );
                    resolve( data.data );
                } )
                .catch( err => {
                    //登录失败
                    loginHanlder.fail( commit );
                    reject( err );
                } )
        } );
    } 
}

//过滤值 相当于 computed里面的get
const getters = {
    handlerCount ( state ) {
        return state.count += 5;
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});