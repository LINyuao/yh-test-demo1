<template>
  <div
    id="myChart"
    :style="{ width: '100%', height: '220px !important' }"
  ></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    let chart = document.getElementById("myChart");
    chart.style.width = window.innerWidth + "px";
    this.myChart = this.$echarts.init(chart);
    setInterval(this.lineInit, 2000);
    let _this = this;
    window.addEventListener("resize", function() {
      let chart = document.getElementById("myChart");
      chart.style.width = window.innerWidth + "px";
      _this.myChart.resize();
    });
    this.mycharts();
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    mycharts() {
      let option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["第一周", "第二周", "第三周", "第四周"],
          splitLine: {
            show: false,
            lineStyle: {
              color: ["#cccccc"]
            }
          },
          //  改变x轴颜色
          axisLine: {
            lineStyle: {
              color: "#cccccc"
            }
          }
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false,
            lineStyle: {
              color: ["#cccccc"]
            }
          },
          //  改变x轴颜色
          axisLine: {
            lineStyle: {
              color: "#cccccc"
            }
          }
        },
        series: [
          {
            name: "最高气温",
            type: "line",
            color: "#FB6823",
            areaStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#FECF84" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#FFE8DA" // 100% 处的颜色
                  }
                ]
              }
            },
            smooth: true,
            smoothMonotone: true,
            data: [22, 26, 40, 22],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                // { type: "min", name: "最小值" },
                { xAxis: 1, yAxis: 26, value: 26 },
                { xAxis: 3, yAxis: 22, value: 22 }
              ]
            }
          }
        ]
      };

      this.myChart.setOption(option);
      //   window.onresize = this.myChart.resize;
    }
  }
};
</script>
<style lang="scss" scoped>
// #myChart {
//   width: 100% !important;
//   height: 300px;
// }
// canvas {
//   width: 100%;
// }
</style>
