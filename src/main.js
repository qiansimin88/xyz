// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import iView from 'iview';   全部引用 因为采用了按需加载  所以这里就不应该这样引用了 
import App from './App';
import router from './router';
import store from './vuex/store';
import http from '@/http';
// import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.use( http );
// Vue.use( iview );

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //store注入到每个子组件中
  store,
  components: { App },
  template: '<App/>',
});
