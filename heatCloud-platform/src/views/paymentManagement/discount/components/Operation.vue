<template>
  <span>
    <el-button v-if="option === '优惠添加'" size="small" type="default"
               @click.native.prevent="toggleVisible">{{ option }}</el-button>
    <el-button v-else type="text" size="small" @click.native.prevent="toggleVisible">{{ option }}</el-button>
    <el-dialog
      :append-to-body="true"
      :title="option"
      width="900px"
      :visible="visible"
      @close="visible = false"
      :close-on-click-modal="false">
      <el-form size="small" ref="form" :model="form" label-width="110px" :rules="rules" style="height: 240px;display: block">
        <el-form-item label="优惠活动名称" prop="name" class="form-item">
          <el-input style="width: 225px" v-model="form.name" clearable/>
        </el-form-item>

        <el-form-item :class="['discount-type']" label="优惠方式" prop="type" class="form1-item">
           <el-select  :style="{display: 'inline-block'}" v-model="form.type" placeholder="请选择">
             <el-option :key="'1'" :label="'减免'" :value="'1'"></el-option>
             <el-option :key="'2'" :label="'折扣'" :value="'2'"></el-option>
          </el-select>
          <el-input :style="{display: 'inline-block', width: '60px'}" type="number" v-model="form.worth"/>
          <el-popover
            placement="bottom"
            title="优惠方式说明"
            width="300"
            trigger="click"
            content="当选择赠送年限时，右侧填写1，即赠送1年； 当选择金额减免时，输入300，即减免300元；当选择金额折扣时，输入90，即打9折。">
          <el-button slot="reference" class="question-img"></el-button>
        </el-popover>
        </el-form-item>

        <el-form-item label="开始时间" prop="startDate" class="form-item">
          <el-date-picker style="width: 225px" v-model="form.startDate" type="date"/>
        </el-form-item>

        <el-form-item label="结束时间" prop="endDate" class="form1-item">
          <el-date-picker style="width: 225px" v-model="form.endDate" type="date"/>
        </el-form-item>

        <el-form-item label="上限金额" prop="upLimitMoney" class="form-item">
          <el-input type="number" style="width: 225px" v-model="form.upLimitMoney" clearable/>
        </el-form-item>

        <el-form-item label="下限金额" prop="downLimitMoney" class="form1-item">
          <el-input type="number" style="width: 225px" v-model="form.downLimitMoney" clearable/>
          <el-popover
            placement="bottom"
            title="下限金额说明"
            width="300"
            trigger="click"
            content="当上限金额填写1000.00，下限填写100.00时，即金额充值在100-1000内才能参与优惠活动。">
            <el-button slot="reference" class="question-img"></el-button>
         </el-popover>
        </el-form-item>

        <el-form-item label="仅限老用户" prop="year" class="form-item">
          <el-input type="number" style="width: 225px" v-model="form.year" clearable/>
          <el-popover
            placement="bottom"
            title="仅限老用户说明"
            width="300"
            trigger="click"
            content="仅支持整数年份，填写1，代表仅1年及以上老用户参与优惠活动。">
          <el-button slot="reference" class="question-img"></el-button>
         </el-popover>
        </el-form-item>

        <el-form-item class="form1-item">

        </el-form-item>

        <el-form-item label="选择小区" required style="width: 100%;float: left">
          <g-address
            style="display: inline-block;height: 34px;margin: 0;float: left"
            :item-size="'small'"
            :options-data="form.address"
            :handle-selection-result="handleAddressChange"
            :provinces="provinces"
            :cities="cities"
            :counties="counties"
            :streets="streets"
            :villages="villages">
        </g-address>
         <el-button class="add-button" style="margin-left:20px;float: left" type="primary" plain @click="chooseAdd">添加</el-button>
        </el-form-item>
      </el-form>

      <div class="choose-target" style="margin-left: 30px">
        <span class="target-title">所选对象：</span>
        <div class="target-item">
          <div class="item" v-for="(item,index) of chooseStrArr">
            <span class="item-span">
              {{item}}
            </span>
            <span class="delete-span" @click="deleteChoose(index)">
              <i class="icon-font icon-close"></i>
            </span>
          </div>
        </div>
      </div>


      <div slot="footer" class="dialog-footer" style="text-align: right;display: inline-block;margin-bottom: 10px;">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </span>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import { preferentialAdd, updatePreferential } from '../vuex/api'
  import GAddress from '@/components/GlobalComponents/GAddress'
  import addressMixin from '@/views/paymentManagement/discount/mixins/addressMixin'

  export default {
    name: 'Operation',
    mixins: [addressMixin],
    components: { GAddress },
    props: {
      row: {
        type: Object,
        default: () => ({
          name: '',
          downLimitMoney: '',
          endDate: '',
          startDate: '',
          type: '',//优惠方式1减免2折扣
          upLimitMoney: '',
          worth: '',
          year: '',
          address: {},
          preferentialDetailList: [
            {
              city: '',
              country: '',
              id: null,
              level: '1',
              province: '',
              street: '',
              village: ''
            }
          ]
        })
      },
      option: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        areaData: [],
        visible: false,
        form: { ...this.row },
        rules: {
          name: [
            {
              required: true,
              message: '优惠活动名称不能为空',
              trigger: 'blur'
            }
          ],
          type: [
            {
              required: true,
              message: '请选择优惠方式',
              trigger: 'blur'
            }
          ],
          startDate: [
            {
              required: true,
              message: '开始时间不能为空',
              trigger: 'blur'
            }
          ],
          endDate: [
            {
              required: true,
              message: '结束时间不能为空',
              trigger: 'blur'
            }
          ]
        },
        isShow: false,
        isShow1: false,
        isShow2: false,
        chooseData: undefined,
        chooseArr: [],
        chooseStrArr: [],
      }
    },
    computed: {
      ...mapGetters('authList', [''])
    },
    methods: {
      ...mapActions('authList', ['Create', 'Update']),
      toggleVisible() {

        this.initQueryConditions()

        this.visible = !this.visible
        this.form = {...this.row}
        this.$nextTick(() => {
          if (this.visible) {
            this.$refs.form.clearValidate()
          }
        })
      },
      handleAddressChange(selectResult) {
        this.form.address = {
          ...this.form.address,
          ...selectResult.form
        }
        this.handleAddressData(selectResult);
        this.chooseData = this.form.address;

      },
      handleClose() {
        this.toggleVisible()
        this.$emit('close')
      },
      async handleConfirm() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            if (this.option === '优惠添加') {
              this.addPrefer()

            }
            if (this.option === '编辑') {
              this.editPrefer()
            }
          } else {
            return false
          }
        })
      },

      addPrefer() {
        if(this.chooseArr.length==0){
          this.$message.warning('请选择缴费对象');
          return;
        }

        this.form.preferentialDetailList=this.chooseArr;
        console.log(this.form.preferentialDetailList);
        console.log(this.chooseArr);

        preferentialAdd(this.form).then(res => {
          this.handleClose()
          this.$message.success('操作成功')
        }).finally(() => {

        }).catch(() => {

        })
      },

      editPrefer() {
        updatePreferential(this.form).then(res => {
          this.handleClose()
          this.$message.success('操作成功')
        }).catch(() => {

        })
      },

      isExit(a, b) {
        //获取a和b的属性长度
        let propsA = Object.getOwnPropertyNames(a),
          propsB = Object.getOwnPropertyNames(b);

        if(propsA.length != propsB.length){
          return false;
        }
        for(let i=0;i<propsA.length;i++){
          let propName=propsA[i];
          if (propName !== '__ob__') {
            //如果对应属性对应值不相等，则返回false
            if(a[propName] !== b[propName]){
              return false;
            }
          }
        }
        return true;
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

      chargeForm(data) {
        if (!data) {
          return false;
        }
        let keys = Object.keys(data);
        return keys.some(item => {
          return data[item]
        })
      },

      chooseAdd() {
        if (!this.chargeForm(this.chooseData)) {
          this.$message.warning('请选择要添加的地区');
        } else {
          const isExit = this.chooseArr.some(item => {
            return this.isExit(item, this.chooseData)
          });
          if (isExit) {
            this.$message.warning('所选对象区域已存在，请重新选择');
            return;
          }
          let str = '';
          if (this.chooseData.province) {
            str = this.getAreaName(this.areaPartOne['listProvince'], this.chooseData.province, 'province');
            this.chooseData['level'] = 1;
          }
          if (this.chooseData.city) {
            str = str + this.getAreaName(this.areaPartOne['listCity'], this.chooseData.city, 'city');
            this.chooseData['level'] = 2;
          }
          if (this.chooseData.county) {
            str = str + this.getAreaName(this.areaPartOne['listCounty'], this.chooseData.county, 'county');
            this.chooseData['level'] = 3;
          }
          if (this.chooseData.street) {
            str = str + this.getAreaName(this.areaPartTwo['listStreet'], this.chooseData.street, 'street');
            this.chooseData['level'] = 4;
          }
          if (this.chooseData.village) {
            str = str + this.getAreaName(this.areaPartTwo['listVillage'], this.chooseData.village, 'village');
            this.chooseData['level'] = 5;
          }

          this.chooseStrArr.push(str);

          this.chooseArr.push(this.chooseData);

          this.resetChooseData();
        }
      },

      resetChooseData() {
        this.chooseData = undefined;

        this.form.address = {
          province: '',
          city: '',
          county: '',
          street: '',
          village: '',
        };
        this.clearCities();
        this.clearCounties();
        this.clearStreets();
        this.clearVillages();
      },

      deleteChoose(index) {
        this.chooseStrArr.splice(index, 1);
        this.chooseArr.splice(index, 1);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .form-item {
    width: 50%;
    float: left;
  }

  .form1-item {
    width: 50%;
    float: left;
  }

  /deep/ .el-input {
    width: 160px;
  }

  .count-div {
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    height: 40px;
    width: 50px;
    float: left;
    padding-left: 5px;

  }

  .question-img {
    height: 20px !important;
    width: 20px !important;
    margin-left: 5px;
    background: url("../../../../assets/images/question.png") no-repeat;
    background-size: 100% 100%;
    padding: 0 !important;
    border: none !important;
    vertical-align: text-bottom;
  }

  /deep/ .el-popover {
    margin-left: -100px;
  }

  /deep/ .el-dialog__body {
    height: auto;
    min-height: 260px !important;
  }

  .discount-type {
    /deep/.el-input__inner {
      padding-left: 10px;
      padding-right: 5px;
    }
  }
  .choose-target {
    flex-direction: row;
    align-items: flex-start;
    margin-top: 20px;
    min-height: 40px;
    height: auto;
    .target-title {
      height: 30px;
      line-height: 30px;
      color: #606266;
      font-weight: 700;
      float: left;
    }
    .target-item {
      flex: 1;
      .item {
        position: relative;
        height: 40px;
        float: left;
        display: inline-block;
        margin-right: 20px;
        .item-span {
          display: inline-block;
          padding: 5px 10px;
          border: 1px solid rgba(238, 238, 238, 1);
          border-radius: 2px;
        }
        .delete-span {
          cursor: pointer;
          position: absolute;
          right: -7px;
          top: -7px;
          color: #666;
          .icon-close {
            font-size: 14px;
          }
          &:hover {
            color: rgb(252, 72, 80);
          }
        }
      }
    }
  }

</style>
