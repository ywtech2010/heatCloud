<template>
  <span class="g-address">
    <el-form-item :size="itemSize">
      <el-select
        v-model="optionsData.province"
        @change="handleSelectionResult({form: optionsData,value:optionsData.province, type:'province'})"
        clearable
        @clear="clearOptions('province')"
        placeholder="省份/地区">
        <el-option
          v-for="item in provinces"
          :key="item.code"
          :label="item.province || item.name"
          :value="item.longcode">
        </el-option>
      </el-select>
      <el-select
        v-model="optionsData.city"
        @change="handleSelectionResult({form: optionsData, value:optionsData.city, type:'city'})"
        clearable
        @clear="clearOptions('city')"
        placeholder="城市"
        class="g-address-divide">
        <el-option
          v-for="item in cities"
          :key="item.code"
          :label="item.city || item.name"
          :value="item.longcode">
        </el-option>
      </el-select>
      <el-select
        v-model="optionsData.county"
        @change="handleSelectionResult({form: optionsData, value:optionsData.county, type:'county'})"
        clearable
        @clear="clearOptions('county')"
        placeholder="区/县"
        class="g-address-divide">
        <el-option
          v-for="item in counties"
          :key="item.code"
          :label="item.county || item.name"
          :value="item.longcode">
        </el-option>
      </el-select>
      <el-select
        v-model="optionsData.street"
        @change="handleSelectionResult({form: optionsData, value:optionsData.street, type:'street'})"
        clearable
        @clear="clearOptions('street')"
        placeholder="街道"
        class="g-address-divide">
        <el-option
          v-for="item in streets"
          :key="item.code"
          :label="item.street || item.name"
          :value="item.longcode">
        </el-option>
      </el-select>
      <el-select
        v-if="isShowVillages"
        v-model="optionsData.village"
        @change="handleSelectionResult({form: optionsData, value:optionsData.village, type:'village'})"
        clearable
        @clear="clearOptions('village')"
        placeholder="小区"
        class="g-address-divide">
        <el-option
          v-for="(item, index) in villages"
          :key="index"
          :label="item.village"
          :value="item.longcode">
        </el-option>
      </el-select>
    </el-form-item>
  </span>
</template>

<script>
  /**
   * @params 参数说明
   * itemSize 下拉组件大小 large、medium、small 默认medium
   * optionsData 所需数据模型
   * provinces 省份下拉数据
   * cities 城市下拉数据
   * counties 区下拉数据
   * streets 街道下拉数据
   * villages 小区下拉数据
   * handleSelectionResult  将选择数据回传至引用父组件 类型Function eg. {form: optionsData,value:optionsData.province, type:'province'}
   * isShowVillages  是否显示小区选择 后期可以自定义其他级数的显示隐藏
   * clearOptions  清空对应选择数据后的处理，当前返回所清空的级别 eg. clearOptions('province') 清空省份数据时回传province参数加以区别
   */
  export default {
    props: {
      itemSize: {
        type: String,
        default() {
          return 'medium'
        }
      },
      optionsData: {
        type: Object,
        default() {
          return {}
        }
      },
      provinces: {
        type: Array,
        default() {
          return []
        }
      },
      cities: {
        type: Array,
        default() {
          return []
        }
      },
      counties: {
        type: Array,
        default() {
          return []
        }
      },
      streets: {
        type: Array,
        default() {
          return []
        }
      },
      villages: {
        type: Array,
        default() {
          return []
        }
      },
      handleSelectionResult: {
        type: Function,
        default: () => {

        }
      },
      isShowVillages: {
        type: Boolean,
        default() {
          return true
        }
      },
      clearOptions: {
        type: Function,
        default: () => {

        }
      }
    },
    data() {
      return {
      }
    },
  }
</script>

<style lang="scss" scoped>
  .g-address {
    border: 1px solid rgba(217, 217, 217, 1);
    border-radius: 4px;
    display: inline-block;
    /*height: 33px;*/
    margin-right: 16px;
    margin-bottom: 18px;
    /deep/ .el-form-item {
      margin-bottom: 0 !important;
      margin-right: 0 !important;
    }

    /deep/ .el-input {
      width: 117px;

      input {
        background: transparent;
        border: none;
        -webkit-appearance: none;
        border-radius: 0;
      }
    }

    .g-address-divide:after {
      content: "";
      width: 1px;
      height: 22px;
      background-color: rgba(211, 211, 211, 1);
      position: absolute;
      bottom: 5px;
      top: 5px;
      z-index: 1;
      left: 0;
      right: 0;
    }
  }

</style>
