<template>
  <div>
    <manager>
      <div slot="header" class="search-header">
        <el-form size="small" ref="form" :model="formData" :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-address></el-address>
          </el-form-item>

          <el-form-item  label="集中器地址">
            <el-input
              style="width: 180px"
              size="small"
              ref="address"
              v-model="address"></el-input>
          </el-form-item>

          <el-form-item label="集中器序号">
            <el-input
              style="width: 120px"
              ref="number"
              v-model="number"></el-input>
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="selectState" placeholder="请选择">
              <el-option
                v-for="item in states"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item >
            <el-button type="primary" style="background-color:#125AD9;border:none;">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div slot="main">
        <div style="margin-bottom: 20px">
          <el-button size="small" @click="dialogAddVisible = true">集中器添加</el-button>
          <el-button size="small">Excel导入</el-button>
          <el-button size="small">Excel导出</el-button>
        </div>
        <div>
          <template>
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                prop="number"
                label="序号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="serialNumber"
                label="集中器序列号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="address"
                label="集中器地址">
              </el-table-column>
              <el-table-column
                prop="time"
                label="同步时间"
                width="200px">
              </el-table-column>
              <el-table-column
                prop="state"
                label="状态"
                width="150px">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="260px">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent=""
                    type="text"
                    size="small"
                    @click="handleWatchValve">
                    查看阀门
                  </el-button>
                  <el-button
                    @click.native.prevent=""
                    type="text"
                    size="small">
                    编辑
                  </el-button>
                  <el-button
                    @click.native.prevent=""
                    type="text"
                    size="small"
                    style="color: red">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </manager>

    <!--<valve v-if="isShow" @handleCloseValve="isShow = false"></valve>-->

    <el-dialog title="阀门绑定" :visible.sync="dialogAddVisible">
      <el-form label-position="right" class="demo-ruleForm" label-width="100px">
        <el-form-item label="集中器序号"
                      :rules="[
                      { required: true, message: '请输入集中器序号', trigger: 'blur' }
                      ]">
          <el-input size="180px"></el-input>
        </el-form-item>
        <el-form-item label="所在地区"
                      :rules="[
                      { required: true, message: '请选择所在地区', trigger: 'change' }
                      ]">
          <el-address></el-address>
        </el-form-item>

        <el-form-item label="阀门绑定">
          <el-input style="width: 600px"></el-input>
        </el-form-item>
      </el-form>

      <div style="margin: 10px auto;text-align:center;">
        <el-button size="small" type="primary" style="background-color:#125AD9;border: solid 1px #125AD9;">保存</el-button>
        <el-button size="small" @click="dialogAddVisible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import ElAddress from "./components/ElAddress";
  import Manager from "@/components/manager/index";
  import Valve from "./components/Valve";

  export default {
    name: "index",
    components: {Manager, ElAddress, Valve},
    data() {
      return {
        province: '',
        city: '',
        area: '',
        street: '',
        village: '',
        address: '',
        number: '',
        types: [],
        states: [],
        formData: {},
        tableData: [
          {number: 1, serialNumber: 315020, address: '浙江省杭州市***小区***街道**********单元205室', time: '2020-01-23 15:20:20', state: '在线'}
        ],
        dialogAddVisible: false,
        dialogValveVisible: false,
        isShow: false, //弹出查看阀门
        selectState: '',
      }
    },
    methods:{
      handleWatchValve: function () {
        this.$store.dispatch('app/changeCurrentActivePath', '/concentrator/index');
        this.$router.push({
          path: '/concentrator/valve'
        })
      }
    }
  }
</script>


<style lang="scss" scoped>

  .search-header {
    padding-bottom: 0;
  }

  .el-dialog {
    width: 750px;

    .el-input {
      width: 180px;

      input {
        border-radius: 0;
        padding: 8px 12px;
      }
    }

    .el-address{
      .el-input{
        width: 118px;
      }
    }

    .el-dialog__header {
      font-size: 14px;
      border-bottom: 1px solid #EEEEEE;
    }
  }

  .el-table {
    th{
      background-color: #F2F2F2;
      text-align: center;
    }
    td{
      text-align: center;
    }
  }

</style>
