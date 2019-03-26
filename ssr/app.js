import Vue from 'vue';
import App from '../src/App.vue';
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync';

// 导出一个工厂函数  用于创建全新的实例 避免NODE的单例模型互窜
export default () => {
  // 全新的路由实例
  const router = createRouter();
  const store = createStore();

  // 同步路由状态(route state)到 store
  sync(store, router);

  // 全新的Vue实例  将router和store注入
  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });
  return {
    app,
    router,
    store,
  };
};
