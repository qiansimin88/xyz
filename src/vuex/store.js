import Vuex from 'vuex';
import Vue from 'vue';
import * as types from './types';

Vue.use( Vuex );

//数据
const state = {
    count: 1,
    token: 2
};

//方法（同步）
const mutations = {
    add( state, n ) {
        state.count += n;
    },
    reduce( state ) {
        state.count--; 
    },
    //清楚登录信息
    [types.LOGIN_OUT] ( state ) {
        state.token = null;
    }
}

//异步
const actions = {
    //context上下文
    addAction ( context, n) {
        setTimeout( _ => {
            context.commit( 'add', n );  //执行上面 mutations里面的add
        },2000 );
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