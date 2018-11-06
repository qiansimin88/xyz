import fly from 'flyio/dist/npm/fly';
import store from '@/vuex/store';
import * as types from '@/vuex/types';
import router from '@/router';

const flyObj= Object.create( {} );
const flyio = new fly;

//通用配置
flyio.config = {
    method: "POST",//请求方法， GET 、POST ...
    headers: {
        'Content-Type': 'application/json'
    },
    baseURL: "/gateway",//请求基地址
    //是否自动将Content-Type为“application/json”的响应数据转化为JSON对象，默认为true
    parseJson: true,
    timeout: "5000"//超时时间
};

//http拦截器(请求)
flyio.interceptors.request.use( request => {
    console.warn( `发起请求： path:${ request.url }, 参数：${ JSON.stringify(request.body) }` );
    //如果有token加上token在请求头上
    if( store.state.token ) {
        request.headers['x-auth-token'] = store.state.token;
    }
    return Promise.resolve( request );
} );

flyio.interceptors.response.use( res => {
    let responese = res.data;
    if( responese.status !== 200 ) {
        return Promise.reject( responese );
    }
    return responese;
}, err => {
    //登录失效  跳转登录
    if( err.status === 401 ) {
        store.commit( types.LOGIN_OUT );
        router.replace( {
            path: '/login',
            query: router.currentRoute.fullPath
        } )
    }
    return Promise.reject( err );
} );


const httpInstance = flyObj.install = ( vue, options ) => {
    vue.prototype.api = flyio;
}

export default httpInstance;