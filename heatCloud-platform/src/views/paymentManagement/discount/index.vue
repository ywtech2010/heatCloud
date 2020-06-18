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
            namespace="discount"/>
          <el-divider />
          <div class="header-operation">
            <Operation option="优惠添加" @close="close" />
          </div>
        </template>
      </g-header>
      <g-table
        :table-data="resData.list || []"
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
            <!-- 编辑 -->
            <Operation option="编辑" :row="scope.row" @close="close" />
            <!-- 删除 -->
            <el-popconfirm title="确定删除吗？">
              <!-- @onConfirm="handleDeleteConfirm(scope.row)" -->
              <el-button class="err-c" slot="reference" @click="handleDeleteConfirm(scope.row)" size="small" type="text">删除</el-button >
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
        namespace="discount" />
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

  import { deletePreferential } from "./vuex/api";

  const namespace = 'discount';

  export default {
    name: 'Discount',
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
          total: this.resData.total
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
    mounted() {
      this.searchForm.pageNo =1;
      this.searchForm.pageSize =10;
      this.init();
    },
    methods: {
      init() {
        this.$store.dispatch(`${namespace}/listOfPreferentialList`, this.searchForm);
      },

      handleRowClick(row, column,event) {
      },
      handleCurrentPageChange(pageNo) {
        this.searchForm.pageNo = pageNo;
        this.init();
      },
      handleSelectPageSize(pageSize) {
        this.searchForm.pageSize = pageSize;
        this.init();
      },
      handleSearchSubmit(form) {
        this.init();
      },
      getIndex(index) {
        return index + 1;
      },
      close() {
        this.init();
      },
      /**删除*/
      handleDeleteConfirm(item){
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletePreferential({id:item['id']}).then(res=>{
            this.$message.success('操作成功');
            this.init();
          }).finally(()=>{

          }).catch(err=>{
            console.log(err);
          })
        }).catch(() => {

        });

      }
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/common-content.scss";
</style>

