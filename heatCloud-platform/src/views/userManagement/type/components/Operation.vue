<template>
  <span>
    <el-button v-if="option === '新增类型'" size="small" type="default" @click.native.prevent="toggleVisible">{{ option }}</el-button>
    <el-button v-else type="text" size="small" @click.native.prevent="toggleVisible" :disabled="row.dicBelong === '0'">{{ option }}</el-button>
    <el-dialog
      :append-to-body="true"
      :title="option"
      width="360px"
      :visible="visible"
      @close="visible = false"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" label-width="60px">
        <el-form-item label="类别" prop="dicType" :rules="[{ required: true, message: '请选择类别' }]">
          <el-select size="small" v-model="form.dicType" placeholder="请选择类别" style="width: 100%;">
            <el-option label="用户类型" value="user_type"/>
            <el-option label="阀门类型" value="controller_type"/>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="dicValueName" :rules="[{ required: true, message: '请输入名称' }]">
          <el-input size="small" v-model="form.dicValueName" autocomplete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </span>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Operation',
  components: {},
  props: {
    row: {
      type: Object,
      default: () => ({
        dicType: '',
        dicValueName: ''
      }),
    },
    option: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visible: false,
      form: { ...this.row },
    };
  },
  computed: {
    ...mapGetters('userType', ['']),
  },
  methods: {
    ...mapActions('userType', ['Create', 'Update']),
    toggleVisible() {
      this.visible = !this.visible;
      this.form = { ...this.row };
      this.$nextTick(() => {
        if (this.visible) {
          this.$refs.form.clearValidate();
        }
      });
    },
    async create() {
      return await this.Create({ ...this.form });
    },
    async update() {
      return await this.Update({ ...this.form });
    },
    handleClose() {
      this.toggleVisible();
      this.$emit('close');
    },
    async handleConfirm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let result;
          if (this.option === '新增类型') {
            result = await this.create();
          }
          if (this.option === '编辑类型') {
            result = await this.update();
          }
          if (result) {
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
            this.handleClose();
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
