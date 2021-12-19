<template>
    <div class="contener">
    <ul>
      <li id="chartPie"></li>
      <li id="chartPie1"></li>
    </ul>
      <ul>
        <li id="chartPie2"></li>
        <li id="chartPie3"></li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "Echars",
       data(){
          return{
            chartPie:'' 
          }
       },
      methods:{
        drawPieChart() {
          let chartPie = this.$echarts.init(document.getElementById('chartPie'));
          chartPie .setOption({
            // 默认色板
            color: ['#4fc5e9', '#f86846', '#facd34'],
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            series: [
              {
                name: '拍摄入库数据',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                data: [
                  {value: 800, name: '商品成交量'},
                  {value: 200, name: '商品待发货'},
                  {value: 500, name: '商品已入库'}
                ],
                animationEasing: 'cubicInOut',
                animationDuration: 1500,
              }
            ]
          });
          window.addEventListener("resize",function(){
             chartPie.resize();

           });
        },
        drawPieChart1() {
          let chartPie = this.$echarts.init(document.getElementById('chartPie3'));
          chartPie.setOption({
            color: [ '#4fc5e9'],
              xAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周天']
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
              }]

        });
         window.addEventListener("resize",function(){
             chartPie.resize();

           });
        },
        drawPieChart2() {
          let chartPie = this.$echarts.init(document.getElementById('chartPie1'));
          chartPie.setOption({
            color: ['#66b1ff'],
            xAxis: {
              type: 'category',
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周天']
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar'
            }]

          });
           window.addEventListener("resize",function(){
             chartPie.resize();

           });
        },
        drawPieChart3() {
          let chartPie = this.$echarts.init(document.getElementById('chartPie2'));
          chartPie.setOption({
            color: ['#facd34'],
            xAxis: {
              type: 'category',
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周天']
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true
            }]

          });
           window.addEventListener("resize",function(){
             chartPie.resize();

           });
        },
      },
      mounted() {
        this.drawPieChart();
        this.drawPieChart1();
        this.drawPieChart2();
        this.drawPieChart3();
      }
    }
</script>

<style lang="scss" scoped>
  .contener{
    width: 100%;
    height: 100%;
    display: flex;
    align-items:flex-start ;
    justify-content: flex-start;
    flex-wrap: wrap;
    box-sizing: border-box;
    background-color: #ffffff;
    padding: 20px;
    
  }
  ul{
    width: 100%;
    height:40vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    padding:0px;
    margin: 0px;
  }


     li{
       width:49%;
       height: 100%;
       border: 1px solid #e6e6e6;

  }

</style>
