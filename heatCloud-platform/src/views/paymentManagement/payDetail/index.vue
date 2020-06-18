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
            namespace="payDetail"/>
          <el-divider />
          <div class="header-operation">
            <Operation option="统计" :orderId="orderId" @close="close" />
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
        :index="getIndex"
        :columnSequence="'index'"
        :column-align="'center'"
        :column-operations="true"
        :column-operation-params="columnOpParams"
        :column-operation-slot="columnOpSlotName">
        <template slot-scope="scope" slot="statusSlot">
          <span :class="status[scope.row.status].className">{{ status[scope.row.status].name }}</span>
        </template>
        <template slot-scope="scope" :slot="columnOpSlotName">
          <div class="op-slot-wrap">
            <UserOrderDetail option="详情" :row="scope.row" @close="close" />
            <el-button class="err-c" slot="reference" size="small" @click="handleDeleteConfirm(scope.row)" type="text">删除</el-button >
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
        namespace="exchangeList" />
    </div>
  </g-container>
</template>

<script>
  import { mapGetters, mapMutations,mapActions } from 'vuex';

  import Operation from './components/Operation';
  import UserOrderDetail from './components/UserOrderDetail'
  import {
    queryConditions,
    tableColumns,
    columnOpParams,
    columnOpSlotName,
    mockData,
    paginationParams,
    searchForm,
    status
  } from './vuex/types';
  import { userOrderDelete } from "./vuex/api";
  import addressMixin from '@/views/paymentManagement/payDetail/mixins/addressMixin'


  const namespace = 'payDetail';

  export default {
    name: 'PayDetail',
    mixins: [addressMixin],
    components: {
      GContainer: () => import('@/components/GlobalComponents/GContainer'),
      Operation,
      UserOrderDetail,
      GSearch: () => import('@/components/GlobalComponents/GSearch'),
      GHeader: () => import('@/components/GlobalComponents/GHeader'),
      GTable: () => import('@/components/GlobalComponents/GTable'),
      GPagination: () => import('@/components/GlobalComponents/GPagination'),
    },
    props: {},
    data() {
      return {
        searchForm: Object.assign({}, searchForm),
        orderId:this.$route.query.orderId
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
      status() {
        return status
      }
    },
    mounted() {
      let submitForm={
        address: "",
        city: "",
        controllerCode: "",
        county: "",
        orderId: this.$route.query.orderId || '',
        orderNo: "",
        pageNo: this.searchForm.pageNo,
        pageSize: this.searchForm.pageSize,
        phone: "",
        province: "",
        status: "",
        street: "",
        userName: "",
        village: "",
      }
      //
      this.init(submitForm);
      this.initQueryConditions();
    },
    methods: {
      ...mapActions('payDetail', ['getUserOrderList',]),

      init(submitForm) {
        // this.$store.dispatch(`${namespace}/getUserOrderList`, this.searchForm);
        this.getUserOrderList({...submitForm})
      },

      handleCurrentPageChange(pageNo) {
        this.searchForm.pageNo = pageNo;
        this.handleReloadSearchData();
      },
      handleSelectPageSize(pageSize) {
        this.searchForm.pageSize = pageSize;
        this.handleReloadSearchData();
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
          userName:this.searchForm.userName,
          orderNo: this.searchForm.orderNo,
          orderId: this.$route.query.orderId || '',
          phone: this.searchForm.phone,
          status: this.searchForm.status,
          controllerCode:this.searchForm.controllerCode,
        };
        this.init(submitForm);
      },
      handleSearchSubmit(form) {
        let submitForm = {
          village: form.areaForm.village,
          userName:form.userName,
          address: form.address,
          orderNo: form.orderNo,
          orderId: this.$route.query.orderId || '',
          phone: form.phone,
          status: form.status,
          controllerCode:form.controllerCode,
          pageSize: form.pageSize,
          pageNo: form.pageNo,
        };
        const addressForm = this.handleAddressForm(form);

        submitForm = {
          ...submitForm,
          ...addressForm
        };

        // TODO 查询提交操作
        this.init(submitForm)
      },
      getIndex(index) {
        return index + 1;
      },
      close() {
       this.init({});
      },
      handleDeleteConfirm(item){
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userOrderDelete({id:item['id']}).then(res=>{
            this.$message.success('操作成功');
            this.init();
          }).catch(err=>{
            console.log(err);
          })
        }).catch(() => {

        });

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

      // // 根据当前选择 清除查询条件中后面的选中值
      // clearSearchArea(type) {
      //   switch (type) {
      //     case 'province':
      //       this.searchForm.areaForm.city = '';
      //       this.searchForm.areaForm.county = '';
      //       this.searchForm.areaForm.street = '';
      //       this.searchForm.areaForm.village = '';
      //       break;
      //     case 'city':
      //       this.searchForm.areaForm.county = '';
      //       this.searchForm.areaForm.street = '';
      //       this.searchForm.areaForm.village = '';
      //       break;
      //     case 'county':
      //       this.searchForm.areaForm.street = '';
      //       this.searchForm.areaForm.village = '';
      //       break;
      //     case 'street':
      //       this.searchForm.areaForm.village = '';
      //       break;
      //     case 'village':
      //       break;
      //   }
      // },
      // async openOperation(type, form) {
      //   if (type === 'edit') {
      //     this.areaForm = {
      //       area: {
      //         province: form.provinceCode,
      //         city: form.cityCode,
      //         county: form.countyCode,
      //         street: form.streetCode,
      //       },
      //       village: form.village,
      //     };
      //     this.optionType = '地址编辑';
      //     await this.initAreaData();
      //   } else {
      //     await this.getProvinces();
      //     await this.clearCities();
      //     await this.clearCounties();
      //     await this.clearStreets();
      //     await this.clearVillages();
      //     this.optionType = '地址添加';
      //   }
      //
      //   this.showOperation = true;
      // },
      // async initAreaData() {
      //   await this.getProvinces();
      //   this.areaForm.area.province && await this.getCities(this.areaForm.area.province);
      //   this.areaForm.area.city && await this.getCounties(this.areaForm.area.city);
      //   this.areaForm.area.county && await this.getStreets(this.areaForm.area.county);
      // },
      // handleClose() {
      //   this.areaForm = {
      //     area: {
      //       city: "",
      //       county: "",
      //       province: "",
      //       street: "",
      //     },
      //     village: "",
      //   };
      //   this.initQueryConditions();
      //   this.showOperation = false;
      // }
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/common-content.scss";
</style>
