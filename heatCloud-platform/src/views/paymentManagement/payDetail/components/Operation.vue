<template>
  <span>
    <el-button v-if="option === '统计'" size="small" type="default" @click.native.prevent="toggleVisible">统计详情</el-button>
    <el-dialog
      :append-to-body="true"
      :title="'统计详情'"
      width="750px"
      :visible="visible"
      @close="visible = false"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" label-width="60px">
       <el-form-item label="地区"  style="width: 100%;">
          <g-address
            style="display: inline-block;height: 34px;margin: 0;"
            :item-size="'small'"
            :options-data="form.address"
            :handle-selection-result="handleAddressChange"
            :provinces="provinces"
            :cities="cities"
            :counties="counties"
            :streets="streets"
            :villages="villages">
          </g-address>
        </el-form-item>
      </el-form>

      <div class="detail">
        <div>
          应收金额：<span class="mount">{{shouldPay}}</span>
          <span class="bi">元</span>
        </div>
         <div>
           实收金额：<span class="suc-c">{{actualPay}}</span>
           <span class="bi">元</span>
        </div>
         <div>
           未收金额：<span class="err-c">{{noPay}}</span>
           <span class="bi">元</span>
        </div>
      </div>

       <div class="detail">
        <div>
          应收笔数：<span class="mount">{{shouldNum}}</span>
          <span class="bi">笔</span>
        </div>
         <div>
           实收笔数：<span class="suc-c">{{actualNum}}</span>
           <span class="bi">笔</span>
        </div>
         <div>
           未收笔数：<span class="err-c">{{noNum}}</span>
           <span class="bi">笔</span>
        </div>
      </div>


      <div slot="footer" class="dialog-footer">
        <!--<el-button size="small" @click="visible = false">取 消</el-button>-->
        <el-button size="small" type="primary" @click="visible = false">确 定</el-button>
      </div>
    </el-dialog>
  </span>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import addressMixin from '@/views/basicSetting/area/mixins/addressMixin'
import GAddress from '@/components/GlobalComponents/GAddress'
import {userOrderSummary} from "../vuex/api";

const namespace = 'exchangeList';


export default {
  name: 'Operation',
  mixins: [addressMixin],
  components: {GAddress},
  props: {
    row: {
      type: Object,
      default: () => ({

      }),
    },
    orderId:undefined,
    option: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visible: false,
      form: { ...this.row },
      shouldPay:0,
      actualPay:0,
      noPay:0,
      shouldNum:0,
      actualNum:0,
      noNum:0,

    };
  },
  computed: {
    ...mapGetters('authList', ['']),
  },
  mounted() {

  },

  methods: {
    ...mapActions('authList', ['Create', 'Update']),

    init() {

    },

    toggleVisible() {
      this.orderSummary();
      this.initQueryConditions();
      this.visible = !this.visible;
      this.form = { ...this.row };
      this.$nextTick(() => {
        if (this.visible) {
          this.$refs.form.clearValidate();
        }
      });
    },
    handleAddressChange(selectResult) {

      this.form.address = {
        ...this.form.address,
        ...selectResult.form
      };
      this.handleAddressData(selectResult);
      this.orderSummary();
    },


    /**t统计*/
    orderSummary(){
      let dic,city,county,province,street,village;
      if (this.form.address){
        if (this.form.address.city){
          city=this.form.address.city
        }
        if (this.form.address.county){
          county=this.form.address.county
        }
        if (this.form.address.province){
          province=this.form.address.province
        }
        if (this.form.address.street){
          street=this.form.address.street
        }
        if (this.form.address.village){
          village=this.form.address.village
        }
      }
      dic = {
        city:city,
        county:county,
        orderId:this.orderId,
        province:province,
        street:street,
        village:village,
      }
      userOrderSummary(dic).then(res=>{
        this.shouldPay = res['shouldPay'];
        this.actualPay = res['actualPay'];
        this.noNum = res['noNum'];
        this.noPay = res['noPay'];
        this.shouldNum = res['shouldNum'];
        this.actualNum = res['actualNum'];
      })
    },
    handleConfirm(){

    },

    handleClose() {
      this.toggleVisible();
      this.$emit('close');
    },
    clearSearchArea(type) {
      switch (type) {
        case 'province':
          this.form.address.city = '';
          this.form.address.county = '';
          this.form.address.street = '';
          this.form.address.village = '';
          break;
        case 'city':
          this.form.address.county = '';
          this.form.address.street = '';
          this.form.address.village = '';
          break;
        case 'county':
          this.form.address.street = '';
          this.form.address.village = '';
          break;
        case 'street':
          this.form.address.village = '';
          break;
        case 'village':
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/styles/common-content.scss";
  .detail{
    margin-top: 10px;
    height: 15px;
    width: 100%;
    div{
      float: left;
      width: 33%;
      padding-left: 20px;
      height: 15px;
      font-size:14px;
      font-family:Microsoft YaHei;
      color: rgba(3,3,3,1);
      .mount {
        color: #e8b004;
      }
      .bi {
        color: #666;
      }
    }
  }
</style>
