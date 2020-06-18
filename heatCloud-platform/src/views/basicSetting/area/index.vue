<template>
  <g-container>
    <div slot="content" class="common-content">
      <g-header>
        <template slot="header">
          <g-search
            :search-form="searchForm"
            :query-conditions="queryConditions"
            :handle-search="handleSearchSubmit"
            :handle-address-change = "handleAddressChange"
            :formItemInline="true"
            :provinces="provinces"
            :cities="cities"
            :counties="counties"
            :streets="streets"
            :villages="villages"
            namespace="area"/>
          <el-divider />
          <div class="header-operation">
            <el-button @click="openOperation('add')" size="small" type="default">地址添加</el-button >
            <!--<el-button size="small" type="default">Excel导出</el-button >-->
          </div>
        </template>
      </g-header>
      <g-table
        :table-data="villageListData"
        :border="false"
        :loading="loading"
        :table-fit="true"
        :table-width="'100%'"
        :table-columns="tableColumns"
        :index="getIndex"
        :columnSequence="'index'"
        :column-align="'center'"
        :column-operations="true"
        :column-operation-params="columnOpParams"
        :column-operation-slot="columnOpSlotName">
        <template slot-scope="scope" :slot="columnOpSlotName">
          <div class="op-slot-wrap">
            <!-- 编辑 -->
            <el-button @click="openOperation('edit', scope.row)" slot="reference" size="small" type="text">编辑</el-button>
            <!-- 删除 -->
            <el-button @click="deleteAddress(scope.row)" class="err-c" slot="reference" size="small" type="text">删除</el-button>
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
        namespace="area" />
    </div>
    <Operation slot="content"
               :visible="showOperation"
               :option="optionType"
               :row="areaForm"
               @reloadSearchData="handleReloadSearchData"
               @close="handleClose"/>
  </g-container>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex';
  import addressMixin from '@/views/basicSetting/area/mixins/addressMixin'
  import {
    queryConditions,
    tableColumns,
    columnOpParams,
    columnOpSlotName,
    paginationParams,
    searchForm
  } from './vuex/types';

  const namespace = 'area';

  export default {
    name: 'Area',
    mixins: [addressMixin],
    components: {
      GContainer: () => import('@/components/GlobalComponents/GContainer'),
      GSearch: () => import('@/components/GlobalComponents/GSearch'),
      GHeader: () => import('@/components/GlobalComponents/GHeader'),
      GTable: () => import('@/components/GlobalComponents/GTable'),
      GPagination: () => import('@/components/GlobalComponents/GPagination'),
      Operation: () => import('./components/Operation'),
    },
    props: {},
    data() {
      return {
        searchForm: Object.assign({}, searchForm),
        showOperation: false,
        areaForm: {
          area: {
            city: "",
            county: "",
            province: "",
            street: "",
          },
          village: "",
        },
        optionType: '地址添加',
        paginationParams: {
          ...paginationParams
        }
      };
    },
    computed: {
      ...mapGetters(namespace,
        [
          'loading',
          'villageListData',
        ]
      ),
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
      this.init(this.searchForm);
      this.initQueryConditions();
    },
    methods: {
      ...mapActions('area', [
        'Search',
        'Delete'
      ]),
      handleCurrentPageChange(pageNo) {
        this.paginationParams.pageNo = pageNo;
        this.searchForm.pageNo = pageNo;
        this.handleReloadSearchData();
      },
      handleSelectPageSize(pageSize) {
        this.paginationParams.pageSize = pageSize;
        this.searchForm.pageSize = pageSize;
        this.handleReloadSearchData();
      },
      handleSearchSubmit(form) {
        let submitForm = {
          pageSize: form.pageSize,
          pageNo: form.pageNo,
          village: form.areaForm.village,
          address: form.address
        };
        const addressForm = this.handleAddressForm(form);
        submitForm = {
          ...submitForm,
          ...addressForm
        }
        // TODO 查询提交操作
        this.init(submitForm)
      },
      handleReloadSearchData() {
        let submitForm = {
          pageSize: this.searchForm.pageSize,
          pageNo: this.searchForm.pageNo,
          address: this.searchForm.address,
          village: this.searchForm.areaForm.village,
          province: this.searchForm.areaForm.province,
          city: this.searchForm.areaForm.city,
          county: this.searchForm.areaForm.county,
          street: this.searchForm.areaForm.street,
        };
        this.init(submitForm);
      },
      init(submitForm) {
        this.Search(submitForm).then(res => {
          this.paginationParams.total = res.total;
        });
      },
      getIndex(index) {
        return index + 1;
      },
      async deleteAddress(obj) {
        await this.$confirm('此操作将删除该地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result;
          result = await this.Delete(obj.id);
          if (result) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.handleReloadSearchData();
          }
        }).catch(() => {
        });
      },
      handleAddressChange(selectResult) {
        this.searchForm.areaForm = {
          ...this.searchForm.areaForm,
          ...selectResult.form
        }
        this.handleAddressData(selectResult)
      },
      // 根据当前选择 清除查询条件中后面的选中值
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
      async openOperation(type, form) {
        if (type === 'edit') {
          this.areaForm = {
            id: form.id,
            area: {
              province: form.provinceCode,
              city: form.cityCode,
              county: form.countyCode,
              street: form.streetCode,
            },
            village: form.village,
          };
          this.optionType = '地址编辑';
          await this.initAreaData();
        } else {
          await this.getProvinces();
          await this.clearCities();
          await this.clearCounties();
          await this.clearStreets();
          await this.clearVillages();
          this.optionType = '地址添加';
        }

        this.showOperation = true;
      },
      async initAreaData() {
        await this.getProvinces();
        this.areaForm.area.province && await this.getCities(this.areaForm.area.province);
        this.areaForm.area.city && await this.getCounties(this.areaForm.area.city);
        this.areaForm.area.county && await this.getStreets(this.areaForm.area.county);
      },
      handleClose() {
        this.areaForm = {
          area: {
            city: "",
            county: "",
            province: "",
            street: "",
          },
          village: "",
        };
        this.initQueryConditions();
        this.showOperation = false;
      }
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/common-content.scss";
</style>
