<template>
  <g-container>
    <div slot="content" class="common-content">
      <div class="wrap-info-icon">
         <img class="info-logo" :src="infoForm.logo" alt />
      </div>
      <div class="wrap-info-form">
        <el-form
          ref="infoForm"
          :model="infoForm"
          :rules="rules"
          label-width="auto"
          class="demo-infoForm">
          <el-form-item label="公司名称" prop="name">
            <el-input v-model="infoForm.name" size="medium" />
          </el-form-item>
          <el-form-item label="公司账号" prop="account">
            <el-input v-model="infoForm.account" size="medium" readonly />
          </el-form-item>
          <el-form-item label="单位电话" prop="phone">
            <el-input v-model="infoForm.phone" size="medium" />
          </el-form-item>
          <el-form-item label="公司地址" prop="address">
            <el-input v-model="infoForm.address" size="medium" />
          </el-form-item>
          <el-form-item label="公司介绍" prop="introduce">
            <el-input v-model="infoForm.introduce" size="medium" type="textarea" :style="{height: '150px'}"/>
          </el-form-item>
          <div style="text-align: center;">
            <el-button
              size="small"
              type="primary"
              @click="submitForm('infoForm')">确定</el-button>
            <el-button size="small" @click="resetForm('infoForm')">重置</el-button>
          </div>
        </el-form>
      </div>
    </div>

  </g-container>
</template>

<script>
  import { mapActions, mapGetters} from 'vuex'
export default {
  name: 'InformationSetting',
  components: {
    GContainer: () => import('@/components/GlobalComponents/GContainer'),
  },
  props: {},
  data() {
    return {
      infoForm: {
        logo: '',
        id: '',
        name: '',
        account: '',
        phone: '',
        address: '',
        introduce: '',
      },
      rules: {
        name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        account: [{ required: true, message: '请输入公司账号', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入公司电话', trigger: 'blur' }],
        address: [{ required: true, message: '请输入公司地址', trigger: 'blur' }],
      },
    };
  },
  computed: {

  },
  mounted() {
    this.GetInfo({}).then(res => {
      this.infoForm= {
        ...res
      }
    });
  },
  methods: {
    ...mapActions('info', ['GetInfo', 'UpdateInfo']),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.UpdateInfo(this.infoForm).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功',
            })
          });
        } else {
          this.$message({
            type: 'warning',
            message: '请填写企业相关信息',
          })
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
  .wrap-info {
    &-icon {
      display: block;
      width: 120px;
      height: 120px;
      margin: 160px auto 40px;
      .info-logo {
        width: 120px;
        height: 120px;
        border: 1px solid #dbdfe6;
      }
    }
    &-form {
      width: 480px;
      margin: 0 auto;
    }
  }
  /deep/.el-textarea__inner {
    height: 150px;
  }
</style>
