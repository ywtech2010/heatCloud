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
            namespace="log"
          />
          <el-divider />
          <!-- <div class="header-operation">
            <el-button size="small" type="default">Excel导出</el-button>
          </div> -->
        </template>
      </g-header>
      <g-table
        :table-data="resData.list"
        :border="false"
        :loading="loading"
        :table-fit="true"
        :table-width="'100%'"
        :table-columns="tableColumns"
        :row-handle-click="handleRowClick"
        :index="getIndex"
        :columnSequence="'index'"
        :column-align="'center'"
      >
        <template slot-scope="scope" slot="table-status">
          <div class="op-slot-wrap">
            <span v-show="scope.row.status === 0">禁用</span>
            <span v-show="scope.row.status === 1">启用</span>
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
        namespace="log"
      />
    </div>
  </g-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { queryConditions, tableColumns, paginationParams } from './vuex/types';

const namespace = 'log';

export default {
  name: 'Log',
  components: {
    GContainer: () => import('@/components/GlobalComponents/GContainer'),
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
        total: this.resData.total,
      };
    },
    queryConditions() {
      return queryConditions;
    },
    tableColumns() {
      console.log(tableColumns);
      return tableColumns;
    },
  },
  created() {
    this.List({ ...this.searchForm });
  },
  methods: {
    ...mapActions(namespace, ['List']),
    handleRowClick(row, column, event) {
      console.log('row', row);
      console.log('click', event);
    },
    handleCurrentPageChange(pageNo) {
      this.searchForm.pageNo = pageNo;
      this.List(this.searchForm);
    },
    handleSelectPageSize(pageSize) {
      this.searchForm.pageSize = pageSize;
      this.List(this.searchForm);
    },
    handleSearchSubmit(form) {
      this.List({ ...this.searchForm });
    },
    getIndex(index) {
      return index + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/common-content.scss';
</style>
