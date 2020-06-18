<template>
  <el-dialog
    :append-to-body="true"
    :title="option"
    width="640px"
    :visible="visible"
    @close="handleClose"
    :close-on-click-modal="false"
  >
    <el-form size="small" ref="form" :model="areaData" label-width="100px">
      <el-form-item label="所属地区" prop="area" :rules="[{ required: true, message: '请完善所属地区',validator: validateArea}]">
        <g-address
          :item-size="'small'"
          :label="'所属地区'"
          :handle-selection-result="handleAreaChange"
          :provinces="provinces"
          :cities="cities"
          :counties="counties"
          :streets="streets"
          :options-data="areaData.area"
          :isShowVillages="false">
        </g-address>
      </el-form-item>
      <el-form-item label="小区名称" prop="village" :rules="[{ required: true, trigger: 'blur', message: '请输入小区名称' }]">
        <el-input :style="{width: '483px'}" placeholder="请输入小区名字" v-model="areaData.village"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose">取 消</el-button>
      <el-button size="small" type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import GAddress from '@/components/GlobalComponents/GAddress'
import addressMixin from '@/views/basicSetting/area/mixins/addressMixin'

export default {
  name: 'UserOperation',
  components: {GAddress},
  mixins: [addressMixin],
  props: {
    row: {
      type: Object,
      default: () => ({
        id: '',
        area: {
          city: "",
          county: "",
          province: "",
          street: "",
        },
        village: "",
      }),
    },
    option: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default() {
        return false
      }
    },
  },
  data() {
    return {

    };
  },
  computed: {
    areaData() {
      return this.row
    }
  },
  mounted() {

  },
  methods: {
    ...mapActions('area', [
      'Create',
      'Update',
    ]),
    validateArea(rule, value, callback) {
      if (this.chargeForm()) {
        callback(new Error('请完善所属地区'))
      } else {
        callback()
      }
    },
    chargeForm() {
      let keys = Object.keys(this.areaData.area);
      let inValid = keys.some(item => {
        return !this.areaData.area[item]
      })
      return inValid
    },
    toggleVisible() {
      this.$nextTick(() => {
        if (this.visible) {
          this.$refs.form.clearValidate();
        }
      });
      this.$emit('close');
    },
    async create() {
      console.log(this.areaData);
      const submitData = this.getSubmitData();
      return await this.Create({ ...submitData });
    },
    async update() {
      console.log(this.areaData);
      const submitData = this.getSubmitData();
      return await this.Update({ ...submitData });
    },
    getSubmitData() {
      return {
        id: this.areaData.id || '',
        city: this.areaData.area.city,
        county: this.areaData.area.county,
        province: this.areaData.area.province,
        street: this.areaData.area.street,
        village: this.areaData.village
      }
    },
    handleClose() {
      this.toggleVisible();
    },
    async handleConfirm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let result;
          if (this.option === '地址添加') {
            result = await this.create();
          }
          if (this.option === '地址编辑') {
            result = await this.update();
          }
          if (result) {
            this.$emit('reloadSearchData');
            this.$message({
              type: 'success',
              message: `${this.option === '地址添加' ? '地址添加成功' : '地址编辑成功'}`,
            });
            this.handleClose();
          }
        } else {
          return false;
        }
      });
    },
    clearOperationArea(type) {
      switch (type) {
        case 'province':
          this.areaData.area.city = '';
          this.areaData.area.county = '';
          this.areaData.area.street = '';
          break;
        case 'city':
          this.areaData.area.county = '';
          this.areaData.area.street = '';
          break;
        case 'county':
          this.areaData.area.street = '';
          break;
        case 'street':
          break;
        case 'village':
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .g-address {
    margin-bottom: 0;
  }
  /deep/.el-input__inner {
    height: 33px;
    border: 1px solid rgba(217, 217, 217, 1);
  }
</style>
