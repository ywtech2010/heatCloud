<template>
  <div class="pay-content" >
    <el-breadcrumb separator="/" style="margin-top: 32px;margin-left: 28px;display: inline-block">
      <el-breadcrumb-item><span style="color: #666666" @click="goBack" >换热站管理</span></el-breadcrumb-item>
      <el-breadcrumb-item ><span style="color:rgba(18,90,217,1);">报警设置</span></el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-left:27px ">
      <div class="fill-table">

        <div class="table-content">
          <el-table :data="tableData" border   :header-cell-style="{background: 'rgba(242,242,242,1)'}">
            <el-table-column  label="序号" width="50"  type="index">

            </el-table-column>
            <el-table-column prop="date" label="报警类型">
            </el-table-column>
            <el-table-column prop="name" label="报警级别" >
            </el-table-column>
            <el-table-column prop="name" label="报警方式">
            </el-table-column>
            <el-table-column prop="address" label="是否报警">
            </el-table-column>
            <el-table-column prop="address" label="报警条件"  width="250">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope" >

                <el-button @click="handleEdit(scope.$index)" size="small" type="text">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>
      </div>


    </div>


    <!--编辑-->
    <el-dialog
      :title="'编辑'"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="600px">

      <el-form
        :model="form"
        size="small"
        label-width="80px" >
        <el-form-item label="报警类型" prop="type" class="form-item">
          <el-input v-model="form.type" style="width: 160px">
          </el-input>
        </el-form-item>
        <el-form-item label="报警级别" prop="endTime"  class="form-item">
          <el-select v-model="form.grade" placeholder="please select your zone">
            <el-option label="Zone one" value="shanghai"/>
            <el-option label="Zone two" value="beijing"/>
          </el-select>
        </el-form-item>
        <el-form-item label="报警方式" prop="endTime"  class="form-item">
          <el-select v-model="form.grade" placeholder="please select your zone">
            <el-option label="Zone one" value="shanghai"/>
            <el-option label="Zone two" value="beijing"/>
          </el-select>
        </el-form-item>
        <el-form-item label="是否报警" prop="endTime"  class="form-item">
          <el-select v-model="form.grade" >
            <el-option label="Zone one" value="是"/>
            <el-option label="Zone two" value="否"/>
          </el-select>
        </el-form-item>

        <el-form-item label="报警条件" prop="endTime">
          <el-input type="textarea" rows="4" v-model="form.remark" clearable  style="width: 100%!important;"/>
        </el-form-item>


      </el-form>

      <div class="dialog-footer" style="text-align: right;margin-bottom: 10px;margin-top: 50px;display: block">
        <el-button
          @click="dialogVisible = false"
          size="small">取消</el-button>


        <el-button
          type="primary"
          :loading="dialogLoading"
          @click="payAdd"
          size="small">确定
        </el-button>

      </div>


    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'WarningSet',
    data() {
      return {
        loading: false,
        form: {
          type:undefined,
          grade:undefined,
          remark:undefined,
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogVisible: false,//详情是否dialog显示
        dialogLoading:false,
      }
    },
    methods: {
      goBack(){
        this.$emit('backHeat',false);
      },
      /*编辑*/
      handleEdit(){
        this.dialogVisible=true;
      },
      payAdd(){

      }

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
