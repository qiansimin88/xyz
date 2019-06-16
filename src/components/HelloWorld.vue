<template>
  <div class="test">
    更新
    <h1>本场比赛得分： {{ handlerCount }}</h1>
    <button @click="addAction(3)">加分</button>
    <button @click="reduce">减分</button>
    <button @click="test">普通方法</button>
    <router-link to="/show">Go to Bar</router-link>
    <!-- <Calendar
      v-on:choseDay="clickDay"
      v-on:changeMonth="changeDate"
      :markDate="arr"
      :sundayStart='true'
    ></Calendar> -->
    <Backlog 
      @changeMonth='changeMonth'
      :todoArray="[
        {
          date: '2019/3/7',
          count: 20,
          action: toDo
        },
        {
          date: '2019/3/9',
          count: 4,
          action: toDo
        },
        {
          date: '2019/4/26',
          count: 10,
          action: toDo
        }
      ]"
      :date = 'date'
      :style-prop=" {
                    'width': '410px',
                    'height': '384px',
                    'background': '#0074ff'
                }">
    </Backlog>
    <div id="pandect" style="width: 600px;height:400px;">
    </div>
  </div>
</template>

<script>
// mapState: 是取数据的
// mapMutations: 是取方法的（同步）
//mapGetters: 是取经过过滤的数据的
//mapActions:异步 处理方法
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import Calendar from './calendar.vue';
import Backlog from './backlog/index.vue';
import echarts from 'echarts';

export default {
  name: 'HelloWorld',
  data() {
    return {
      date: new Date().getTime(),
      arr: ['2019/3/1','2019/4/3'] ,
      demoEvents: [{
        date: '2019/3/12', // 必填
        title: 'Foo' // 必填
      }, {
        date: '2019/3/15',
        title: 'Bar',
        desc: 'hahaha',
        customClass: 'disabled highlight' // 自定义日历单元格的Class，会加到对应的日历单元格上
      }]
    };
  },
  components: {
    Calendar,
    Backlog
  },
  mounted () {
    this.pandectInit();
    // this.api.post('/baidu', {
    //   name: 'qias'
    // })
    // .then( s => {
    //   console.log( s );
    // } )
    // .catch( err => {
    //   console.log( err );
    // } );
  },
  methods: {
    pandectInit() {
        const myChart =  echarts.init(document.getElementById('pandect'), 'dark');
        myChart.setOption({
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    },
    toDo( h ) {
      console.log(h);
    },
    changeMonth(date, way) {
      console.log( date, way );
    },
    clickDay(data) {
      console.log(data); //选中某天
    },
    changeDate(data) {
      console.log('y:' + data); //左右点击切换月份
    },
    clickToday(data) {
      console.log(data); // 跳到了本月
    },
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
.events-wrapper {
  /* display: none; */
}
</style>
