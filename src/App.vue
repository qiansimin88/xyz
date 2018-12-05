<template>
  <div id="app">
    <router-view/>
    <div id="footer">
      <div class="icp">
        浙ICP备18051810号-1
      </div>
      <div class="gaicp">
        <img src="./assets/beian.png">
        <span>
          浙公网安备 33010902002087号
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="less">
html, body, #app {
  height: 100%;
}
#app {
  display: flex; flex-direction: column;
  >div:nth-of-type(1) {
    flex: 1;
  }
}
#footer {
  display: flex; justify-content: center; align-items: center;
  .gaicp {
    display: flex; align-items: center; justify-content: center; margin-left: 20px;
  }
}
</style>
