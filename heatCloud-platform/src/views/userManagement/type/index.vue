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
            namespace="userType"/>
          <el-divider/>
          <div class="header-operation">
            <Operation option="新增类型" @close="close"/>
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
        :columnSequence="'index'"
        :column-align="'center'"
        :column-operations="true"
        :column-operation-params="columnOpParams"
        :column-operation-slot="columnOpSlotName">
        <template slot-scope="scope" slot="dicFlagSlot">
          <span :class="dicFlag[scope.row.dicFlag].className">{{dicFlag[scope.row.dicFlag].name}}</span>
        </template>
        <template slot-scope="scope" slot="dicBelongSlot">
          <span>{{dicBelong[scope.row.dicBelong].name}}</span>
        </template>
        <template slot-scope="scope" :slot="columnOpSlotName">
          <div class="op-slot-wrap">
            <!-- 编辑 -->
            <Operation option="编辑类型" :row="scope.row" @close="close"/>
            <!-- 删除 -->
            <el-button slot="reference" size="small" type="text" class="err-c"
                       :class="scope.row.dicBelong === '0' ? 'err-c-disabled' : ''"
                       :disabled="scope.row.dicBelong === '0'"
                       @click="deleteUserType(scope.row.dicTypeId)">删除
            </el-button>
            <!-- 启用/禁用 -->
            <el-button slot="reference" size="small" type="text" @click="changeUserTypeStatus(scope.row)">{{scope.row.dicFlag === '0' ? '启用' : '禁用'}}</el-button>
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
        namespace="userType"/>
    </div>
  </g-container>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  import Operation from './components/Operation';
  import {
    queryConditions,
    tableColumns,
    columnOpParams,
    columnOpSlotName,
    dicFlag,
    dicBelong,
    paginationParams
  } from './vuex/types';

  const namespace = 'userType';

  export default {
    name: 'UserType',
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
      return {
        dicFlag: dicFlag,
        dicBelong: dicBelong,
      };
    },
    computed: {
      ...mapGetters(namespace, ['loading', 'searchForm', 'resData']),
      paginationParams() {
        return {
          ...paginationParams,
          total: this.resData.total
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
    },
    mounted() {
      this.init();
    },
    methods: {
      ...mapActions('userType', ['UserTypeList', 'Delete', 'Action']),
      init() {
        this.UserTypeList({...this.searchForm});
      },
      handleCurrentPageChange(pageNo) {
        this.searchForm.pageNo = pageNo;
        this.init(this.searchForm);
      },
      handleSelectPageSize(pageSize) {
        this.searchForm.pageSize = pageSize;
        this.init(this.searchForm);
      },
      handleSearchSubmit() {
        this.UserTypeList({...this.searchForm});
      },
      close() {
        this.UserTypeList({...this.searchForm});
      },
      async delete(params) {
        return await this.Delete(params);
      },
      async deleteUserType(id) {
        await this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {dicTypeId: id};
          let result;
          result = this.delete(params);
          if (result) {
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
          }
        }).catch(() => {
        });
        this.UserTypeList({...this.searchForm});
      },
      async action(params) {
        return await this.Action(params);
      },
      async changeUserTypeStatus(row) {
        let text = row.dicFlag === '0' ? '启用' : '禁用';
        await this.$confirm(`此操作将${text}该类型, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {dicTypeId: row.dicTypeId};
          if (row.dicFlag === '0') { // 当前禁用
            params['actionName'] = '1'
          } else {
            params['actionName'] = '0'
          }
          let result;
          result = this.action(params);
          if (result) {
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
          }
        }).catch(() => {
        });
        this.UserTypeList({...this.searchForm});
      }
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/common-content.scss";
</style>
