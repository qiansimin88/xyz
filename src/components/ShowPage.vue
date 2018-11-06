<template>
  <div class="hello">
    {{ count }}
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapState } from 'vuex';
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  mounted () {
       this.api.post('/demand/queryAllPageDemandByParam', {
      demandQueryDto: {"state":"","title":"","user":"","sortField":"","sortType":""}
    })
    .then( s => {
      console.log( s );
    } )
    .catch( err => {
      console.log( err );
    } );
  },
  store,
  computed: mapState([ 'count' ])
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
