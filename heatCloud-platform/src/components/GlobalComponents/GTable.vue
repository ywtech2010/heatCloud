<template lang="html">
  <div class="g-table">
    <el-table
      :data="tableData"
      :max-height="tableMaxHeight"
      :ref="tableRef"
      :size="tableSize"
      :class="[tableClassName]"
      :border="tableBorder"
      :stripe="true"
      :fit="tableFit"
      :width="tableWidth"
      :height="'100%'"
      v-loading="loading"
      @cell-click="cellHandleClick"
      @cell-dbclick="cellHandleDbClick"
      @row-click="rowHandleClick"
      @row-dbclick="rowHandleDbClick"
      @select-all="rowSelectAllChange"
      @selection-change="rowSelectionChange"
      @expand-change="rowExpandChange">

      <!---------------------查询结果列表--------------------->

      <!--是否为多选列表-->
      <el-table-column
        v-if="tableRef === 'multipleTable'"
        type="selection"
        :align="columnAlign"
        :selectable="columnSelectable"
        width="55">
      </el-table-column>

      <!-- 可展开行列表 -->
      <el-table-column v-if="rowExpandSlot" type="expand">
        <template slot-scope="{ row }">
          <slot :name="rowExpandSlot" :row="row"/>
        </template>
      </el-table-column>

      <!--是否显示序号列-->
      <el-table-column
        v-if="columnSequence === 'index'"
        label="序号"
        :align="columnAlign"
        :fixed="tableColumns[0].columnFixed"
        type="index"
        width="55">
      </el-table-column>

      <!--主要数据列-->
      <el-table-column
        v-for="({
          columnName,
          columnFixed,
          columnLabel,
          columnWidth = 0,
          showOverflowTooltip = false,
          formatter,
          pattern,
          slotName}, index) in tableColumns"
        :key="index"
        :label="columnLabel"
        :align="columnAlign"
        :fixed="columnFixed"
        :prop="columnName"
        :min-width="columnWidth"
        :show-overflow-tooltip="showOverflowTooltip">
        <!-- 自定义列 -->
        <template slot-scope="{ row }">
          <!-- 使用formatter格式化方法 -->
          <span v-if="formatter">{{ formatter(row[columnName], pattern) }}</span>
          <!-- 使用插槽 -->
          <slot v-else-if="slotName" :name="slotName" :row="row"/>
          <!-- 仅渲染值 -->
          <span v-else>{{ row[columnName] }}</span>
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column
        v-if="columnOperations"
        :align="columnAlign"
        :label="columnOperationParams.columnLabel || '操作'"
        :width="columnOperationParams.columnWidth || '150px'"
        :fixed="columnOperationParams.columnFixed || 'right'">
        <template slot-scope="scope">
          <slot :name="columnOperationSlot" :row="scope.row" :index="scope.$index"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    props: {
      tableRef: {
        types: String,
      },
      // 表格border显示与隐藏
      tableBorder: {
        type: Boolean,
        default() {
          return false
        }
      },
      // 序列号
      columnSequence: {
        type: String
      },
      // 按自定义规则生成序列号
      generateIndex: {
        type: Function,
        default: () => {}
      },
      // 表格数据源
      tableData: {
        type: Array,
        required: true,
      },
      // 表格参数
      tableColumns: {
        type: Array,
        required: true,
      },
      // 文字对齐方式
      columnAlign: {
        type: String,
        default(){
          return 'left'
        }
      },
      // 表格最大高度
      tableMaxHeight: {
        type: String,
      },
      // 表格宽度
      tableWidth: {
        type: String,
        default() {
          return '100%'
        }
      },
      // 列的宽度是否自撑开
      tableFit: {
        type: Boolean,
        default() {
          return false
        }
      },
      // 表格尺寸
      tableSize: {
        type: String,
        default: 'medium',
      },
      // loading
      loading: {
        type: Boolean,
      },
      // 自定义表格类名
      tableClassName: {
        type: String,
      },
      // 表格展开函数
      rowExpandChange: {
        type: Function,
        default: () => {
        },
      },
      // 展开行插槽名称
      rowExpandSlot: {
        type: String,
      },
      // 表格多选
      rowSelectionChange: {
        type: Function,
        default: () => {
        },
      },
      // 表格全选
      rowSelectAllChange: {
        type: Function,
        default: () => {
        },
      },
      // 表格行单击事件
      rowHandleClick: {
        type: Function,
        default: () => {
        },
      },
      // 表格行双击事件
      rowHandleDbClick: {
        type: Function,
        default: () => {
        },
      },
      // 表格单元格单击事件
      cellHandleClick: {
        type: Function,
        default: () => {
        },
      },
      // 表格单元格双击事件
      cellHandleDbClick: {
        type: Function,
        default: () => {
        },
      },
      // 当前行是否可以勾选
      columnSelectable: {
        type: Function,
        default: () => {
          return 1;
        },
      },
      // 是否有操作列
      columnOperations: {
        type: Boolean,
        default: false,
      },
      // 操作列参数
      columnOperationParams: {
        type: Object,
        default() {
          return {}
        }
      },
      // 操作列插槽名称
      columnOperationSlot: {
        type: String,
      },
    },
    components: {},
    computed: {},
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  .g-table {
    flex: 1;
    overflow: auto;
  }
</style>
