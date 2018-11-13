import store from 'store';
import * as types from '@/vuex/types';
const LoginHandler = {
    success ( info, commit ) {
        info = info.data;
        store.set('user_id',  info.data.userId );
        store.set('account',  info.account );
        store.set('nick_name',  info.data.nickName );
        store.set('session_token',  info.token );
        store.set('user_info', info.data );
        //触发mutations的登录state
        commit({
            type: types.LOGIN_IN,
            token: info.token 
        });
    },
    fail ( commit ) {
        store.remove('session_token');
        store.remove('user_info');
        store.remove('nick_name');
        store.remove('account');
        store.remove('user_id');
        commit({
            type: types.LOGIN_OUT
        })
    }
}

export default LoginHandler;