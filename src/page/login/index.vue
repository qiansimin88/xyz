<template>
  <div class="qsm-login-bg">
      <div class="qsm-login-box">
        <div>
          静 与 陷 <span>阱</span>
        </div>
        <div>

        </div>
      </div>
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
<style lang="less" scoped>
.qsm-login-bg {
  height: 100%; width: 100%; background: url(https://cdnimg.3dker.cn/304cf47b54b48adda0e15093181de9a8@2565w_100q_1e_238-238-238bgc) no-repeat center center; position: fixed; left: 0; top: 0; background-size: cover;
  .qsm-login-box {
    position: fixed; right: 150px; bottom: 80px; width: 420px; height: 510px; 
    > div:nth-of-type(1) {
      color: #fff; font-size: 38px; text-align: center; display: flex;  justify-content: center;
      > span {
        font-size: 46px; transform: rotate( 30deg ); padding-left: 10px; color:rgb(236,23,140);
      }
    }
    > div:nth-of-type(2) {
      background: rgba(234,250,255,.3); width: 100%; height: 480px;
    }
  }
}
</style>
