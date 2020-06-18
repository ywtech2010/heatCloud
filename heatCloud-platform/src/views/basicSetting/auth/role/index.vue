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
            namespace="authList"
          />
          <el-divider />
          <div class="header-operation">
            <Operation option="角色添加" @close="close" />
          </div>
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
        :column-operations="true"
        :column-operation-params="columnOpParams"
        :column-operation-slot="columnOpSlotName"
      >
        <template slot="table-status" slot-scope="scope">
          <span v-show="scope.row.status === 0">禁用</span>
          <span v-show="scope.row.status === 1">启用</span>
        </template>
        <template slot-scope="scope" :slot="columnOpSlotName">
          <div class="op-slot-wrap">
            <!-- 权限设置 -->
            <AuthSetting />
            <!-- 编辑 -->
            <Operation option="编辑" :row="scope.row" @close="close" />
            <!-- 删除 -->
            <el-button
              class="err-c"
              @click="handleDeleteConfirm(scope.row.roleId)"
              slot="reference"
              size="small"
              type="text"
            >
              删除
            </el-button>
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
        namespace="authRole"
      />
    </div>
  </g-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

import {
  queryConditions,
  tableColumns,
  columnOpParams,
  columnOpSlotName,
  paginationParams,
} from './vuex/types';

const namespace = 'authRole';

export default {
  name: 'RoleManagement',
  components: {
    GContainer: () => import('@/components/GlobalComponents/GContainer'),
    GSearch: () => import('@/components/GlobalComponents/GSearch'),
    GHeader: () => import('@/components/GlobalComponents/GHeader'),
    GTable: () => import('@/components/GlobalComponents/GTable'),
    GPagination: () => import('@/components/GlobalComponents/GPagination'),
    AuthSetting: () => import('./components/AuthSetting'),
    Operation: () => import('./components/Operation'),
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
      return tableColumns;
    },
    columnOpParams() {
      return columnOpParams;
    },
    columnOpSlotName() {
      return columnOpSlotName;
    },
  },
  created() {
    this.List({ ...this.searchForm });
  },

  methods: {
    ...mapActions(namespace, ['List', 'Del']),
    handleRowClick(row, column, event) {
      console.log('row', row);
      console.log('click', event);
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
      this.List({ ...this.searchForm });
    },
    handleDeleteConfirm(id) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const res = this.Del(id);
          if (res) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.List({ ...this.searchForm });
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/common-content.scss';
</style>
