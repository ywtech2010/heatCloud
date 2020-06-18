<template>
  <div class="login-container">
    <div class="title-container">
      <img :src="Asset.logo" alt="">
    </div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="login-title-wrap">
        <img :src="Asset.defaultLogo" class="default-logo" alt="">
        <div class="default-des">热力公司云管理平台</div>
      </div>
      <el-form-item prop="phone">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="phone"
          v-model="loginForm.phone"
          placeholder="请输入账号"
          name="phone"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password"
          :key="passwordType"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
        <div class="forget-password" @click="jumpToForgetPassword">忘记密码？</div>
      </el-form-item>
      <el-button
        :loading="loading"
        class="login-btn"
        type="primary"
        style="width:100%;"
        @click.native.prevent="handleLogin"
      >登录
      </el-button>
      <div class="clear-form-data" @click="handleClearFormData">清空重置</div>
    </el-form>
  </div>
</template>

<script>
import { isvalidPhone } from '@/utils/validate'
import { Asset } from '@/assets'

export default {
  name: 'Login',
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!isvalidPhone(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length > 16 || value.length < 6) {
        callback(new Error('请输入6-16位密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        phone: '',
        password: ''
      },
      loginRules: {
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      Asset: Asset
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const loginObj = {
            phone: this.loginForm.phone.trim(),
            password: this.loginForm.password.trim().MD5Encryption(32)
          };
          this.$store.dispatch('app/login', loginObj).then((res) => {
            this.$message({
              type: 'success',
              message: '登录成功',
            });
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    handleClearFormData() {
      this.$refs.loginForm.resetFields()
    },
    jumpToForgetPassword() {
      this.$router.push('forgetPassword')
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #333;
  $cursor: rgba(36, 110, 241, 1);

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 54px;
      width: 80%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 54px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px #fff inset !important;
          -webkit-text-fill-color: $light_gray !important;
        }
      }
    }

    .el-form-item {
      background: #fff;
      width: 300px;
      border: 1px solid rgba(204, 204, 204, 1);
      border-radius: 4px;
      color: #333;
      margin-bottom: 30px;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  $homeBg: rgba(240, 242, 245, 1);

  .login-container {
    min-height: 100%;
    background-color: $homeBg;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: auto;

    .login-form {
      position: absolute;
      width: 500px;
      height: 480px;
      padding: 24px 100px 0;
      border-radius: 20px;
      background: #fff;
      overflow: hidden;
      margin: 0 auto 91px;
      left: 0;
      right: 0;
      top: 378px;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: top;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;
      width: 100%;
      height: 540px;
      background: linear-gradient(254deg, rgba(18, 90, 217, 1), rgba(30, 175, 222, 1), rgba(36, 110, 241, 1));
      box-shadow: 3px 0 10px 0 rgba(18, 90, 217, 0.3);
      text-align: center;
      img {
        margin-top: 91px;
        width: 241px;
        height: 217px;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .login-btn {
      width: 300px;
      margin-top: 35px;
      /*background: linear-gradient(0deg, rgba(18, 90, 217, 1), rgba(36, 110, 241, 1));*/
      /*box-shadow: 3px 0px 10px 0px rgba(18, 90, 217, 0.3);*/
      background: #409EFF;
      /*border-radius: 17px;*/
      border-radius: 4px;
    }

    .login-title-wrap {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .default-logo {
        width: 70px;
        height: 70px;
        margin-bottom: 10px;
      }
      .default-des {
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        /*color: rgba(18, 90, 217, 1);*/
        color: #409EFF;
        line-height: 36px;
        margin-bottom: 20px;
      }
    }
    .forget-password {
      position: absolute;
      font-family: Microsoft YaHei;
      font-size: 12px;
      line-height: 36px;
      font-weight: 400;
      /*color: rgba(18, 90, 217, 1);*/
      color: #409EFF;
      width: 100%;
      text-align: right;
      cursor: pointer;
    }
    .clear-form-data {
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(252, 61, 57, 1);
      font-size: 12px;
      line-height: 36px;
      width: 100%;
      margin-top: 10px;
      text-align: center;
      cursor: pointer;
    }
  }
</style>
