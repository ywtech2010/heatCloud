<template>
  <span>
    <el-button  size="small" type="text" @click.native.prevent="toggleVisible">详情</el-button>
    <el-dialog
      :append-to-body="true"
      :title="orderInfo['name'] || '缴费详情'"
      width="700px"
      :visible="visible"
      @close="visible = false"
      :close-on-click-modal="false">

      <div >
        <div class="full-div">
          缴费名称：<span>{{orderInfo['name']?orderInfo['name']:''}}</span>
        </div>

        <div class="half-div">
          收费天数：<span>{{orderInfo['days']?orderInfo['days']:'0'}}天</span>
        </div>

        <div class="half-div">
          收费标准：<span>{{orderInfo['chargeStandard']?orderInfo['chargeStandard']:'0'}}元/天/m²</span>
        </div>
        <div class="half-div">
          缴费开始时间：<span>{{orderInfo['startDate']|formatDate}}</span>
        </div>
        <div class="half-div">
          缴费截止时间：<span>{{orderInfo['endDate']|formatDate}}</span>
        </div>
        <div class="half-div">
          创建时间：<span>{{orderInfo['createDate']|formatDate}}</span>
        </div>
        <div class="half-div">
          发布时间：<span>{{orderInfo['publicDate']|formatDate}}</span>
        </div>
        <div class="half-div">
          优惠名称：<span>{{orderInfo['preferentialName'] || '/'}}</span>
        </div>
        <div class="half-div">
          创建人：<span>{{orderInfo['userName'] || '/'}}</span>
        </div>
        <div class="half-div" style="width: 100%">
          缴费说明：<span>{{orderInfo['introduce'] || '/'}}</span>
        </div>
        <div class="el-form-item__label1">
         缴费对象：<span>{{orderInfo['orderTarget'] || '暂无'}}</span>
        </div>
      </div>
    </el-dialog>
  </span>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';
  import { backendDetail } from "../vuex/api";
  import { formatDate } from '@/utils'

  export default {
    name: 'BackendDetail',
    components: {},
    props: {
      row: {
        type: Object,
        default: () => ({
          id:'',
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
      };
    },
    computed: {
      ...mapGetters('payment', ['']),
    },
    filters: {
      formatDate(time) {
        if (time){
          return formatDate.convertTime(time, "yyyy-MM-dd HH:mm:ss");
        } else {
          return '/'
        }
      }
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
        backendDetail({orderId:this.order['id']}).then(res=>{
          this.orderInfo = res;
          // if (this.orderInfo['orderTargetList']&&this.orderInfo['orderTargetList'].length){
          //   this.orderInfo['targetStr']='';
          //   for (let i=0;i<this.orderInfo['orderTargetList'].length;i++) {
          //     let str ='';
          //     str=this.orderInfo['orderTargetList'][i]['orderTarget']+'、';
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
  .form-item{
    width: 50%;
    float: left;
  }
  .full-div{
    margin-bottom: 22px;color:#030303;
  }
  .full-div span {
    color: #666;
  }
  .half-div{
    width: 50%;float: left;margin-bottom: 22px;color:#030303;
  }
  .half-div span {
    color: #666;
  }
  .el-form-item__label1{
    line-height: 20px !important;font-family:Microsoft YaHei;font-weight:400;color:rgba(3,3,3,1);margin-bottom: 22px
  }
  .el-form-item__label1 span {
    color: #666;
  }
  .el-form-item__label2{
    height: 32px !important;line-height: 32px !important;font-family:Microsoft YaHei;font-weight:400;color:rgba(3,3,3,1);
  }
</style>
