<template>
  <div id="lineChart" :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import {debounce} from '@/utils'

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        chart: null,
        sidebarElm: null
      }
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val)
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 50)
      window.addEventListener('resize', this.__resizeHandler)

      // 监听侧边栏的变化
      this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHandler)
      }

      this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

      this.chart.dispose()
      this.chart = null
    },
    methods: {
      sidebarResizeHandler(e) {
        if (e.propertyName === 'width') {
          this.__resizeHandler()
        }
      },
      setOptions({xAxisArr, firstData, secondData, thirdData} = {}) {
        this.chart.setOption({
          xAxis: {
            data: xAxisArr,
            boundaryGap: true,
            axisTick: {
              show: false
            }
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          legend: {
            icon: 'circle',
            align: 'left',
            right: '20px',
            data: ['一级', '二级', '三级']
          },
          series: [
            {
              name: '一级',
              itemStyle: {
                normal: {
                  color: '#F2637B',
                  lineStyle: {
                    color: '#F2637B',
                    width: 2
                  }
                }
              },
              smooth: true,
              type: 'line',
              data: firstData,
              animationDuration: 2800,
              animationEasing: 'cubicInOut'
            },
            {
              name: '二级',
              itemStyle: {
                normal: {
                  color: '#E5C95C',
                  lineStyle: {
                    color: '#E5C95C',
                    width: 2
                  },
                  // areaStyle: {
                  //   color: '#f3f8ff'
                  // }
                }
              },
              smooth: true,
              type: 'line',
              data: secondData,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            },
            {
              name: '三级',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#1890FF',
                  lineStyle: {
                    color: '#1890FF',
                    width: 2
                  },
                  // areaStyle: {
                  //   color: '#f3f8ff'
                  // }
                }
              },
              data: thirdData,
              animationDuration: 2800,
              animationEasing: 'exponentialOut'
            }
          ]
        }, true)
      },
      initChart() {
        this.chart = echarts.init(document.getElementById('lineChart'), 'macarons')
        this.setOptions(this.chartData)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .chart {
    /*padding: 0 30px;*/
  }
</style>
