<template>
  <div class="test">
    <h1>本场比赛得分： {{ $store.state.count }}</h1>
    <button @click="$store.commit('add')">加分</button>
    <button @click="$store.commit('reduce')">减分</button>
    <router-link to="/ShowPage">Go to Bar</router-link>
  </div>
</template>

<script>
import store from '@/vuex/store';

export default {
  name: 'HelloWorld',
  data() {
    return {
    };
  },
  store
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
