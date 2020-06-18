<template lang="html">
  <div class="g-search">
    <el-form
      :model="searchForm"
      :label-width="formLabelWidth"
      :label-position="formLabelPosition"
      :inline="formItemInline"
      :label-suffix="formItemLabelSuffix"
      :size="formItemSize">
      <g-address
        :item-size="formItemSize"
        :options-data="searchForm.areaForm"
        :handle-selection-result="handleAddressChange"
        :provinces="provinces"
        :cities="cities"
        :clear-options="clearOptions"
        :counties="counties"
        :streets="streets"
        :villages="villages"
        v-if="isIncludeAreaCondition">
      </g-address>

      <template v-for="(item, index) in queryConditions">
        <el-form-item v-if="item.formItemType !== 'AREA'"
                      :key="index"
                      :prop="item.formItemName"
                      :label="item.formItemLabel">
          <!--输入框-->
          <el-input
            v-if="item.formItemType === 'INPUT'"
            :style="{...item.formItemStyle}"
            v-model="searchForm[item.formItemName]"
            :placeholder="item.formItemPlaceholder || item.formItemLabel"></el-input>

          <!-- 下拉选择 -->
          <el-select
            v-if="item.formItemType === 'SELECT'"
            :style="{...item.formItemStyle}"
            v-model="searchForm[item.formItemName]"
            clearable
            :placeholder="item.formItemPlaceholder || item.formItemLabel">
            <el-option
              v-for="option in item.formItemOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"></el-option>
          </el-select>

          <!-- 日期 -->
          <el-date-picker
            v-if="item.formItemType === 'DATE_PICKER'"
            :style="{...item.formItemStyle}"
            v-model="searchForm[item.formItemName]"
            type="date"
            :placeholder="item.formItemPlaceholder || item.formItemLabel"></el-date-picker>

          <!--单时间-->
          <el-date-picker
            v-if="item.formItemType === 'DATE_TIME_PICKER'"
            :style="{...item.formItemStyle}"
            v-model="searchForm[item.formItemName]"
            type="datetime"
            :placeholder="item.formItemPlaceholder || item.formItemLabel"
            value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>

          <!-- 联结时间 -->
          <el-date-picker
            v-if="item.formItemType === 'DATE_TIME_RANGE_PICKER'"
            :style="{...item.formItemStyle}"
            v-model="searchForm[item.formItemName]"
            type="datetimerange"
            :range-separator="item.formItemRangeSeparator"
            :start-placeholder="item.formItemStartPlaceholder || item.formItemLabel"
            :end-placeholder="item.formItemEndPlaceholder || item.formItemLabel"
            value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          <!-- 后期拓展：1、筛选条件过多，筛选表单可折叠；2、其他表单组件 -->
        </el-form-item>
      </template>
      <el-form-item>
        <el-button
          native-type="submit"
          type="primary"
          class="g-search-btn"
          @click.native.prevent="handleSearch(searchForm)">
          查询
        </el-button>
        <slot class="operation" name="operation"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import GAddress from '@/components/GlobalComponents/GAddress'

  export default {
    components: {
      GAddress
    },
    props: {
      // 命名空间
      namespace: {
        type: String,
        required: true,
      },
      // 表单元素标签宽度
      formLabelWidth: {
        type: String,
        default: '',
      },
      // 表单元素标签对齐方式
      formLabelPosition: {
        type: String,
        default: 'right',
      },
      // 表单元素后缀显示 默认空，可以按需传入 例："阀门地址"  或者  "阀门地址："
      formItemLabelSuffix: {
        type: String,
        default: '',
      },
      // 表单元素大小 large、medium、small small
      formItemSize: {
        type: String,
        default: 'small',
      },
      // 搜索条件，通过各引用组件中 vuex目录下 type.js 设置当前查询条件所需显示的表单元素
      queryConditions: {
        type: Array,
        required: true,
      },
      // 对应引用组件查询条件的form表单数据
      searchForm: {
        type: Object,
        required: true
      },
      // 是否将表单元素inline显示
      formItemInline: {
        type: Boolean,
        default() {
          return false
        }
      },
      // 触发查询操作后回传数据
      handleSearch: {
        type: Function,
        default: () => {

        }
      },
      // 操作
      operations: {},
      // 以下参数说明查看GAddress组件中说明
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
      handleAddressChange: {
        type: Function,
        default: () => {}
      },
      clearOptions: {
        type: Function,
        default: () => {}
      }
    },
    data() {
      return {};
    },
    computed: {
      isIncludeAreaCondition() {
        return this.queryConditions.some(item => item.formItemType === 'AREA')
      }
    },
  };
</script>

<style lang="scss" scoped>

</style>
