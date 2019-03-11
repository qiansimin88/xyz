<template>
 <div class="backlog" :style="styleProp">
    <!--操作头部-->
    <div class="header">
      <div class="action-btn" @click="goOneDay(nowTime)">
        今天
      </div>
      <div class="arow" @click="changeMonth('prew')">
        <div class="left-arow" >
        </div>
      </div>
      <div class="show-area">
        {{ showDate }}
      </div>
      <div class="arow"  @click="changeMonth('next')">
        <div class="right-arow">
        </div>
      </div>
    </div>
    <div class="week-list">
      <div v-text="o" class="week-item" v-for="o in weekList">
      </div>
    </div>
    <div class="day-block">
      <div class="day-item" v-for=" (o, index) in days " :key="index">
        <div class="show-day" :class="{ 'during-month': !o.duringMonth, 'isToday': o.isToday }">
          {{ o.showDay }}
        </div>
        <div class="show-tips" v-show="index === 3 || index === 5 || index === 11">
          2
        </div>
      </div>
    </div>
 </div>
</template>

<script>
import * as UTILS from './index.js';
export default {
  name: 'backlog',
  data() {
    return {
      nowTime: new Date().getTime(),
      weekList: ['一', '二', '三', '四', '五', '六', '日'],
      days: [],
      showDate: '',
      itemDate: ''  // 临时时间
    };
  },
  props: {
      todoArray: {
        type: Array
      },
      styleProp: {
            type: Object,
            default () {
                return {
                    'width': '410px',
                    'height': '384px',
                    'background': '#0074ff'
                }
          }
      },
      //显示的月份 默认当前时间
      date: {
        type: [Number, String],
        default: new Date().getTime()
      }
  },
  created () {
    this.itemDate = this.date;
    this.init();
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    init() {
      this.renderList( this.itemDate );
      this.showDate = `${UTILS.dateGetNumbers(this.itemDate, 'y')}年${UTILS.dateGetNumbers(this.itemDate, 'm')}月`
    },
    //接受日期 渲染当前月
    renderList ( date ) {
      this.days = UTILS.pageDays( date );
    },
    //上个月
    changeMonth( way ) {
      this.itemDate = UTILS.changeMonth( this.itemDate, way );
      this.$emit( 'changeMonth', this.itemDate, way );
      this.init();
    },
    //去任意一天的所在月 时间戳 或者 '2015/2/2'
    goOneDay( date ) {  
      try {
        if( typeof date === 'String' ) {
          date = new Date(date.toString()).getTime();
        }
        this.itemDate = date;
        this.init();
      }catch( e ) {
        console.warn("date type must be timestamp or '2017/2/2'!");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.action-btn {
  .flex; color: #fff; flex: 0.5; cursor: pointer; font-size: 14px; 
}
.flex(@content: flex-start, @wrap: nowrap) {
  display: flex; justify-content: @content; align-items: center; flex-wrap: @wrap;
}
.day-block {
   .flex(flex-start, wrap ); padding: 0 3%; margin-top: 6px;
   .day-item {
     width: 14.2%; height: 50px; cursor: pointer; 
     .show-day {
       height: 30px; text-align: center; line-height: 30px; color: #fff; font-size: 14px;
       &.during-month {
         color: #bfbfbf;
       }
       &.isToday {
         color: red;
       }
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
