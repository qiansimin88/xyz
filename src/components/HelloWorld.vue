<template>
  <div class="test">
    更新122223333222256
    <div>
    {{ a.c }}
    </div>
    <div>
      {{ a.kk }}
    </div>
    <h1>本场比赛得分： {{ handlerCount }}</h1>
    <button @click="addAction(3)">加分</button>
    <button @click="reduce">减分</button>
    <button @click="test">普通方法</button>
    <router-link to="/show">Go to Bar</router-link>
  </div>
</template>

<script>
// mapState: 是取数据的
// mapMutations: 是取方法的（同步）
//mapGetters: 是取经过过滤的数据的
//mapActions:异步 处理方法
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import { setTimeout } from 'timers';
export default {
  name: 'HelloWorld',
  data() {
    return {
      a: {
        c: 1
      }
    }
  },
  beforeCreate () {
    console.log('beforeCreate');
    console.log( this.a.c );
    console.log( this.$el );
  },
  created () {
    console.log('created');
    console.log( this.a.c );
    console.log( this.$el );

    this.$nextTick(() => {
      console.log('33333333');
      console.log( this.$el );
    })
  },
  beforeMount () {
    console.log('beforeMount');
    console.log( this.a.c );
    console.log( this.$el );
  },
  mounted () {
    console.log('mounted');
    console.log( this.a.c );
    console.log( this.$el );
    this.api.post('/baidu', {
      name: 'qias'
    })
    .then( s => {
      console.log( s );
    } )
    .catch( err => {
      console.log( err );
    } );
  },
  methods: {
    ...mapMutations( [ 'add', 'reduce' ] ),  //...扩展运 算符解析对象  
    ...mapActions( [ 'addAction' ] ),
    test () {
      console.log( 1111 );
    }
  },
  // methods: mapMutations(['add']),
  computed: {
    ...mapState( [ 'count' ] ),
    ...mapGetters( ['handlerCount'] )
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
