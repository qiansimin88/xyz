
<template>
  <div class="hello">
      登录
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      msg: '',
    };
  },
  mounted () {
           this.api.post('/baidu', {
      name: 'qias'
    })
    .then( s => {
      console.log( s );
    } )
    .catch( err => {
      console.log( err );
    } );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
