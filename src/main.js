// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/store';
import http from '@/http'

Vue.config.productionTip = false;
Vue.use( http );

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //store注入到每个子组件中
  store,
  components: { App },
  template: '<App/>',
});
