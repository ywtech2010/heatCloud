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
            namespace="controlList"
          />
          <el-divider />
          <div class="header-operation">
            <Operation
              option="回水温度设置"
              :valveCodeList="ids"
              @close="close"
            />
            <Operation
              option="阀门开度设置"
              :valveCodeList="ids"
              @close="close"
            />
            <el-button size="small" type="default" @click="closeMany"
              >批量关闭</el-button
            >
          </div>
        </template>
      </g-header>
      <g-table
        :table-data="resData.list || []"
        :border="false"
        :loading="loading"
        :table-ref="'multipleTable'"
        :table-fit="true"
        :table-width="'100%'"
        :table-columns="tableColumns"
        :row-handle-click="handleRowClick"
        :row-selection-change="rowSelectionChange"
        :index="getIndex"
        :columnSequence="'index'"
        :column-align="'center'"
        :column-operations="true"
        :column-operation-params="columnOpParams"
        :column-operation-slot="columnOpSlotName"
      >
        <template slot-scope="scope" slot="maxOutTempSlot">
          <span
            >{{ parseTemperature(scope.row.minOutTemp) }} -
            {{ parseTemperature(scope.row.maxOutTemp) }}</span
          >
        </template>
        <template slot-scope="scope" slot="payStatusSlot">
          <span>{{ payStatus[scope.row.payStatus].name }}</span>
        </template>
        <template slot-scope="scope" slot="statusSlot">
          <span>{{ status[scope.row.status].name }}</span>
        </template>

        <template slot-scope="scope" :slot="columnOpSlotName">
          <div class="op-slot-wrap">
            <Operation
              option="温度设置"
              :valveCodeList="[scope.row.code]"
              @close="close"
            />
            <Operation
              option="开度设置"
              :valveCodeList="[scope.row.code]"
              @close="close"
            />
            <!-- 禁用/启用 -->
            <el-button
              v-if="scope.row.status"
              class="err-c"
              slot="reference"
              size="small"
              type="text"
              @click="handleDeleteConfirm(scope.row)"
              >关闭</el-button
            >
            <el-button
              v-else
              class="suc-c"
              slot="reference"
              size="small"
              type="text"
              @click="handleDeleteConfirm(scope.row)"
              >开启</el-button
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
        namespace="controlList"
      />
    </div>
  </g-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import addressMixin from '@/views/basicSetting/area/mixins/addressMixin';

import Operation from './components/Operation';
import { valveControlSet } from './vuex/api';

import {
  queryConditions,
  tableColumns,
  columnOpParams,
  columnOpSlotName,
  mockData,
  status,
  payStatus,
  paginationParams,
  parseTemperature,
} from './vuex/types';

const namespace = 'controlList';

export default {
  name: 'ControlList',
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
      ids: [],
      status: status,
      payStatus: payStatus,
    };
  },
  mounted() {
    this.searchForm.pageNo = 1;
    this.searchForm.pageSize = 10;
    this.init(this.searchForm);
    this.initQueryConditions();
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
    ...mapActions(namespace, ['getControlList']),
    init(submitForm) {
      this.getControlList({ ...submitForm });
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
    // columnSelectable(row, index) {
    //   // return 1;
    // },

    rowSelectionChange(val) {
      this.ids = [];
      for (let i = 0; i < val.length; i++) {
        this.ids.push(val[i]['code']);
      }
    },
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
    close() {
      this.init();
    },
    /**关闭*/
    handleDeleteConfirm(item) {
      console.log(item);
      this.$confirm(
        `${
          !item.status
            ? '该操作将开启此阀门,是否开启?'
            : '该操作将关闭此阀门,是否关闭?'
        }`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        },
      )
        .then(() => {
          let dic = {
            controlType: 2,
            openStatus: +!item.status,
            valveCodeList: [item.code],
          };
          this.closeFuc(dic);
        })
        .catch(() => {});
    },
    /****/
    closeFuc(dic) {
      valveControlSet(dic)
        .then((res) => {
          this.$message.success('操作成功');
          this.init(this.searchForm);
        })
        .finally(() => {})
        .catch((err) => {
          console.log(err);
        });
    },
    /**批量关闭*/
    closeMany() {
      if (this.ids.length == 0) {
        this.$message.warning('请选择需要批量关闭的数据');
      } else {
        let dic = {
          controlType: 2,
          openStatus: 0,
          valveCodeList: this.ids,
        };
        this.$confirm('该操作将关闭选中的数据，是否关闭?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.closeFuc(dic);
          })
          .catch(() => {});
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/common-content.scss';
</style>
