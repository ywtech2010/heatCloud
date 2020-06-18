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
            namespace="cardManage"/>
          <el-divider />
          <div class="header-operation">
            <el-button size="small" type="default" @click="batchDeleteCard">批量回收</el-button>
            <!-- <el-button size="small" type="default">Excel导出</el-button> -->
          </div>
        </template>
      </g-header>
      <g-table
        :tableRef="'multipleTable'"
        :table-data="resData.list || []"
        :border="false"
        :loading="loading"
        :table-fit="true"
        :table-width="'100%'"
        :table-columns="tableColumns"
        :columnSequence="'index'"
        :column-align="'center'"
        :column-operations="true"
        :column-operation-params="columnOpParams"
        :column-operation-slot="columnOpSlotName"
        :row-selection-change="rowSelectionChange">
        <template slot-scope="scope" slot="statusSlot">
          <span :class="statusFlag[scope.row.flag].className">{{statusFlag[scope.row.flag].name}}</span>
        </template>
        <template slot-scope="scope" :slot="columnOpSlotName">
          <div class="op-slot-wrap">
            <!-- 禁用 -->
            <el-button slot="reference" size="small" type="text" @click="forbiddenCard(scope.row.id)">禁用</el-button>
            <!--删除-->
            <el-button class="err-c" slot="reference" size="small" type="text" @click="deleteCard(scope.row.id)">删除</el-button >
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
        namespace="cardManage" />
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
    statusFlag
  } from './vuex/types';

  const namespace = 'cardManage';

  export default {
    name: 'CardManage',
    components: {
      GContainer: () => import('@/components/GlobalComponents/GContainer'),
      GSearch: () => import('@/components/GlobalComponents/GSearch'),
      GHeader: () => import('@/components/GlobalComponents/GHeader'),
      GTable: () => import('@/components/GlobalComponents/GTable'),
      GPagination: () => import('@/components/GlobalComponents/GPagination'),
    },
    props: {},
    data() {
      return {
        selectRow: []
      };
    },
    computed: {
      ...mapGetters(namespace, ['loading', 'searchForm', 'resData']),
      paginationParams() {
        return {
          ...paginationParams,
          total: this.resData.count
        }
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
      statusFlag() {
        return statusFlag
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      ...mapActions('cardManage', ['List', 'Delete', 'BatchDelete', 'Forbidden']),
      init() {
        this.List({...this.searchForm});
      },
      handleCurrentPageChange(pageNo) {
        this.paginationParams.pageNo = pageNo;
        this.searchForm.pageNo = pageNo;
        this.init();
      },
      handleSelectPageSize(pageSize) {
        this.paginationParams.pageSize = pageSize;
        this.searchForm.pageSize = pageSize;
        this.init();
      },
      handleSearchSubmit() {
        this.init();
      },
      rowSelectionChange(val){
        this.selectRow = val
      },
      async delete(type, params) {
        if(type === 'single') {
          return await this.Delete(params);
        } else {
          return await this.BatchDelete(params);
        }
      },
      async deleteCard(id) {
        await this.$confirm('此操作将删除该卡片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result;
          result = await this.delete('single', id);
          if (result) {
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
            this.List({...this.searchForm});
          }
        }).catch(() => {});
      },
      async forbiddenCard(id) {
        await this.$confirm('此操作将禁用该卡片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result;
          result = await this.Forbidden(id);
          if (result) {
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
          }
        }).catch(() => {});
        this.List({...this.searchForm});
      },
      async batchDeleteCard(){
        if(this.selectRow.length === 0) {
          this.$message({
            type: 'error',
            message: '请选择需要操作的项!',
          });
          return
        }
        let idList = [];
        this.selectRow.map(item => {
          idList.push(item.id)
        })
        let idString = idList.join();
        let result;
        result = await this.delete('batch', idString);
        if (result) {
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
          this.List({...this.searchForm});
        }
      }
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/common-content.scss";
</style>
