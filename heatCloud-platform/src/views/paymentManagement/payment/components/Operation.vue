<template>
  <span>
    <el-button v-if="option === '新增缴费'" size="small" type="default" @click.native.prevent="toggleVisible">{{ option }}</el-button>
    <el-button v-else type="text" size="small" @click.native.prevent="toggleVisible">{{ option }}</el-button>
    <el-dialog
      :append-to-body="true"
      :title="option"
      width="675px"
      :visible="visible"
      @close="visible = false"
      :close-on-click-modal="false">

       <el-form
         :model="form"
         :rules="rules"
         ref="form"
         size="small"
         label-width="80px" >
        <el-form-item label="缴费名称" prop="name"  class="form-item">
          <el-input v-model="form.name" clearable style="width: 200px"/>
        </el-form-item>

        <el-form-item label="优惠名称" prop="preferentialName"  class="form-item">
          <el-select v-model="form.preferentialName" placeholder="请选择" style="width: 200px" disabled>
              <el-option
                v-for="item in perferList"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="收费标准" prop="chargeStandard"  class="form-item charge-standard">
          <el-input v-model="form.chargeStandard" type="number" style="width: 200px">
            <span style="padding-right: 5px" slot="suffix">元/天/㎡</span>
          </el-input>
        </el-form-item>

        <el-form-item label="收费天数" prop="days"  class="form-item">
          <el-input v-model="form.days" type="number" style="width: 200px">
            <span style="padding-right: 5px" slot="suffix">天</span>
          </el-input>
        </el-form-item>

        <el-form-item label="开始时间" prop="startDate"  class="form-item">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="limitDate"
            v-model="form.startDate"
            type="date"
            style="width: 200px"/>
        </el-form-item>

        <el-form-item label="截止时间" prop="endDate"  class="form-item">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="limitDate"
            v-model="form.endDate"
            type="date"
            style="width: 200px"/>
        </el-form-item>

        <el-form-item label="缴费对象" prop="orderTargetList" style="width: 100%;float: left" >
          <ObjectChoose
            v-if="chooseArr.length > 0"
            :targetArr="chooseArr"
            :targetStrArr="chooseStrArr"
            :targetList="targetList"
            option="查看对象"
            @close="close"
            @backChooseObject="showChildData">
          </ObjectChoose>
          <ObjectChoose v-else option="选择对象" @close="close" @backChooseObject="showChildData"></ObjectChoose>
        </el-form-item>

        <el-form-item label="缴费说明" prop="introduce" style="width: 100%;float: left">
          <el-input resize="none" show-word-limit type="textarea" style="width: 510px;" rows="7" maxlength="200" v-model="form.introduce"/>
        </el-form-item>

      </el-form>
      <div class="switches" style="margin-left: 80px;margin-bottom: 22px;">
          <span class="span1">是否不固定收费标准：</span>
          <el-switch
            v-model="form.isEdit"
            active-color="#13ce66"
            style="margin-right: 111px"></el-switch>
          <span class="span1">超出日期是否可继续缴费：</span>
          <el-switch
          v-model="form.isContinue"
          active-color="#13ce66"></el-switch>
        </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </span>

</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { backendAdd,backendUpdate,preferentialList, backendDetail } from "../vuex/api";
import GAddress from '@/components/GlobalComponents/GAddress'
import addressMixin from '@/views/basicSetting/area/mixins/addressMixin'
import ObjectChoose from './ObjectChoose'

