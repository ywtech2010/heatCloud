<template>
  <div class="pay-content" >
    <el-breadcrumb separator="/" style="margin-top: 32px;margin-left: 28px;display: inline-block">
      <el-breadcrumb-item><span style="color: #666666" @click="goBack" >换热站管理</span></el-breadcrumb-item>
      <el-breadcrumb-item ><span style="color:rgba(18,90,217,1);">统计</span></el-breadcrumb-item>
    </el-breadcrumb>

    <div style="margin-left:27px ">
      <div style="height:85px;margin-top: 20px;width:100%;display: inline-block;border-bottom: 1px solid rgba(238,238,238,1);">
        <el-form
          ref="form"
          :inline="true"
          :model="form"
          size="small"
          style="margin-bottom: -18px;">

          <el-form-item label="小区名称" prop="name">
            <el-input
              v-model="form.name"
              :clearable="true"/>
          </el-form-item>
          <el-form-item >
            <el-button type="primary"    :disabled="loading" @click="handleSearch()">查询</el-button>

          </el-form-item>
        </el-form>

        <div style="height:15px;font-size:14px;color:rgba(0,0,0,1);margin:20px 0;">
            总户数：200户，供暖户数：100户，户数百分比：50%，总面积：10000㎡，供暖面积：5000㎡，面积百分比：50%，
          报警次数：100次
        </div>
      </div>

      <el-row style="margin-top: 20px">
        <el-button size="small" >Excel导出</el-button>
      </el-row>

      <div class="fill-table">

        <div class="table-content">
          <el-table :data="resData.mockData.tableData" border   :header-cell-style="{background: 'rgba(242,242,242,1)'}">
            <el-table-column  label="序号" width="50"  type="index">

            </el-table-column>
            <el-table-column prop="date" label="小区名称">
            </el-table-column>
            <el-table-column prop="name" label="总户数" >
            </el-table-column>
            <el-table-column prop="name" label="供暖户数">
            </el-table-column>
            <el-table-column prop="address" label="户数百分比" >
            </el-table-column>
            <el-table-column prop="address" label="总面积" >
            </el-table-column>
            <el-table-column prop="address" label="供暖面积"></el-table-column>
            <el-table-column prop="address" label="面积百分比"></el-table-column>
            <el-table-column prop="address" label="报警次数"></el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope" >
                <el-button @click="warningLog(scope.row)" size="small" type="text">报警日志</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>
      </div>


    </div>

    <!--报警日志-->
    <el-dialog
      :title="'报警日志'"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="900px">

      <el-form
        :model="form"
        size="small"
        label-width="100px" >
        <el-form-item label="报警类型" prop="type" style="float: left">
          <el-select v-model="form.grade" placeholder="ne" style="width: 140px">
            <el-option label="Zone one" value="shanghai"/>
            <el-option label="Zone two" value="beijing"/>
          </el-select>
        </el-form-item>
        <el-form-item label="报警级别" prop="endTime" style="float: left">
          <el-select v-model="form.grade" placeholder="e" style="width: 140px">
            <el-option label="Zone one" value="shanghai"/>
            <el-option label="Zone two" value="beijing"/>
          </el-select>
        </el-form-item>
        <el-form-item label="阀门序列号" prop="endTime"style="float: left">
          <el-input v-model="form.type" style="width: 140px">
          </el-input>
        </el-form-item>
        <el-form-item  style="float: left;width: 100px;margin-left: -80px">
          <el-button type="primary"   :disabled="loading" @click="handleSearch()">查询</el-button>

        </el-form-item>



      </el-form>

      <div class="dialog-footer" style="text-align: right;margin-bottom: 10px;margin-top: 50px;display: block">
        <el-button
          @click="dialogVisible = false"
          size="small" style="display: inline-block"> 取消</el-button>


        <!--<el-button-->
          <!--type="primary"-->
          <!--:loading="dialogLoading"-->
          <!--@click="payAdd"-->
          <!--size="small">确定-->
        <!--</el-button>-->

      </div>


    </el-dialog>

  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

  const namespace = 'heatStatistics';

  export default {
    name: 'HeatStatic',
    data() {
      return {
        loading: false,
        form: {
          name:undefined,
        },
        // tableData: [{
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1518 弄'
        // }],
        dialogVisible: false,//详情是否dialog显示
        dialogLoading:false,
      }
    },

    computed: {
      ...mapGetters(namespace, ['resData']),
    },

    mounted() {
      console.log(this.resData);
    },
    methods: {
      goBack(){
        this.$emit('backHeat',false);
      },
      /*日志*/
      warningLog(){
        this.dialogVisible=true;
      },

    }
  }
</script>

<style scoped>
  .pay-content{
    margin: 20px;
    background: rgba(255,255,255,1);
    min-width: 1200px;
    min-height:600px
  }

  /deep/.el-form-item__label{
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(3,3,3,1);
  }
  .fill-table{
    margin-top: 20px;
    padding-bottom: 20px;
    display: inline-block;
    min-height: 170px;
    width: 100%;
    background: white;
  }
  .table-content{
    margin-right: 27px;
  }
  /deep/.el-dialog__header{
    border-bottom: 1px solid rgba(233,233,233,1);
  }
  .full-div{
    height: 15px!important;margin-bottom: 22px
  }
  .half-div{
    height: 15px!important;width: 50%;float: left;margin-bottom: 22px
  }
  .el-form-item__label1{
    line-height: 20px !important;font-family:Microsoft YaHei;font-weight:400;color:rgba(3,3,3,1);margin-bottom: 22px
  }
  .el-form-item__label2{
    height: 32px !important;line-height: 32px !important;font-family:Microsoft YaHei;font-weight:400;color:rgba(3,3,3,1);
  }
  .form-item{
    width: 50%;
    float: left;
  }
  .el-input--small.el-input__inner{
    width: 480px !important;
  }
  .el-input--small .el-input__inner{

  }
  .span1{
    height:15px;font-size:14px;font-family:Microsoft YaHei;font-weight:400;color:rgba(3,3,3,1);
  }
  .input-warning{
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .form-item{
    width: 50%;
    float: left;
  }

</style>
