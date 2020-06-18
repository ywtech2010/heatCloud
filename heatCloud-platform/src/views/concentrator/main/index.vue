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
            namespace="concentrator"/>
          <el-divider />
          <div class="header-operation">
            <Operation option="集中器添加" @close="close" />
            <el-button size="small" type="default">Excel导入</el-button>
            <el-button size="small" type="default">Excel导出</el-button>
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
            <el-button
              @click.native.prevent="handleWatchValve"
              type="text"
              size="small">查看阀门</el-button>
            <!-- 编辑 -->
            <Operation option="编辑" :row="scope.row" @close="close" />
            <!-- 删除 -->
            <el-popconfirm title="确定删除吗？">
              <!-- @onConfirm="handleDeleteConfirm(scope.row)" -->
              <el-button class="err-c" slot="reference" size="small" type="text">删除</el-button >
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
        namespace="concentrator" />
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

  const namespace = 'concentrator';

  export default {
    name: 'Concentrator',
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
      handleWatchValve: function () {
        this.$store.dispatch('app/changeCurrentActivePath', '/concentrator/index');
        this.$router.push({
          path: '/concentrator/valve'
        })
      },
      close() {
        // this.List({ ...this.searchForm });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/common-content.scss";
</style>