export default {
  name: 'Operation',
  mixins: [addressMixin],
  components: {GAddress,ObjectChoose},
  props: {
    row: {
      type: Object,
      default: () => ({
        name: '',
        introduce: '',
        chargeStandard: '',
        days:'',
        startDate:'',
        endDate:'',
        id:'',
        orderTargetList:[],
        preferentialName:'',//优惠名称
        payObject:'',//临时
        editFlag:'',//是否收费
        continueFlag:'',//是否续费
        isEdit:false,
        isContinue:false,
        userId:'',
        userName: '',
        year:new Date().getFullYear().toString(),
      }),
    },
    option: {
      type: String,
      required: true,
    },
  },
  data() {
    const validateOrderTargetList = (rule, value, callback) => {
      if (!this.form.orderTargetList.length) {
        callback(new Error('请添加缴费对象'))
      } else {
        callback()
      }
    };
    const validateEndDate = (rule, value, callback) => {
      const start = this.form.startDate ? + new Date(this.form.startDate) : 0;
      const end = value ? + new Date(value) : 0;
      if (!end) {
        callback(new Error('请选择结束时间'))
      } else if (end < start) {
        callback(new Error('结束时间必须大于等于开始时间'))
      } else {
        callback()
      }
    };
    const validateChargeStandard = (rule, value, callback) => {
      if (!value || value < 0) {
        callback(new Error('请输入正确格式的缴费标准'))
      } else {
        callback()
      }
    };
    const validateChargeDays = (rule, value, callback) => {
      if (!value || value < 0) {
        callback(new Error('请输入正确的缴费天数'))
      } else {
        callback()
      }
    };
    return {
      visible: false,
      form: { ...this.row },
      rules:{
        name: [
          {
            required: true,
            message: '请输入缴费名称',
            trigger: 'blur'
          },
        ],
        chargeStandard: [
          {
            required: true,
            trigger: 'blur',
            validator: validateChargeStandard
          },
        ],
        days: [
          {
            required: true,
            trigger: 'blur',
            validator: validateChargeDays
          },
        ],
        startDate: [
          {
            required: true,
            message: '请选择开始时间',
            trigger: 'blur'
          },
        ],
        endDate: [
          {
            required: true,
            trigger: 'blur',
            validator: validateEndDate
          },
        ],
        orderTargetList: [
          {
            required: true,
            validator: validateOrderTargetList
          },
        ],
      },
      targetList: [],
      perferList:[],
      form1:{
        address:undefined
      },
      chooseStrArr:[],
      chooseArr:[],
      limitDate: this.dateTimeLimit(),
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
  },


  methods: {
    ...mapActions('payment', ['Create', 'Update']),
    getPreferList(){
      this.perferList=[];
      preferentialList().then(res=>{
          this.perferList=res['list'];
      }).catch(()=>{

      })
    },
    dateTimeLimit() {
      return {
        disabledDate(time){
          return time.getTime() < (Date.now() - 24 * 60 * 60 * 1000)//开始时间不选时，结束时间最大值小于等于当天
        }
      }
    },
    toggleVisible() {
      this.chooseStrArr=[];
      this.chooseArr=[];
      this.visible = !this.visible;
      this.form = { ...this.row };
      if (this.row.id) {
        backendDetail({orderId: this.row.id}).then(res => {
          this.targetList = res.orderTargetList;
          this.chooseArr = this.targetList.map(item => {
            return {
              province: item.province,
              city: item.city,
              county: item.county,
              street: item.street,
              village: item.village,
            }
          });
          this.chooseStrArr = this.targetList.map(item => {
            return item.orderTarget;
          })
        })
      }
      this.getPreferList();
      this.$nextTick(() => {
        if (this.visible) {
          this.$refs.form.clearValidate();
        }
      });
    },
    handleClose() {
      this.toggleVisible();
      this.$emit('close');
    },
    async handleConfirm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let result;
          if (this.option === '新增缴费') {
            this.addBackend();
          }
          if (this.option === '编辑') {
            this.updateOrder();
          }
          if (result) {
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
            this.handleClose();
          }
        } else {
          return false;
        }
      });
    },
    addBackend( ){
      if (this.form.isEdit) {
        this.form.editFlag="1";
      }else {
        this.form.editFlag="0";
      }
      if (this.form.isContinue) {
        this.form.continueFlag="1";
      }else {
        this.form.continueFlag="0";
      }
      this.form.userId=this.userInfo.userId;
      this.form.userName=this.userInfo.name;

      if (!this.form.orderTargetList.length) {
        this.$message({
          type: 'warning',
          message: '请选择缴费对象'
        });
        return false;
      }

      backendAdd(this.form).then(res=>{
        this.$message({
          type: 'success',
          message: '操作成功!',
        });
        this.handleClose();
      }).finally(()=>{

      }).catch(()=>{

      })
    },

    updateOrder(){
      if (this.form.isEdit) {
        this.form.editFlag="1";
      }else {
        this.form.editFlag="0";
      }
      if (this.form.isContinue) {
        this.form.continueFlag="1";
      }else {
        this.form.continueFlag="0";
      }
      this.form.userId=this.userInfo.userId;
      this.form.userName=this.userInfo.name;

      backendUpdate(this.form).then(res=>{
        this.handleClose();
        this.$message({
          type: 'success',
          message: '操作成功!',
        });
      }).finally(()=>{

      }).catch(()=>{

      })
    },

    handleAddressChange(selectResult) {

      this.form1.address = {
        ...this.form1.address,
        ...selectResult.form1
      };
      this.handleAddressData(selectResult);
      this.orderSummary();
    },

    close(){

    },

    showChildData(data){
      this.chooseStrArr=data.chooseStrArr;
      this.chooseArr=data.chooseArr;
      this.form.orderTargetList = this.chooseArr;
    },
  },
};
</script>
<style lang="scss" scoped>
  .form-item{
    width: 50%;
    float: left;
  }
  .item{
    height: 40px;
    float: left;
    display: inline-block;
    margin-right: 10px;
    .item-span{
      display: inline-block;
      padding:5px 10px;
      border:1px solid rgba(238,238,238,1);
      border-radius: 2px;
    }
    .delete-span{
      padding-left: 1px;
      font-size: 6px;
      color: rgb(252, 72, 80);
      display: inline-block;
      width: 10px;
      height: 10px;
      line-height: 6px;
      text-align: center;
      border-radius: 50%;
      border: 1px solid rgb(252,72,80);
      position: absolute;
      margin-left: -5px;
      margin-top: -5px;
    }
  }
  .charge-standard {
    /deep/ .el-input__inner {
      padding-right: 60px;
    }
  }
  /deep/.el-dialog__body{
    height: auto;display: inline-block;
    padding: 10px 30px;
  }
</style>
