<template>
  <g-container>
    <div slot="content" class="common-content">
      <g-header>
        <template slot="header">
          <g-search
            :search-form="searchForm"
            :query-conditions="queryConditions"
            :handle-search="handleSearchSubmit"
            :handle-address-change="handleAddressChange"
            :formItemInline="true"
            :provinces="provinces"
            :cities="cities"
            :counties="counties"
            :streets="streets"
            :villages="villages"
            namespace="userList"/>
          <el-divider />
          <div class="header-operation">
            <el-button size="small" type="primary" plain @click="jumpToUserType">类型管理</el-button >
            <Operation option="用户添加" :selectData="selectData" @close="close" />
            <!--<el-button size="small" type="default">Excel导入</el-button >-->
            <!--<el-button size="small" type="default">Excel导出</el-button >-->
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
        <template slot-scope="scope" :slot="columnOpSlotName">
          <div class="op-slot-wrap">
            <!--密码初始化-->
            <el-button slot="reference" type="text" size="small" @click="initPassword(scope.row.userId)">密码初始化</el-button>
            <!-- 编辑 -->
            <Operation option="用户编辑" :row="scope.row" :selectData="selectData" @close="close" />
            <!-- 删除 -->
            <el-button class="err-c" slot="reference" size="small" type="text" @click="deleteUser(scope.row.userId)">删除</el-button >
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
        namespace="userList" />
    </div>
  </g-container>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex';
  import { userTypeList } from '@/views/userManagement/type/vuex/api';
  import { getValveList } from '@/views/valveManagement/list/vuex/api';
  import addressMixin from '@/views/basicSetting/area/mixins/addressMixin';
  import Operation from './components/Operation';
  import {
    queryConditions,
    tableColumns,
    columnOpParams,
    columnOpSlotName,
    paginationParams,
    searchForm
  } from './vuex/types';

  const namespace = 'userList';

  export default {
    name: 'UserList',
    mixins: [addressMixin],
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
        searchForm: Object.assign({}, searchForm),
        selectData: {
          type: this.getSelectData('userTypeId', queryConditions),
          valve: this.getSelectData('controllerTypeId', queryConditions)
        }
      };
    },
    computed: {
      ...mapGetters(namespace, ['loading', 'resData']),
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
      this.init(searchForm);
      this.initQueryConditions();
    },
    methods: {
      ...mapActions('userList', ['List', 'Delete', 'Action']),
      init(submitForm) {
        this.List({...submitForm});
      },
      handleSearchSubmit(form) {
        let submitForm = {
          village: form.areaForm.village,
          ...form
        };
        const addressForm = this.handleAddressForm(form);
        submitForm = {
          ...submitForm,
          ...addressForm
        };
        // TODO 查询提交操作
        this.init(submitForm)
      },
      handleAddressChange(selectResult) {
        this.searchForm.areaForm = {
          ...this.searchForm.areaForm,
          ...selectResult.form
        };
        this.handleAddressData(selectResult)
      },
      handleCurrentPageChange(pageNo) {
        this.searchForm.pageNo = pageNo;
        this.init(this.searchForm);
      },
      handleSelectPageSize(pageSize) {
        this.searchForm.pageSize = pageSize;
        this.init(this.searchForm);
      },
      close() {
        this.List({...this.searchForm});
      },
      async delete(params) {
        return await this.Delete(params);
      },
      async deleteUser(id) {
        await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let params = {userId: id};
          let result;
          result = await this.delete(params);
          if (result) {
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
            this.List({...this.searchForm});
          }
        }).catch(() => {
        });
      },
      async password(params) {
        return await this.Action(params);
      },
      async initPassword(id) {
        await this.$confirm('此操作将重置用户密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {userId: id};
          let result;
          result = this.password(params);
          if (result) {
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
            this.List({...this.searchForm});
          }
        }).catch(() => {
        });
      },
      jumpToUserType() {
        this.$store.dispatch('app/changeCurrentActivePath', '/user/list');
        this.$router.push({
          name: 'user-type'
        })
      },
      getSelectData(key, data){
        let list = [];
        data.map(item => {
          if(item.formItemName === key) {
            list = item.formItemOptions
          }
        });
        return list
      },
      clearSearchArea(type) {
        switch (type) {
          case 'province':
            this.searchForm.areaForm.city = '';
            this.searchForm.areaForm.county = '';
            this.searchForm.areaForm.street = '';
            this.searchForm.areaForm.village = '';
            break;
          case 'city':
            this.searchForm.areaForm.county = '';
            this.searchForm.areaForm.street = '';
            this.searchForm.areaForm.village = '';
            break;
          case 'county':
            this.searchForm.areaForm.street = '';
            this.searchForm.areaForm.village = '';
            break;
          case 'street':
            this.searchForm.areaForm.village = '';
            break;
          case 'village':
            break;
        }
      },
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/common-content.scss";
</style>
