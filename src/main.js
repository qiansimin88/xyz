// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import iView from 'iview';   //全部引用 因为采用了按需加载  所以这里就不应该这样引用了 
import App from './App';
import router from './router';
import store from './vuex/store';
import ComponentsInit  from '@/components/iviewComponents.js';
import Http from '@/http';

Vue.config.productionTip = false;
ComponentsInit( Vue );
Vue.use( Http );
//初始化所有的组件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //store注入到每个子组件中
  store,
  components: { App },
  template: '<App/>',
});
