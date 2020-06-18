<template>
  <sub-container :bgColor="'gray'">
    <div slot="sub" class="dashboard-container">
      <div class="dashboard-left">
        <!--<div class="left-top">-->
          <!--<div class="common-head">-->
            <!--<div class="common-head-title">快捷菜单</div>-->
          <!--</div>-->
          <!--<div class="shortcut-wrap" v-if="shortcutData.length > 3">-->
            <!--<template v-for="(shortcut, index) in shortcutData">-->
              <!--<div class="shortcut-item">-->
                <!--<img class="default-shortcut" :src="Asset.shortcut" alt="">-->
                <!--<span>{{shortcut.name}}</span>-->
              <!--</div>-->
            <!--</template>-->
            <!--<div class="shortcut-item">-->
              <!--<i class="icon-font icon-more"></i>-->
              <!--<span>更多</span>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="shortcut-wrap-short" v-if="shortcutData.length < 4">-->
            <!--<template v-for="(shortcut, index) in shortcutData">-->
              <!--<div class="shortcut-item">-->
                <!--<img class="default-shortcut" :src="Asset.shortcut" alt="">-->
                <!--<span>{{shortcut.name}}</span>-->
              <!--</div>-->
            <!--</template>-->
            <!--<div class="shortcut-item">-->
              <!--<i class="icon-font icon-more"></i>-->
              <!--<span>更多</span>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <div class="left-bottom">
          <div class="common-head">
            <div class="common-head-title">报表统计</div>
          </div>
          <div class="chart-container">
            <div class="chart-wrap">
              <div class="chart-title">
                <div>缴费金额</div>
                <div class="statistics-actions">
                  <el-dropdown size="small" trigger="click">
                    <el-button type="default" size="small" :class="[activePaymentIndex === 0 ? 'active-btn' : '']">
                      {{paymentYear}}年<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-for="(item, index) in allPaymentYears" :key="index"
                        @click.native="selectYearPaymentData(item)"
                      >{{item}}年</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <div :class="['all-year-btn', activePaymentIndex === 1 ? 'active-btn' : '']" @click="allYearPaymentData">所有年份</div>
                </div>
              </div>
              <div class="payment-total">当年累计缴费金额：
                <span class="payment-mount">¥ {{annualHadPay}}</span>
              </div>
              <bar-chart :chartData="histogramChartData"/>
            </div>
            <div class="chart-wrap">
              <div class="chart-title">
                <div>报警次数</div>
                <div class="statistics-actions">
                  <el-dropdown size="small" trigger="click">
                    <el-button type="default" size="small" :class="[activeWarningIndex === 0 ? 'active-btn' : '']">
                      {{warningYear}}年<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-for="(item, index) in allWarningYears" :key="index"
                        @click.native="selectYearWarningData(item)"
                      >{{item}}年</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <div :class="['all-year-btn', activeWarningIndex === 1 ? 'active-btn' : '']" @click="allYearWarningData">所有年份</div>
                </div>
              </div>
              <line-chart :chart-data="lineChartData"/>
            </div>
          </div>
        </div>
      </div>
      <div class="dashboard-right">
        <div class="right-top">
          <div class="common-head">
            <div class="common-head-title">数据概览</div>
          </div>
          <div class="preview-wrap">
            <div class="preview-item">
              <div class="item-title">用户总数</div>
              <div class="item-content">{{userSum}}户</div>
            </div>
            <div class="preview-item">
              <div class="item-title">阀门总数</div>
              <div class="item-content">{{controllerSum}}个</div>
            </div>
            <div class="preview-item">
              <div class="item-title">供暖总面积</div>
              <div class="item-content">{{preAreaSum}}㎡</div>
            </div>
            <div class="preview-item">
              <div class="item-title">总收费金额</div>
              <div class="item-content">{{chargeSum}}元</div>
            </div>
          </div>
        </div>
        <div class="right-bottom">
          <div class="common-head">
            <div class="common-head-title">企业信息</div>
          </div>
          <!--<div class="notice-wrap">-->
            <!--<div class="notice-item">-->
              <!--<div class="notice-title" :title="'反倒是飞机撒今飞凯达萨芬的升级啊飞机撒'">反倒是飞机撒今飞凯达萨芬的升级啊飞机撒</div>-->
              <!--<div class="notice-time">2020-04-22</div>-->
            <!--</div>-->
            <!--<div class="notice-item">-->
              <!--<div class="notice-title" :title="'反倒是飞机撒今飞凯达萨芬的升级啊飞机撒'">反倒是飞机撒今飞凯达萨芬的升级啊飞机撒</div>-->
              <!--<div class="notice-time">2020-04-22</div>-->
            <!--</div>-->
          <!--</div>-->
          <div class="info-wrap">
            <div class="info-item">
              <div class="item-title">企业名称</div>
              <div class="item-des">{{resData.name}}</div>
            </div>
            <div class="info-item">
              <div class="item-title">企业账号</div>
              <div class="item-des">{{resData.account}}</div>
            </div>
            <div class="info-item">
              <div class="item-title">企业电话</div>
              <div class="item-des">{{resData.phone}}</div>
            </div>
            <div class="info-item">
              <div class="item-title">企业地址</div>
              <div class="item-des">{{resData.address}}</div>
            </div>
            <div class="info-item">
              <div class="item-title">企业介绍</div>
              <div class="item-des">{{resData.introduce}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </sub-container>
</template>

<script>
  import { toThousands } from '@/utils'
  import { mapActions, mapGetters } from 'vuex'
  import { Asset } from '../../assets'

  export default {
    name: 'Dashboard',
    components: {
      SubContainer: () => import('@/components/GlobalComponents/SubContainer'),
      LineChart: () => import('./components/LineChart'),
      BarChart: () => import('./components/BarChart')
    },
    computed: {
      ...mapGetters('info', ['resData']),
      ...mapGetters('dashboard', ['histogramData', 'lineData'])
    },
    data() {
      return {
        Asset: Asset,
        lineChartData: {},
        histogramChartData: {},
        currentYearLineData: [],
        currentYearHistogramData: [],
        allPaymentYears: [],
        allWarningYears: [],
        paymentYear: new Date().getFullYear().toString(),
        warningYear: new Date().getFullYear().toString(),
        activePaymentIndex: 0,
        activeWarningIndex: 0,
        annualHadPay: 0,
        toThousands: toThousands,
        chargeSum: 0,
        controllerSum: 0,
        preAreaSum: 0,
        userSum: 0,
        shortcutData: [
          {
            routeInfo: '',
            name: '缴费新增'
          },
          {
            routeInfo: '',
            name: '收费标准维护'
          },
          {
            routeInfo: '',
            name: '报警日志查看'
          },
          {
            routeInfo: '',
            name: '操作日志查看'
          },
          {
            routeInfo: '',
            name: '缴费新增'
          },
        ]
      }
    },
    mounted() {
      const currentYear = new Date().getFullYear().toString();
      this.GetInfo({});
      this.initHistogram();
      this.initLine();
      this.initOverview();
      this.initHistogramByYear(currentYear);
      this.initLineByYear(currentYear);
    },
    methods: {
      ...mapActions('info', ['GetInfo']),
      ...mapActions('dashboard', [
        'GetHistogram', 'GetHistogramByYear', 'GetLine', 'GetLineByYear', 'GetOverview'
      ]),
      initHistogram() {
        this.GetHistogram({}).then(res => {
          res.orderHadPayList.map(item => {
            this.allPaymentYears.push(item.year);
          });
        });
      },
      initLine() {
        this.GetLine({}).then(res => {
          res.warningLogAllYearResultList.map(item => {
            this.allWarningYears.push(item.year);
          });
        });
      },
      initOverview() {
        this.GetOverview({}).then(res => {
          console.log(res);
          this.chargeSum = toThousands(res.chargeSum);
          this.controllerSum = toThousands(res.controllerSum);
          this.preAreaSum = toThousands(res.preAreaSum);
          this.userSum = toThousands(res.userSum);
        })
      },
      initHistogramByYear(year) {
        this.GetHistogramByYear({year: year}).then(res => {
          const currentData = res.filter(item => item.year === year.toString())[0];
          this.annualHadPay = toThousands(currentData.annualHadPay);
          this.getPaymentData(currentData);
        });
      },
      initLineByYear(year) {
        this.GetLineByYear({year: year}).then(res => {
          const currentData = res ? res.warningLogMonthResultList : []
          this.getWarningData(currentData || [], 'month');
        });
      },
      allYearPaymentData() {
        this.activePaymentIndex = 1;
        this.annualHadPay = toThousands(this.histogramData.allHadPay);
        this.getPaymentData(this.histogramData, 'year');
      },
      allYearWarningData() {
        this.activeWarningIndex = 1;
        const currentData = this.lineData ? this.lineData.warningLogAllYearResultList : [];
        this.getWarningData(currentData || [], 'year');
      },
      selectYearPaymentData(year) {
        this.initHistogramByYear(year);
        this.paymentYear = year;
        this.activePaymentIndex = 0;
      },
      selectYearWarningData(year) {
        this.warningYear = year;
        this.activeWarningIndex = 0;
        this.initLineByYear(year);
      },
      maxMonthList (a, b) {
        return a.length > b.length ? a : b
      },
      getWarningData(currentData, unit = 'month') {
        let xAxisArr = [],
          firstData= [],
          secondData = [],
          thirdData = [];
        currentData.map(item => {
          xAxisArr.push(`${parseInt(item[unit])}${unit === 'month' ? '月' : '年'}`);
          firstData.push(item.waringLevelNum1 || 0);
          secondData.push(item.waringLevelNum2 || 0);
          thirdData.push(item.waringLevelNum3 || 0);
        })
        this.lineChartData = {
          xAxisArr: xAxisArr,
          firstData: firstData,
          secondData: secondData,
          thirdData: thirdData
        }
      },
      getPaymentData(currentData, unit = 'month') {
        let xAxisArr = [],
          orderHadPay = {},
          orderNoPay = {};
        currentData.orderHadPayList && currentData.orderHadPayList.map(item => {
          orderHadPay[item[unit]] = item.money;
        })
        currentData.orderNoPayList && currentData.orderNoPayList.map(item => {
          orderNoPay[item[unit]] = item.money;
        })
        let orderHadPayMount = [],
          orderNoPayMount = [],
          maxList;
        maxList = currentData ? this.maxMonthList(currentData.orderHadPayList || [], currentData.orderNoPayList || []) : [];
        maxList.length && maxList.map(item => {
          xAxisArr.push(item[unit])
        })
        xAxisArr.forEach(item => {
          orderHadPayMount.push(orderHadPay[item] || 0);
          orderNoPayMount.push(orderNoPay[item] || 0);
        })
        this.histogramChartData = {
          xAxis: xAxisArr.map(item => `${parseInt(item)}${unit === 'month' ? '月' : '年'}`),
          orderHadPayMount: orderHadPayMount,
          orderNoPayMount: orderNoPayMount
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/variables.scss";

  .dashboard-container {
    display: flex;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    .dashboard-left {
      min-width: calc(100% - 470px);
      display: flex;
      flex-direction: column;
      .left-top {
        width: 100%;
        background: #fff;
        height: 208px;
        border-radius: 4px;
        margin-bottom: 20px;
        .shortcut-wrap-short {
          height: 152px;
          display: flex;
          flex-direction: row;
          justify-items: flex-start;
          padding-left: 60px;
          .shortcut-item {
            padding-right: 65px;
          }
        }
        .shortcut-wrap {
          height: 152px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .shortcut-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          .default-shortcut {
            width: 51px;
            height: 50px;
            margin-bottom: 5px;
          }
          span {
            font-size: 14px;
            margin-top: 22px;
          }
          .icon-font {
            color: #26B8B6;
            font-size: 51px;
            width: 51px;
          }
        }
        .shortcut-more {
          .icon-font {
            color: #26B8B6;
            font-size: 51px;
            width: 51px;
          }
        }
      }
      .left-bottom {
        flex: 1;
        background: #fff;
        border-radius: 4px;
        position: relative;
        .common-head {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: #fff;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
        .chart-container {
          padding: 0 30px 35px;
          position: absolute;
          top: 56px;
          bottom: 10px;
          left: 0;
          width: 100%;
          overflow-y: auto;
          overflow-x: hidden;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }
    }
    .chart-title {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(3, 3, 3, 1);
      margin: 20px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .statistics-actions {
        display: flex;
        flex-direction: row;
        align-items: center;
        .el-dropdown {
          button {
            width: 100px;
            border-radius: 4px 0 0 4px;
            font-family: Microsoft YaHei;
            font-size: 14px;
            font-weight: 400;
            padding: 8px 15px;
            &:hover {
              border:1px solid #409EFF;
              color: #409EFF;
              background: #fff;
            }
          }
        }
        .all-year-btn {
          border-width: 1px;
          border-style: solid;
          border-color: #D9D9D9 #D9D9D9 #D9D9D9 transparent;
          height: 32px;
          width: 100px;
          font-family: Microsoft YaHei;
          font-size: 14px;
          font-weight: 400;
          line-height: 31px;
          text-align: center;
          color: #606266;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          &:hover {
            border:1px solid #409EFF;
            color: #409EFF;
          }
        }
        .active-btn {
          border:1px solid #409EFF;
          color: #409EFF;
        }
      }
    }
    .payment-total {
      /*margin-left: 30px;*/
      color: #666;
      .payment-mount {
        color: $menuActiveText;
      }
    }
    .common-head {
      height: 56px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-bottom: solid 1px rgba(233, 233, 233, 1);
      padding: 0 30px;
      .common-head-title {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(3, 3, 3, 1);
      }
    }
    .dashboard-right {
      width: 450px;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      .right-top {
        width: 100%;
        height: 420px;
        margin-bottom: 20px;
        background: #fff;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        .preview-wrap {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .preview-item {
            border-bottom: dashed 1px #ccc;
            padding: 10px 0;
            &:first-child {
              padding-top: 0;
            }
            &:last-child {
              border: none;
              padding-bottom: 0;
            }
            .item-title {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              line-height: 22px;
            }
            .item-content {
              font-size: 30px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(3, 3, 3, 1);
              line-height: 38px;
            }
          }
        }
      }
      .right-bottom {
        width: 100%;
        flex: 1;
        background: #fff;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        position: relative;
        .common-head {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: #fff;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
        .info-wrap {
          flex: 1;
          position: absolute;
          top: 56px;
          bottom: 10px;
          left: 0;
          width: 100%;
          overflow-y: auto;
          padding-top: 10px;
          .info-item {
            padding: 10px 30px;
            .item-title {
              font-family: Microsoft YaHei;
              font-weight: 400;
              font-size: 16px;
              color: #333;
              margin-bottom: 10px;
            }
            .item-des {
              font-family: Microsoft YaHei;
              font-weight: 400;
              font-size: 14px;
              color: #666;
              line-height: 22px;
            }
          }
        }
        .notice-wrap {
          flex: 1;
          overflow: hidden;
          padding-top: 5px;
          .notice-item {
            margin: 0 30px;
            height: 65px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            border-bottom: dashed 1px #ccc;
            &:last-child {
              border: none;
            }
            .notice-title {
              max-width: 320px;
              color: #333;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .notice-time {
              margin-top: 8px;
              color: rgba(153, 153, 153, 1);
            }
          }
        }
      }
    }
    .el-icon-arrow-down {
      margin-left: 8px;
    }
  }
  .el-dropdown-menu__item {
    font-family: Microsoft YaHei;
    font-size: 14px;
    font-weight: 400;
    padding: 5px 20px;
  }
</style>
