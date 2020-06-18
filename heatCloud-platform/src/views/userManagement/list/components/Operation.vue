<template>
  <span>
    <el-button v-if="option === '用户添加'" size="small" type="default" @click.native.prevent="toggleVisible">
      {{ option}}
    </el-button>
    <el-button v-else type="text" size="small" @click.native.prevent="toggleVisible">{{ option }}</el-button>
    <el-dialog
      :append-to-body="true"
      :title="option"
      width="770px"
      :visible="visible"
      @close="visible = false"
      :close-on-click-modal="false"
    >
      <el-form class="user-add" ref="form" :model="form" :inline="true" label-width="100px">
        <el-form-item label="用户名" prop="username" :rules="[{ required: true, message: '请输入用户名' }]">
          <el-input size="small" v-model="form.username" placeholder="请输入" style="width: 238px;"></el-input>
        </el-form-item>

        <el-form-item label="联系方式" prop="phone" :rules="[{ required: true, validator: validateMobile }]">
          <el-input size="small" v-model="form.phone" type="number" placeholder="请输入" style="width: 238px;"></el-input>
        </el-form-item>

        <el-form-item label="用户类型" prop="userTypeId" :rules="[{ required: true, message: '请选择用户类型' }]">
          <el-select size="small" v-model="form.userTypeId" placeholder="请选择" style="width: 238px;">
            <el-option v-for="item in selectData.type" :label="item.label" :value="item.value" :key="item.value"/>
          </el-select>
        </el-form-item>

        <el-form-item label="供暖面积" prop="heatingArea" :rules="[{ required: true, validator: validateHeatingArea }]">
          <el-input size="small" @blur="handleBlurHeatingArea" v-model="form.heatingArea" type="number" placeholder="请输入" style="width: 238px;">
            <span style="padding-right: 5px" slot="suffix">㎡</span>
          </el-input>
        </el-form-item>

        <el-form-item label="阀门类型" prop="controllerTypeId" :rules="[{ required: true, message: '请选择阀门类型' }]">
          <el-select size="small" v-model="form.controllerTypeId" placeholder="请选择" style="width: 238px;">
             <el-option v-for="item in selectData.valve" :label="item.label" :value="item.value" :key="item.value"/>
          </el-select>
        </el-form-item>

        <el-form-item label="阀门序列号">
            <el-input size="small" v-model="form.controllerSerialNo" placeholder="请输入" style="width: 238px;"></el-input>
        </el-form-item>

        <el-form-item label="所在地区" prop="address" :rules="[{ required: true, validator: validateArea}]" style="width: 100%;">
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

        <el-form-item label="详细地址" prop="addressDetail" :rules="[{ required: true, validator: validateAddressDetail}]" style="width: 100%;">
          <span>楼号：</span>
          <input v-model="form.addressDetail.floor" placeholder="请输入" class="input-line" />
          <span>单元：</span>
          <input v-model="form.addressDetail.unit" placeholder="请输入" class="input-line" />
          <span>室号：</span>
          <input v-model="form.addressDetail.roomNumber" placeholder="请输入" class="input-line" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </span>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex';
  import GAddress from '@/components/GlobalComponents/GAddress'
  import addressMixin from '@/views/basicSetting/area/mixins/addressMixin'
  import { userDetail } from '../vuex/api'
  import { letterNumberReg, floatNumber2, mobileReg } from '@/utils';
  import { getSelectData } from '../vuex/types';

  export default {
    name: 'Operation',
    mixins: [addressMixin],
    components: {
      GAddress
    },
    props: {
      row: {
        type: Object,
        default: () => ({
          address: {
            province: '',
            city: '',
            county: '',
            street: '',
            village: '',
          },
          addressDetail: {
            floor: '',
            unit: '',
            roomNumber: ''
          },
          controllerSerialNo: '',
          controllerTypeId: '',
          heatingArea: '',
          phone: '',
          userTypeId: '',
          username: ''
        }),
      },
      option: {
        type: String,
        required: true,
      },
      selectData: {
        type: Object,
        default: () => ({
          type: [],
          valve: []
        })
      }
    },
    data() {
      return {
        visible: false,
        form: {
          address: {
            province: '',
            city: '',
            county: '',
            street: '',
            village: '',
          },
          addressDetail: {
            floor: '',
            unit: '',
            roomNumber: ''
          },
          controllerSerialNo: '',
          controllerTypeId: '',
          heatingArea: '',
          phone: '',
          userTypeId: '',
          username: ''
        },
        areaData: [],
        letterNumberReg: letterNumberReg,
        mobileReg: mobileReg,
        floatNumber2: floatNumber2,
      };
    },
    computed: {
      ...mapGetters('userList', ['']),
    },
    mounted() {

    },
    methods: {
      ...mapActions('userList', ['Create', 'Update']),
      validateArea(rule, value, callback) {
        if (this.chargeForm()) {
          callback(new Error('请完善所在地区'))
        } else {
          callback()
        }
      },
      chargeForm() {
        let keys = Object.keys(this.form.address);
        let inValid = keys.some(item => {
          if (item === 'managerAreaId') {
            return false
          }
          return !this.form.address[item]
        })
        return inValid
      },
      // chargeAddressNull() {
      //   let keys = Object.keys(this.form.addressDetail);
      //   let inValid = keys.some(item => {
      //     return !this.form.addressDetail[item]
      //   })
      //   return inValid
      // },
      chargeDetail(value) {
        return this.letterNumberReg.test(value);
      },
      validateAddressDetail(rule, value, callback) {
        const { floor, roomNumber, unit } = value;
        if (!floor || !roomNumber || !unit) {
          callback(new Error('请输入详细地址'));
        } else if (!this.chargeDetail(floor)) {
          callback(new Error('楼号仅支持数字或者字母'));
        } else if (!this.chargeDetail(unit)) {
          callback(new Error('单元仅支持数字或者字母'));
        } else if (!this.chargeDetail(roomNumber)) {
          callback(new Error('室号仅支持数字或者字母'));
        } else {
          callback();
        }
      },
      validateMobile(rule, value, callback) {
        if (!mobileReg.test(value)) {
          callback(new Error('请输入正确的手机号码'))
        } else {
          callback()
        }
      },
      validateHeatingArea (rule, value, callback) {
        if (!floatNumber2.test(value)) {
          callback(new Error('请输入正确格式的供暖面积'))
        } else {
          callback()
        }
      },
      toggleVisible() {
        this.visible = !this.visible;
        this.form = {
          ...this.row,
          addressDetail: {
            floor: '',
            unit: '',
            roomNumber: ''
          },
          address: {
            province: '',
            city: '',
            county: '',
            street: '',
            village: '',
          }
        };

        this.selectData.type = getSelectData('user_type');
        this.selectData.valve = getSelectData('controller_type');

        if(this.row.userId) {
          userDetail({userId: this.row.userId}).then(async (res) => {
            const origin = Object.assign({}, res);
            origin.heatingArea = Number(origin.heatingArea).toFixed(2);
            this.form = origin;
            this.getHadCities(res.address.province);
            this.getHadCounties(res.address.city);
            await this.getHadStreets(res.address.county);
            this.getHadVillages(res.address.street);
            this.form.userTypeId = parseInt(origin.userTypeId);
            this.form.controllerTypeId = parseInt(origin.controllerTypeId)
          });
        }
        this.$nextTick(() => {
          if (this.visible) {
            this.$refs.form.clearValidate();
          }
        });
      },
      async create() {
        return await this.Create({...this.form});
      },
      async update() {
        return await this.Update({...this.form});
      },
      handleClose() {
        this.toggleVisible();
        this.$emit('close');
      },
      handleBlurHeatingArea(e) {
        let value = Number(e.target.value);
        this.form.heatingArea = value.toFixed(2);
      },
      async handleConfirm() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            let result;
            if (this.option === '用户添加') {
              result = await this.create();
            }
            if (this.option === '用户编辑') {
              result = await this.update();
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
      handleAddressChange(selectResult) {
        this.form.address = {
          ...this.form.address,
          ...selectResult.form
        };
        this.handleAddressData(selectResult)
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
  .user-add {
    .el-form-item {
      width: 48%;
      .input-line {
        width: 100px;
        height: 32px;
        border: none;
        outline: none;
        border-bottom: 1px solid #DCDFE6;
        color: #606266;
      }
      .input-line::-webkit-input-placeholder {
        color: #9999;
      }
    }
  }
</style>
