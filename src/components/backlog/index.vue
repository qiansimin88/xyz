<template>
 <div class="backlog" :style="style">
    <!--操作头部-->
    <div class="header">
      <div class="arow">
        <div class="left-arow">
        </div>
      </div>
      <div class="show-area">
        2019年3月
      </div>
      <div class="arow">
        <div class="right-arow">
        </div>
      </div>
    </div>
    <div class="week-list">
      <div v-text="o" class="week-item" v-for="o in weekList">
      </div>
    </div>
    <div class="day-block">
      <div class="day-item" v-for=" (o, index) in 14 ">
        <div class="show-day">
          {{ o }}
        </div>
        <div class="show-tips" v-show="index === 3 || index === 5 || index === 11">
          哈
        </div>
      </div>
    </div>
 </div>
</template>

<script>
export default {
  name: 'backlog',
  data() {
    return {
      weekList: ['一', '二', '三', '四', '五', '六', '日']
    };
  },
  props: {
      style: {
            type: Object,
            default () {
                return {
                    'width': '410px',
                    'height': '355px',
                    'background': '#0074ff'
                }
          }
      }
  },
  mounted () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.flex(@content: flex-start, @wrap: nowrap) {
  display: flex; justify-content: @content; align-items: center; flex-wrap: @wrap;
}
.day-block {
   .flex(flex-start, wrap ); padding: 0 3%; margin-top: 6px;
   .day-item {
     width: 14.2%; height: 50px; cursor: pointer; 
     .show-day {
       height: 30px; text-align: center; line-height: 30px; color: #fff; font-size: 12px;
     }
     .show-tips {
       text-align: center; height: 20px; width: 50%; background: #fff; border-radius:8px; margin: 0 auto; line-height: 20px; cursor: pointer;
     }
   }
}
.week-list {
  .flex; padding: 0 3%; margin-top: 6px;
  .week-item {
    color: #fff; font-size: 16px; width: 14.2%; text-align: center; margin: auto;
  }
}
.header {
  display: flex;
  .show-area {
    flex: 2.5; height: 47px; .flex(center); color: #fff; font-size: 18px;
  }
  .arow {
    cursor: pointer; color: #fff; flex: 1;  height: 47px; .flex(center);
    .left-arow { width: 12px; height: 12px; border-top: 2px solid #ffffff; border-left: 2px solid #ffffff; transform: rotate(-45deg);}
    .right-arow { width: 12px; height: 12px; border-top: 2px solid #ffffff; border-right: 2px solid #ffffff; transform: rotate(45deg);}
  }
}
</style>
