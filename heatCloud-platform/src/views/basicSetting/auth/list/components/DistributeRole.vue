<template>
  <div class="distribute-role">
    <el-button type="text" size="small" @click="visible = true"
      >分配角色</el-button
    >
    <el-dialog
      :append-to-body="true"
      title="分配"
      :visible.sync="visible"
      width="30%"
    >
      <div class="distribute-role-table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="name" label="角色名称"> </el-table-column>
          <el-table-column prop="address" label="角色描述"> </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'DistributeRole',
  components: {},
  data() {
    return {
      visible: false,
      tableData: [
        {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
      ],
      multipleSelection: [],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleConfirm() {
      console.log(this.multipleSelection);
    },
  },
};
</script>
<style lang="scss" scoped>
  .distribute-role {
    display: inline-block;
  }
</style>
