<template>
  <div class="hello">
    {{ $store.state.count }}
  </div>
</template>

<script>
import store from '@/vuex/store';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  store
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
