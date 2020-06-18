<template>
  <div id="barChart" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
// import resize from '../mixins/resize'
import { debounce } from '@/utils'

const animationDuration = 3000

export default {
  // mixin: [resize],
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
      default: '300px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type:Object,
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
    setOptions({xAxis, orderNoPayMount, orderHadPayMount} = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          icon: 'circle',
          align: 'left',
          right: '20px',
          data: ['已缴费', '未缴费']
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        xAxis: {
          data: xAxis,
          axisTick: {
            show: false
          }
        },
        yAxis: {
          splitArea: {show: false}
        },
        series: [
          {
            name: "未缴费",
            barGap: "-100%", /*这里设置包含关系，只需要这一句话*/
            barWidth: 16,
            data:  orderNoPayMount,
            type: "bar",
            itemStyle: {
              normal: {
                color: '#FBD437',
                barBorderRadius: [16, 16, 0, 0]
              }
            },
          },
          {
            barWidth: 16,
            data: orderHadPayMount,
            name: "已缴费",
            type: "bar",
            itemStyle: {
              normal: {
                color: '#1890FF',
                barBorderRadius: [16, 16, 0, 0]
              }
            },
          }
        ]
      }, true)
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('barChart'), 'macarons')
      this.setOptions(this.chartData);
    }
  }
}
</script>
