<template>
  <span>
    <el-button  size="small" type="text" @click.native.prevent="toggleVisible">详情</el-button>
    <el-dialog
      :append-to-body="true"
      :title="'缴费详情'"
      width="700px"
      :visible="visible"
      @close="visible = false"
      :close-on-click-modal="false"
    style="height: auto;min-height: 300px">

      <div >
        <div class="half-div">
          阀门序列号：{{order['controllerCode']}}
        </div>

        <div class="half-div">
          用户名：{{orderInfo['userName']}}
        </div>

        <div class="half-div">
          联系方式：{{orderInfo['phone']}}
        </div>
        <div class="half-div">
          收费标准：{{orderInfo['chargeStandard']}}元/天/m²
        </div>
        <div class="half-div">
          收费天数：{{orderInfo['days']}}天
        </div>
        <div class="half-div">
          供暖面积：{{orderInfo['area']}}m²
        </div>
        <div class="half-div">
          应缴费用：{{orderInfo['shouldPay']}}元
        </div>
        <div class="half-div">
          实际缴费：{{orderInfo['actualPay']}}元
        </div>
        <div class="half-div">
          缴费状态：{{orderInfo['status']==0?'未缴费':'已缴费'}}
        </div>
        <div class="half-div">
          缴费时间：{{orderInfo['createDate'] || '/'}}
        </div>
        <div class="half-div">
          优惠名称：{{orderInfo['preferentialName'] || '/'}}
        </div>
        <div class="half-div">
          订单编号：{{orderInfo['orderNo']}}
        </div>

        <div class="half-div" style="width: 100%">
          用户地址：{{orderInfo['address'] || '/'}}
        </div>
      </div>
      <!--<el-button  style="margin-left: 300px; text-align: center" type="primary">缴费打印</el-button>-->
    </el-dialog>
  </span>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';
  import { userPayDetail } from "../vuex/api";

  export default {
    name: 'UserOrderDetail',
    components: {},
    props: {
      row: {
        type: Object,
        default: () => ({
          id:'',
          controllerCode:'',
          preferentialName:''
        }),
      },
      option: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        visible: false,
        // form: { ...this.row },
        order:{...this.row},
        orderInfo:{},
        rules:{
          name: [
            {
              required: true,
              message: '缴费名称不能为空',
              trigger: 'blur'
            },
          ],
          chargeStandard: [
            {
              required: true,
              message: '收费标准不能为空',
              trigger: 'blur'
            },
          ],
          days: [
            {
              required: true,
              message: '收费天数不能为空',
              trigger: 'blur'
            },
          ],
          startDate: [
            {
              required: true,
              message: '开始时间不能为空',
              trigger: 'blur'
            },
          ],
          endDate: [
            {
              required: true,
              message: '截止时间不能为空',
              trigger: 'blur'
            },
          ],
        },
      };
    },
    computed: {
      ...mapGetters( ['']),
    },
    methods: {
      ...mapActions('payment', ['Create', 'Update']),
      toggleVisible() {

        this.visible = !this.visible;
        this.order = { ...this.row };
        this.init();
        this.$nextTick(() => {
          if (this.visible) {
            // this.$refs.form.clearValidate();
          }
        });
      },

      init(){
        userPayDetail({orderId:this.order['id']}).then(res=>{
          this.orderInfo = res;
          // if (this.orderInfo['orderTargetList']&&this.orderInfo['orderTargetList'].length){
          //
          //   for (let i=0;i<this.orderInfo['orderTargetList'].length;i++) {
          //     let str ='';
          //     str=this.orderInfo[i]['provice']+this.orderInfo[i]['city']+this.orderInfo[i]['county']+
          //       this.orderInfo['street']+this.orderInfo['village']+'、';
          //     this.orderInfo['targetStr']=this.orderInfo['targetStr']+str;
          //   }
          //
          // } else {
          //   this.orderInfo['targetStr']='';
          // }
        }).catch(()=>{

        });
      },

      handleClose() {
        this.toggleVisible();
        this.$emit('close');
      },
      async handleConfirm() {

      },
    },
  };
</script>
<style scoped>
  /deep/.el-dialog{
    height:420px !important;
  }
  .form-item{
    width: 50%;
    float: left;
  }
  .full-div{
    height: 15px!important;margin-bottom: 22px;color:#030303;
  }
  .half-div{
    height: 15px!important;width: 50%;float: left;margin-bottom: 22px;color:#030303;
  }
  .el-form-item__label1{
    line-height: 20px !important;font-family:Microsoft YaHei;font-weight:400;color:rgba(3,3,3,1);margin-bottom: 22px
  }
  .el-form-item__label2{
    height: 32px !important;line-height: 32px !important;font-family:Microsoft YaHei;font-weight:400;color:rgba(3,3,3,1);
  }
</style>
