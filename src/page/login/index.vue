<template>
  <div class="qsm-login-bg">
      <div class="qsm-login-box">
        <div>
          静 与 陷 <span>阱</span>
        </div>
        <div class="qsm-login-area">
            <div>
              <!-- http://cdnimg.3dker.cn/e4c4a3d841a4391b3d8c4198fbbded6f@70w_100q_1e.png -->
              <!-- https://test-img.3dker.cn//152eb51ae156e986a23d13eb52f476db@85w_60h_1e_1c_90q -->
              <img src="https://test-img.3dker.cn//152eb51ae156e986a23d13eb52f476db@85w_60h_1e_1c_90q" alt="">
            </div>
            <div>
                <div>
                  <input type="text" v-model="account" placeholder="Nome utente"/>
                </div>
                <div>
                  <input type="text" v-model="password" placeholder="Password"/>
                </div>
                <Button @click="Login" :loading="loginLoading" style="margin-top: 40px;" type="primary" shape="circle" long>Sign In</Button>
            </div>
            <div>
                go back to the past 
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
export default {
  name: 'Login',
  asyncData ({ store, route }) {
    return store.dispatch('login', 'xxi');
  },
  computed: {
    item () {
      return this.$store.state.items[1]
    }
  },
  data() {
    return {
      account: null,
      password: null,
      loginLoading: false
    };
  },
  methods: {
    ...mapActions( ['login'] ),
    Login () {
      let { account, password } = this; 
      if( this.loginLoading ) return;
        this.loginLoading = true;
        this.login( { account, password } )
          .then( data => {
              this.$Message.info('登录成功');
          } )
          .catch( err => {
            console.log( err );
          } )
          .finally ( _ => {
            this.loginLoading = false;
          } ); 
    }
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
  // https://cdnimg.3dker.cn/304cf47b54b48adda0e15093181de9a8@2565w_100q_1e_238-238-238bgc.jpg
  height: 100%; width: 100%; background: url(https://cdnimg.3dker.cn/304cf47b54b48adda0e15093181de9a8@2565w_100q_1e_238-238-238bgc.jpg) no-repeat center center; position: fixed; left: 0; top: 0; background-size: cover;
  .qsm-login-box {
    position: fixed; right: 160px; bottom: 90px; width: 420px; height: 510px; 
    > div:nth-of-type(1) {
      color: #fff; font-size: 38px; text-align: center; display: flex;  justify-content: center;
      > span {
        font-size: 46px; transform: rotate( 30deg ); padding-left: 10px; color:rgba(234,250,255,.6);
      }
    }
    > div:nth-of-type(2) {
      background: rgba(234,250,255,0.3); width: 100%; height: 480px;
    }
  } 
  .qsm-login-area {
    > div:nth-of-type(1) {
      text-align: center; padding: 40px 0 30px;
    }
    > div:nth-of-type(2) {
      width: 85%; margin: 0 auto; margin-top: 20px;
      input[type="text"] {
        border: 0; background: transparent; outline: 0; font-size: 16px; line-height: 44px; color: #fff; text-indent: 2em;
      }
      input::-webkit-input-placeholder{
            color:#fff;
      }
      > div {
        border-bottom: 1px solid #fff;
      }
    }
    > div:nth-of-type(3) {
      margin: 60px 0 0 0px; color:rgba(234,250,255,1); font-size: 16px; font-family: "FS Albert Web",sans-serif; text-align: center;
    }
  }
}
</style>
