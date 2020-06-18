<template>
  <span style="display: inline-block;">
    <div v-if="option === '管理员添加'" class="opt">
      <el-button size="small" type="default" @click.native.prevent="toggleVisible">{{ option }}</el-button>
    </div>
    <el-button v-else type="text" size="small" @click.native.prevent="toggleVisible">{{ option }}</el-button>
    <el-dialog
      :append-to-body="true"
      :title="option"
      width="40%"
      :visible="visible"
      @close="visible = false"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="名称" prop="name" :rules="[{ required: true, message: '请输入名称' }]">
          <el-input size="small" v-model="form.name" autocomplete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone" :rules="[{ required: true, message: '请输入联系方式' }]">
          <el-input size="small" v-model="form.phone" autocomplete="off" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input size="small" v-model="form.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item v-if="option !== '管理员添加'" label="数据同步秘钥" prop="email">
          <div style="display: flex; justify-content: space-between;">
            <el-input
              disabled
              size="small"
              v-model="form.email"
              autocomplete="off"
              placeholder="请输入邮箱"
            ></el-input>
            <el-button style="margin-left: 10px" type="text" size="small">生 成</el-button>
          </div>
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
        loginId: '',
        username: '',
        businessName: '',
        deptId: '',
        email: '',
        mobile: '',
        tel: '',
        status: null,
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
    ...mapGetters('authList', ['']),
  },
  methods: {
    ...mapActions('authList', ['Create', 'Update']),
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
          if (this.option === '管理员添加') {
            result = await this.create();
          }
          if (this.option === '编辑') {
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
