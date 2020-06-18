<template>
  <span>
    <el-button v-if="option === '查看对象'" type="primary" size="small" @click.native.prevent="toggleVisible">{{option}}</el-button>
    <el-button v-else size="small" class="choose-button" @click.native.prevent="toggleVisible">
      <i class="el-icon-plus"></i>
    </el-button>

    <el-dialog
      :append-to-body="true"
      :title="option"
      width="725px"
      ref="form"
      :visible="visible"
      @close="visible = false"
      :close-on-click-modal="false">
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

      <el-button class="add-button" style="margin-left:20px" type="primary" plain @click="chooseAdd">添加</el-button>

      <div class="choose-target">
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

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleConfirm">保存</el-button>
      </div>
    </el-dialog>
  </span>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex';
  import GAddress from '@/components/GlobalComponents/GAddress'
  import addressMixin from '@/views/basicSetting/area/mixins/addressMixin'

  export default {
    name: 'ObjectChoose',
    mixins: [addressMixin],
    components: {GAddress},
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
        }),
      },
      option: {
        type: String,
        required: true,
      },
      targetList: {
        type: Array,
        default() {
          return []
        }
      },
      targetArr: {
        type: Array,
        default() {
          return []
        }
      },
      targetStrArr: {
        type: Array,
        default() {
          return []
        }
      },
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
        },
        chooseData: undefined,
        chooseArr: [],
        chooseStrArr: [],
      };
    },
    computed: {
      ...mapGetters(['userInfo']),
    },


    methods: {
      ...mapActions('payment', ['Create', 'Update']),

      toggleVisible() {
        this.initQueryConditions();

        this.visible = !this.visible;

        this.resetChooseData();

        if (this.option !== '查看对象' || !this.visible) {
          this.chooseArr = [].concat([]);
          this.chooseStrArr = [].concat([]);
        } else {
          if (this.targetArr && this.targetArr.length) {
            this.chooseArr = [].concat(this.targetArr);
            this.chooseStrArr = [].concat(this.targetStrArr);
          }
        }
      },

      handleClose() {
        this.toggleVisible();
        this.$emit('close');
      },

      async handleConfirm() {
        if (this.chooseArr.length > 0) {
          this.$emit('backChooseObject', {chooseArr: this.chooseArr, chooseStrArr: this.chooseStrArr});
          this.visible = false;
        } else {
          this.$message.warning('您未添加缴费对象');
        }
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

      handleAddressChange(selectResult) {
        this.form.address = {
          ...this.form.address,
          ...selectResult.form
        };
        this.handleAddressData(selectResult);
        this.chooseData = this.form.address;
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
            // this.chooseData['level'] = 1;
          }
          if (this.chooseData.city) {
            str = str + this.getAreaName(this.areaPartOne['listCity'], this.chooseData.city, 'city');
            // this.chooseData['level'] = 2;
          }
          if (this.chooseData.county) {
            str = str + this.getAreaName(this.areaPartOne['listCounty'], this.chooseData.county, 'county');
            // this.chooseData['level'] = 3;
          }
          if (this.chooseData.street) {
            str = str + this.getAreaName(this.areaPartTwo['listStreet'], this.chooseData.street, 'street');
            // this.chooseData['level'] = 4;
          }
          if (this.chooseData.village) {
            str = str + this.getAreaName(this.areaPartTwo['listVillage'], this.chooseData.village, 'village');
            // this.chooseData['level'] = 5;
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
    },
  };
</script>
<style lang="scss" scoped>
  .form-item {
    width: 50%;
    float: left;
  }

  .choose-button {
    width: 32px;
    height: 32px;
    border: 1px solid #409EFF;
    text-align: center;
    border-radius: 4px;
    padding: 0;
    .el-icon-plus {
      color: #409EFF;
    }
  }

  /deep/ .el-badge__content {
    width: 14px;
    height: 14px;
    line-height: 14px;
    border-radius: 50%;
    text-align: center;
    padding: 0;

  }

  /deep/ .el-dialog__body {
    height: auto;
    display: inline-block;
  }

  .choose-target {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-top: 20px;
    min-height: 40px;
    height: auto;
    .target-title {
      height: 30px;
      line-height: 30px;
      color: #606266
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
