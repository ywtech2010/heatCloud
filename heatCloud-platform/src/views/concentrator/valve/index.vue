<template>
  <g-container>
    <div slot="content" class="common-content">
      <g-header>
        <template slot="header">
          <g-search
            :search-form="searchForm"
            :query-conditions="queryConditions"
            :handle-search="handleSearchSubmit"
            :formItemInline="true"
            namespace="valve"/>
          <el-divider />
          <div class="header-operation">
            <Operation option="阀门绑定" @close="close" />
            <el-button size="small" type="default">批量解绑</el-button>
          </div>
        </template>
      </g-header>
      <g-table
        :table-data="mockData.list"
        :border="false"
        :loading="loading"
        :table-fit="true"
        :table-width="'100%'"
        :table-columns="tableColumns"
        :row-handle-click="handleRowClick"
        :index="getIndex"
        :columnSequence="'index'"
        :column-align="'center'"
        :column-operations="true"
        :column-operation-params="columnOpParams"
        :column-operation-slot="columnOpSlotName">
        <template slot-scope="scope" :slot="columnOpSlotName">
          <div class="op-slot-wrap">
            <!-- 删除 -->
            <el-popconfirm title="确定解绑吗？">
              <!-- @onConfirm="handleDeleteConfirm(scope.row)" -->
              <el-button slot="reference" size="small" type="text">解绑</el-button>
            </el-popconfirm>
          </div>
        </template>
      </g-table>
      <g-pagination
        :showPageBtnBg="paginationParams.showPageBtnBg"
        :hideOnSinglePage="paginationParams.hideOnSinglePage"
        :pageNo="paginationParams.pageNo"
        :pageSizes="paginationParams.pageSizes"
        :pageSize="paginationParams.pageSize"
        :total="paginationParams.total"
        :pagerCount="paginationParams.pagerCount"
        :handle-current-change="handleCurrentPageChange"
        :handle-size-change="handleSelectPageSize"
        namespace="valve" />
    </div>
  </g-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import Operation from './components/Operation';
import {
  queryConditions,
  tableColumns,
  columnOpParams,
  columnOpSlotName,
  mockData,
  paginationParams
} from './vuex/types';

const namespace = 'valve';

export default {
  name: 'Valve',
  components: {
    GContainer: () => import('@/components/GlobalComponents/GContainer'),
    Operation,
    GSearch: () => import('@/components/GlobalComponents/GSearch'),
    GHeader: () => import('@/components/GlobalComponents/GHeader'),
    GTable: () => import('@/components/GlobalComponents/GTable'),
    GPagination: () => import('@/components/GlobalComponents/GPagination'),
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(namespace, ['loading', 'searchForm', 'resData']),
    paginationParams() {
      return {
        ...paginationParams,
        total: mockData.count
      }
    },
    mockData() {
      return mockData;
    },
    queryConditions() {
      return queryConditions;
    },
    tableColumns() {
      return tableColumns;
    },
    columnOpParams() {
      return columnOpParams;
    },
    columnOpSlotName() {
      return columnOpSlotName;
    },
  },

  methods: {
    handleRowClick(row, column,event) {
      console.log('row',row);
      console.log('click',event)
    },
    handleCurrentPageChange(pageNo) {
      console.log('pageNo', pageNo);
    },
    handleSelectPageSize(pageSize) {
      console.log('pageSize', pageSize);
    },
    handleSearchSubmit(form) {
      console.log('form', form);
    },
    getIndex(index) {
      return index + 1;
    },
    close() {
      // this.List({ ...this.searchForm });
    },
    handleTableSelectionChange(val) {
      console.log(value);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/styles/common-content.scss";
</style>
