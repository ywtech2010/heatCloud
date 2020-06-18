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
            namespace="payment"/>
          <el-divider />
          <div class="header-operation">
            <el-button size="small" @click="jumpDiscount">优惠管理</el-button>
            <Operation option="新增缴费" @close="close" />
            <!--<el-button size="small" type="default" @click="excelOut">Excel导出</el-button>-->
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
        <template slot-scope="scope" :slot="columnOpSlotName">
          <div class="op-slot-wrap" v-if="!scope.row['publicFlag']||scope.row['publicFlag']==0">
            <el-button size="small" @click="publish(scope.row)" type="text">发布</el-button>
            <!--<el-button size="small" type="text">详情</el-button>-->
            <!-- 详情 -->
            <BackendDetail option="详情" :row="scope.row" @close="close"> </BackendDetail>

            <Operation option="编辑" :row="scope.row" @close="close" />
            <!-- 删除 -->
            <el-button class="err-c" slot="reference" @click="handleDeleteConfirm(scope.row)" size="small" type="text">删除</el-button >
          </div>

          <div class="op-slot-wrap" v-if="scope.row['publicFlag']&&scope.row['publicFlag']==1">
            <el-button  @click="showDetail(scope.row)" type="text">查看缴费详情</el-button>
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
        namespace="payment" />
    </div>
  </g-container>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

  import Operation from './components/Operation';
  import BackendDetail from './components/BackendDetial'

  import {publishOrder,deleteUserOrder,orderExport} from "./vuex/api";

  import {
    queryConditions,
    tableColumns,
    columnOpParams,
    columnOpSlotName,
    mockData,
    paginationParams
  } from './vuex/types';

  const namespace = 'payment';

  export default {
    name: 'Payment',
    components: {
      GContainer: () => import('@/components/GlobalComponents/GContainer'),
      Operation,
      BackendDetail,
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
      jumpDiscount(){
        this.$store.dispatch('app/changeCurrentActivePath', '/paymentManagement/payment');
        this.$router.push( `/paymentManagement/discount`)
      },

      init() {
        this.$store.dispatch(`${namespace}/backendList`, this.searchForm);
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

      /**导出*/
      excelOut(){
        orderExport(this.searchForm).then(res=>{
          debugger
          console.log(res);
        }).catch(()=>{

        })
      },

      close() {
        // this.List({ ...this.searchForm });
        this.init();
      },

      showDetail(item){
        this.$store.dispatch('app/changeCurrentActivePath', '/paymentManagement/payment');
        this.$router.push( {path:`/paymentManagement/payDetail`,query: { orderId: item.id }})
      },

      /**发布*/
      publish(item){

        this.$confirm('该操作将发布此条缴费信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$store.dispatch(`${namespace}/orderPublish`,{orderId:item['id']});
          publishOrder({orderId:item['id']}).then(res=>{
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
            this.$store.dispatch(`${namespace}/backendList`, this.searchForm)
          }).finally(()=>{
          }).catch(()=>{

          })

        }).catch(() => {

        });
      },

      /**删除*/
      handleDeleteConfirm(item){
        this.$confirm('该操作将删除此条缴费信息,是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$store.dispatch(`${namespace}/orderDelete`,{id:item['id']});
          deleteUserOrder({id:item['id']}).then(res=>{
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
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
