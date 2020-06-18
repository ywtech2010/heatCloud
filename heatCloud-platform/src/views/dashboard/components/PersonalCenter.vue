<template>
  <CommonContainer :bgColor="'gray'" class="personal-center-wrap">
    <div slot="common" class="center-container">
      <div class="center-head">
        <img class="center-avatar" :src="Asset.avatar" alt="">
        <div class="login-time">上次登录时间：{{userInfo.lastLogin || '首次登录'}}</div>
      </div>
      <div class="center-form">
        <el-form
          ref="fixRef"
          :label-position="labelPosition"
          :rules="fixRules"
          :model="fixFormData"
          name="fixForm"
          size="small"
          label-width="90px"
        >
          <el-form-item label="当前密码" prop="currentPassword">
            <el-input
              v-model="fixFormData.currentPassword"
              type="password"
              placeholder="6-16位字符，区分大小写"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="fixFormData.newPassword"
              type="password"
              placeholder="6-16位字符，区分大小写"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              v-model="fixFormData.confirmPassword"
              type="password"
              placeholder="再次输入新密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn-group">
        <el-button class="confirm-btn" @click="submitPassword">确认</el-button>
        <el-button class="cancel-btn" @click="closePersonalCenter">取消</el-button>
      </div>
    </div>
  </CommonContainer>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { Asset } from '@/assets'
  import { passwordReg } from '@/utils'
  import CommonContainer from '@/components/GlobalComponents/CommonContainer'

  export default {
    name: 'PersonalCenter',
    components: {
      CommonContainer
    },
    data() {
      return {
        Asset: Asset,
        labelPosition: 'top',
        fixFormData: {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        fixRules: {
          currentPassword: [{ required: true, trigger: 'blur', validator: this.validatePassword }],
          newPassword: [{ required: true, trigger: 'blur', validator: this.validatePassword }],
          confirmPassword: [{ required: true, trigger: 'blur', validator: this.validateConfirmPassword }]
        }
      }
    },
    computed:{
      ...mapGetters(['userInfo'])
    },
    methods: {
      ...mapActions('app', ['updateEditPwd']),
      closePersonalCenter() {
        this.$store.dispatch('app/changeCurrentActivePath', '/dashboard');
        this.$router.push( `/dashboard`)
      },
      submitPassword() {
        const updateForm = {
          newPassword: this.fixFormData.newPassword.trim().MD5Encryption(32),
          oldPassword: this.fixFormData.currentPassword.trim().MD5Encryption(32),
          phone: this.userInfo.phone
        };
        this.$refs.fixRef.validate(valid => {
          if (valid) {
            this.updateEditPwd(updateForm).then(async res => {
              this.$message({
                type: 'success',
                message: '成功修改密码，请重新登录'
              });
              await this.$store.dispatch('app/logout')
              this.$router.push({
                path: 'login',
                query: {
                  redirect: 'dashboard'
                }
              })
            })
          } else {
            this.$message({
              type: 'warning',
              message: '请按照正确格式输入内容'
            })
          }
        })
      },
      validatePassword(rule, value, callback) {
        if (!passwordReg.test(value)) {
          callback(new Error('请输入6-16位格式的密码'))
        } else {
          callback()
        }
      },
      validateConfirmPassword(rule, value, callback) {
        if (value !== this.fixFormData.newPassword) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
    }
  }
</script>

<style lang="scss">
  .personal-center-wrap {
    .el-button {
      width: 65px;
      height: 32px;
      line-height: 32px;
      padding: 0;
      text-align: center;
    }
    .center-form {
      .el-form-item {
        position: relative;
        margin-bottom: 0;
        width: 400px;
      }
      .el-input {
        height: 50px;
        input {
          height: 50px;
          line-height: 50px;
        }
      }
      .el-form-item__label {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #030303;
        line-height: 36px;
        padding-bottom: 0;
        margin-top: 20px;
        margin-bottom: 5px;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .personal-center-wrap {
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .center-head {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .center-avatar {
      width: 150px;
      height: 150px;
      margin-bottom: 30px;
    }
    .login-time {
      font-size:14px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(3,3,3,1);
      line-height:22px;
    }
    .btn-group {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-top: 40px;
    }
    .confirm-btn {
      background: #409EFF;
      color: #fff;
      border: solid 1px #409EFF;
    }
  }

</style>
