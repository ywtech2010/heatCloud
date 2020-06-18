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
            namespace="valveList"
          />
          <el-divider />
          <div class="header-operation">
            <Operation option="阀门添加" @close="close" />
            <el-button
              size="small"
              type="default"
              @click="() => handleClick('control')"
              >阀门控制</el-button
            >
            <!--<Operation option="远程升级" @close="close" />-->
            <el-button
              size="small"
              type="default"
              @click="() => handleClick('statistics')"
              >阀门统计</el-button
            >
            <!-- <el-button size="small" type="default">Excel导出</el-button> -->
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
        :column-operation-slot="columnOpSlotName"
      >
        <template slot-scope="scope" :slot="columnOpSlotName">
          <div class="op-slot-wrap">
            <!-- 详情 -->
            <Detail :row="scope.row" />
            <!-- 编辑 -->
            <Operation option="编辑" :row="scope.row" @close="close" />
            <!-- 删除 -->
            <el-button
              class="err-c"
              slot="reference"
              @click="handleDeleteConfirm(scope.row)"
              size="small"
              type="text"
              >删除</el-button
            >
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
        namespace="valveList"
      />
    </div>
  </g-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import addressMixin from '@/views/basicSetting/area/mixins/addressMixin';

import Detail from './components/Detail';
import Operation from './components/Operation';
import {
  queryConditions,
  tableColumns,
  columnOpParams,
  columnOpSlotName,
  paginationParams,
  searchForm,
} from './vuex/types';
import { deleteValve } from './vuex/api';

const namespace = 'valveList';

export default {
  name: 'ValveManage',
  mixins: [addressMixin],
  components: {
    GContainer: () => import('@/components/GlobalComponents/GContainer'),
    Operation,
    GSearch: () => import('@/components/GlobalComponents/GSearch'),
    GHeader: () => import('@/components/GlobalComponents/GHeader'),
    GTable: () => import('@/components/GlobalComponents/GTable'),
    GPagination: () => import('@/components/GlobalComponents/GPagination'),
    Detail,
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
    parseTemperature() {
      return parseTemperature;
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
    this.searchForm.pageNo = 1;
    this.searchForm.pageSize = 10;
    this.init({ ...this.searchForm });
    this.initQueryConditions();
  },
  methods: {
    ...mapActions(namespace, ['valveGetList']),
    init(submitForm) {
      this.valveGetList({ ...submitForm });
    },

    handleClick(componentName) {
      this.$store.dispatch(
        'app/changeCurrentActivePath',
        '/valveManagement/list',
      );
      this.$router.push({
        path: `/valveManagement/${componentName}`,
      });
    },
    handleRowClick(row, column, event) {},
    handleCurrentPageChange(pageNo) {
      this.searchForm.pageNo = pageNo;
      this.init(this.searchForm);
    },
    handleSelectPageSize(pageSize) {
      this.searchForm.pageSize = pageSize;
      this.init(this.searchForm);
    },
    handleSearchSubmit(form) {
      let submitForm = {
        village: form.areaForm.village,
        ...form,
      };
      const addressForm = this.handleAddressForm(form);
      submitForm = {
        ...submitForm,
        ...addressForm,
      };
      this.init(submitForm);
    },
    getIndex(index) {
      return index + 1;
    },
    close() {
      this.init({ ...this.searchForm });
    },
    handleTableSelectionChange(val) {},
    handleAddressChange(selectResult) {
      this.searchForm.areaForm = {
        ...this.searchForm.areaForm,
        ...selectResult.form,
      };
      this.handleAddressData(selectResult);
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

    /**删除*/
    handleDeleteConfirm(item) {
      this.$confirm('该操作将删除此条阀门信息,是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteValve({ id: item['id'] })
            .then((res) => {
              this.$message.success('操作成功');
              this.init({ ...this.searchForm });
            })
            .finally(() => {})
            .catch((err) => {});
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/common-content.scss';
</style>
