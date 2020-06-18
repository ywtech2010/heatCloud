<template>
  <div class="valve-container">
    <manager>
      <div slot="header">
        <el-form size="small" ref="form" :model="formData" :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-address></el-address>
          </el-form-item>

          <el-form-item label="阀门地址">
            <el-input
              style="width: 240px"
              ref="address"
              v-model="address"></el-input>
          </el-form-item>

          <el-form-item label="阀门序列号">
            <el-input
              style="width: 150px"
              ref="number"
              v-model="number"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="background-color:#125AD9;border:none;">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div slot="main">
        <div style="margin-bottom: 20px">
          <el-button size="small" @click="dialogBindVisible = true">阀门绑定</el-button>
          <el-button size="small">批量解绑</el-button>
        </div>
        <div>
          <template>
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="number"
                label="序号"
                width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column
                prop="serialNumber"
                label="阀门序列号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="阀门地址"
                width="300">
              </el-table-column>
              <el-table-column
                prop="inTemp"
                label="进水温度"
                width="100px">
              </el-table-column>
              <el-table-column
                prop="backTemp"
                label="回水温度"
                width="100px">
              </el-table-column>
              <el-table-column
                prop="backTempRange"
                label="进回水温差"
                width="100px">
              </el-table-column>
              <el-table-column
                prop="backTempRange"
                label="室内温度"
                width="100px">
              </el-table-column>
              <el-table-column
                prop=""
                label="阀门开度"
                width="100px">
              </el-table-column>
              <el-table-column
                prop=""
                label="阀门压力"
                width="100px">
              </el-table-column>
              <el-table-column
                prop=""
                label="开阀累计时间"
                width="150px">
              </el-table-column>
              <el-table-column
                prop=""
                label="采集时间"
                width="180px">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent=""
                    type="text"
                    size="small">
                    解绑
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </manager>
    <el-dialog title="阀门绑定" :visible.sync="dialogBindVisible" >
      <el-form label-position="right" inline="true" class="demo-form-inline">
        <el-form-item label="阀门序列号" label-width="100px">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="楼号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="单元" label-width="100px">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="室号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="background-color:#125AD9;border:none;">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="">
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          label="序号"
          width="80">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="阀门序列号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="楼号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="type"
          label="单元号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="type"
          label="室号"
          width="150">
        </el-table-column>
      </el-table>
      <div style="margin: 10px auto;text-align:center;">
        <el-button type="primary" style="background-color:#125AD9;">保存</el-button>
        <el-button>取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ElAddress from "./ElAddress";
  import Manager from "@/components/manager/index";
  export default {
    name: "valvelala",
    components: {Manager, ElAddress},
    data() {
      return {
        address: '',
        number: '',
        types: [],
        states: [],
        tableData: [
          {number: 1, serialNumber: 5001, address: '浙江省宁波市鄞州区XXX地方XXX小区XXX街道'}
        ],
        formData: {},
        selectState: '',
        dialogBindVisible: false,
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  .valve-container{
    z-index: 90;
    top: 0;
    left: 0;
    width: 100%;
    position: absolute;
  }

  .el-dialog {
    width: 750px;

    .el-input {
      width: 180px;

      input {
        border-radius: 0;
        padding: 8px 12px;
        height: 30px;
      }
    }

    .address{
      .el-input {
        width: 120px;
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
