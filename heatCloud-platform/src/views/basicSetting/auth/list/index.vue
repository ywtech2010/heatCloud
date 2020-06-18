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
            <el-button size="small" type="default" @click="handleRoleClick"
              >角色管理</el-button
            >
            <Operation option="管理员添加" @close="close" />
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
        <template slot-scope="scope" :slot="columnOpSlotName">
          <div class="op-slot-wrap">
            <!-- 密码初始化 -->
            <el-button
              slot="reference"
              size="small"
              type="text"
              @click="handleResetConfirm(scope.row.managerId)"
              >密码初始化</el-button
            >
            <!-- 分配角色 -->
            <DistributeRole />
            <!-- 编辑 -->
            <Operation option="编辑" :row="scope.row" @close="close" />
            <!-- 删除 -->
            <el-button
              class="err-c"
              slot="reference"
              @click="handleDeleteConfirm(scope.row.managerId)"
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
        namespace="authList"
      />
    </div>
  </g-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

import DistributeRole from './components/DistributeRole';
import Operation from './components/Operation';
import {
  queryConditions,
  tableColumns,
  columnOpParams,
  columnOpSlotName,
  mockData,
  paginationParams,
} from './vuex/types';

const namespace = 'authList';

export default {
  name: 'Auth',
  components: {
    GContainer: () => import('@/components/GlobalComponents/GContainer'),
    DistributeRole,
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
        total: mockData.count,
      };
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
  created() {
    this.List({ ...this.searchForm });
  },

  methods: {
    ...mapActions(namespace, ['List', 'PwdReset', 'Del']),
    handleRoleClick() {
      this.$store.dispatch(
        'app/changeCurrentActivePath',
        '/basicSetting/auth/list',
      );
      this.$router.push({
        path: '/basicSetting/auth/role',
      });
    },
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
    handleResetConfirm(id) {
      this.$confirm('此操作将初始化密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const res = this.PwdReset({ userId: id });
          if (res) {
            this.$message({
              type: 'success',
              message: '重置成功!',
            });
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          });
        });
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
