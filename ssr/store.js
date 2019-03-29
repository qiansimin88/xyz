import Vue from 'vue';
import Vuex from 'vuex';
import { flyio as api } from '@/http';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      items: {},
    },
    actions: {
      // 登录
      login({ commit }, payload) {
        return new Promise((resolve, reject) => {
          api.get('/user/doLogin', payload)
            .then((data) => {
              commit('setItem', { id: 1, item: '哈哈' });
              // 登录了
              resolve(data.data);
            })
            .catch((err) => {
              // 登录失败
              reject(err);
            });
        });
      },
    },
    mutations: {
      setItem(state, { id, item }) {
        Vue.set(state.items, id, item);
      },
    },
  });
}
