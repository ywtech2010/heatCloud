<template>
  <span>
    <el-button
      v-if="option === '阀门添加' || option === '远程升级'"
      size="small"
      type="default"
      @click.native.prevent="toggleVisible"
      >{{ option }}</el-button
    >
    <el-button
      v-else
      type="text"
      size="small"
      @click.native.prevent="toggleVisible"
      >{{ option }}</el-button
    >
    <el-dialog
      :append-to-body="true"
      :title="option"
      width="750px"
      :visible="visible"
      @close="visible = false"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="阀门序列号" prop="code">
          <el-input
            size="small"
            v-model="form.code"
            autocomplete="off"
            placeholder="请输入阀门序列号"
            :disabled="option === '编辑' || option === '远程升级'"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="所在地区"
          prop="address"
          required
          style="width: 100%;"
        >
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
        <el-form-item
          label="详细地址"
          required
          prop="addressDetail"
          v-if="form.addressDetail"
        >
          <span style="float: left;">楼号</span>
          <input
            v-model="form.addressDetail.floor"
            placeholder=""
            class="input-line"
          />
          <span style="float: left; margin-left: 10px;">单元</span>
          <input
            v-model="form.addressDetail.unit"
            placeholder=""
            class="input-line"
          />
          <span style="float: left; margin-left: 10px;">室号</span>
          <input
            v-model="form.addressDetail.roomNumber"
            placeholder=""
            class="input-line"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleConfirm"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </span>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { valveAdd, updateValve, valveUpdate } from '../vuex/api';
import GAddress from '@/components/GlobalComponents/GAddress';
import addressMixin from '@/views/basicSetting/area/mixins/addressMixin';
import { letterNumberReg } from '@/utils';

export default {
  name: 'Operation',
  components: { GAddress },
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
          roomNumber: '',
        },
        code: '',
        id: ''
      }),
    },
    option: {
      type: String,
      required: true,
    },
  },
  mixins: [addressMixin],
  data() {
    const validateCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入阀门序列号'));
      } else if (!/^\d{9}$/.test(value)) {
        callback(new Error('请输入9位数字序列号'));
      } else {
        callback();
      }
    };
    const validateAddress = (rule, value, callback) => {
      const { province, city, county, street, village } = value;
      if (province && city && county && street && village) {
        callback();
      } else {
        callback(new Error('请选择地址'));
      }
    };
    const validateAddressDetail = (rule, value, callback) => {
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
    };
    return {
      visible: false,
      letterNumberReg: letterNumberReg,
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
          roomNumber: '',
        },
        code: '',
        id: ''
      },
      areaData: [],
      rules: {
        code: [{ required: true, trigger: 'blur', validator: validateCode }],
        address: [
          { required: true, trigger: 'blur', validator: validateAddress },
        ],
        addressDetail: [
          { required: true, trigger: 'blur', validator: validateAddressDetail },
        ],
      },
    };
  },
  computed: {
    ...mapGetters('authList', ['']),
  },
  methods: {
    ...mapActions('authList', ['Create', 'Update']),
    toggleVisible() {
      this.visible = !this.visible;
      this.form = {
        ...this.row,
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
          roomNumber: '',
        },
        code: '',
        id: ''
      };
      if(this.row.code) {
        valveUpdate(this.row.code).then(async (res) => {
          this.form.id = this.row.id;
          this.getHadCities(res.province);
          this.getHadCounties(res.city);
          await this.getHadStreets(res.county);
          this.getHadVillages(res.street);
          this.form.code = res.code;
          this.form.address = {
            province: res.province,
            city: res.city,
            county: res.county,
            street: res.street,
            village: res.village,
          };
          this.form.addressDetail = {
            floor: res.build,
            roomNumber: res.room,
            unit: res.unit,
          }
        });
      }
      this.$nextTick(() => {
        if (this.visible) {
          this.$refs.form.clearValidate();
        }
      });
    },
    chargeDetail(value) {
      return this.letterNumberReg.test(value);
    },
    async create() {
      return await this.Create({ ...this.form });
    },

    async update() {
      return await this.Update({ ...this.form });
    },
    handleClose() {
      this.toggleVisible();
      this.$emit('close');
    },
    async handleConfirm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.option === '阀门添加') {
            this.addValve();
          }
          if (this.option === '编辑') {
            this.updateValve();
          }
        } else {
          return false;
        }
      });
    },

    /*addValve*/
    addValve() {
      valveAdd(this.form)
        .then((res) => {
          this.handleClose();
          this.$message.success('操作成功');
        })
        .catch(() => {});
    },
    /*编辑*/
    updateValve() {
      updateValve(this.form)
        .then((res) => {
          this.handleClose();
          this.$message.success('操作成功');
        })
        .catch(() => {});
    },
    handleAddressChange(selectResult) {
      this.form.address = {
        ...this.form.address,
        ...selectResult.form,
      };
      this.handleAddressData(selectResult);
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
.input-line {
  width: 100px;
  height: 32px;
  border: none;
  outline: none;
  border-bottom: 1px solid #dcdfe6;
  color: #606266;
  float: left;
  margin-left: 10px;
  margin-top: 4px;
}
.input-line::-webkit-input-placeholder {
  color: #9999;
}
</style>
