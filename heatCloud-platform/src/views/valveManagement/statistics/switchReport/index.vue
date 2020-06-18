<template>
  <div class="common-content">
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
          namespace="switchList"
        />
        <el-divider />
        <!-- <div class="header-operation">
          <el-button size="small" type="default">Excel导出</el-button>
        </div> -->
      </template>
    </g-header>
    <g-table
      :table-data="resData.list || []"
      :border="false"
      :loading="loading"
      :table-fit="true"
      :table-width="'100%'"
      :table-columns="tableColumns"
      :index="getIndex"
      :columnSequence="'index'"
      :column-align="'center'"
      :column-operations="false"
    >
      <template slot-scope="scope" slot="troubleStatusSlot">
        <span :class="troubleStatus[scope.row.troubleStatus].className">{{ troubleStatus[scope.row.troubleStatus].name }}</span>
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
      namespace="switchList"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import GContainer from '@/components/GlobalComponents/GContainer';
import GSearch from '@/components/GlobalComponents/GSearch';
import GHeader from '@/components/GlobalComponents/GHeader';
import GTable from '@/components/GlobalComponents/GTable';
import GPagination from '@/components/GlobalComponents/GPagination';
import addressMixin from '@/views/basicSetting/area/mixins/addressMixin';

import {
  queryConditions,
  tableColumns,
  troubleStatus,
  mockData,
  paginationParams,
} from './vuex/types';

const namespace = 'switchList';

export default {
  name: 'SwitchList',
  mixins: [addressMixin],
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
      troubleStatus: troubleStatus,
    };
  },
  computed: {
    ...mapGetters(namespace, ['loading', 'searchForm', 'resData']),
    paginationParams() {
      return {
        ...paginationParams,
        total: this.resData.total,
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
  mounted() {
    this.searchForm.pageNo = 1;
    this.searchForm.pageSize = 10;
    this.init(this.searchForm);
    this.initQueryConditions();
  },
  methods: {
    ...mapActions(namespace, ['List']),
    init(submitForm) {
      this.List({ ...submitForm });
    },
    getIndex(index) {
      return index + 1;
    },
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
      this.init(this.searchForm);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/common-content.scss';
</style>
