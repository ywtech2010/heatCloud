<!--忘记密码-->
<template>
  <div class="wrap">
    <div class="header">
      <div class="forget-wrap" @click="backLogin">
        <img :src="Asset.backArrow" class="back-img" alt="">
        <span class="back-text">返回</span>
      </div>
    </div>
    <div class="content-wrap">
      <div class="content">
        <div class="content-step">
          <el-steps :active="stepNumber" finish-status="success" simple style="width: 773px;margin: 0 auto">
            <el-step title="确认账号" />
            <el-step title="重置密码" />
            <el-step title="重置成功" />
          </el-steps>
        </div>
        <div class="container">
          <div v-if="stepNumber === 0" class="step-phone">
            <el-form
              ref="phoneRef"
              :model="phoneFormData"
              :rules="phoneRules"
              name="phoneForm"
            >
              <el-form-item prop="phone">
                <el-input
                  ref="phone"
                  v-model="phoneFormData.phone"
                  placeholder="输入绑定的手机号"
                  type="text"
                />
              </el-form-item>
            </el-form>
            <el-button
              class="next-btn first-btn"
              type="primary"
              style="width:100%;"
              @click.native.prevent="handleNextStep(stepNumber)"
            >下一步
            </el-button>
          </div>
          <div v-show="stepNumber === 1" class="step-fix">
            <el-form
              ref="fixRef"
              :label-position="labelPosition"
              :rules="fixRules"
              :model="fixFormData"
              name="fixForm"
              label-width="80px"
            >
              <el-form-item label="新密码" prop="newPassword">
                <el-input
                  v-model="fixFormData.newPassword"
                  type="password"
                  placeholder="6-16位字符，区分大小写"
                />
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input
                  v-model="fixFormData.confirmPassword"
                  type="password"
                  placeholder="再次输入新密码"
                />
              </el-form-item>
              <el-form-item label="验证码" prop="verifyCode">
                <el-input
                  v-model="fixFormData.verifyCode"
                  placeholder="输入验证码"
                >
                  <span slot="suffix" class="send-code" @click="handleSendCode">{{ codeText }}</span>
                </el-input>
                <div class="fix-phone">
                  <span>{{ phone }}</span>
                  <span class="fix-phone-update" @click="openUpdateMobile">修改</span>
                </div>
                <div v-if="isSend" class="verify-code-tip">验证码短信/邮箱已发出，5分钟内有效，请注意查收。</div>
                <div v-if="!isSend" class="verify-code-tip" style="height: 36px" />
              </el-form-item>
            </el-form>
            <el-button
              :loading="submitLoading"
              class="next-btn second-btn"
              type="primary"
              style="width:100%;"
              @click.native.prevent="handleNextStep(stepNumber)"
            >确认修改
            </el-button>
          </div>
          <div v-if="stepNumber === 2" class="step-success">
            <div class="success-tip">密码重置成功</div>
            <div class="success-countdown">
              <span class="countdown-count">{{ countdown }}s</span>后跳转至登录页
            </div>
            <el-button
              class="next-btn third-btn"
              type="primary"
              style="width:100%;"
              @click.native.prevent="handleNextStep(stepNumber)"
            >前往登录页
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Asset } from '@/assets'
import { mobileReg, passwordReg } from '@/utils'

export default {
  name: 'ForgetPassword',
  data() {
    return {
      Asset: Asset,
      phone: '',
      stepNumber: 0,
      submitLoading: false,
      labelPosition: 'top',
      isSend: false,
      nCount: 60,
      countdown: 15,
      codeText: '获取验证码',
      fixFormData: {
        newPassword: '',
        confirmPassword: '',
        verifyCode: ''
      },
      phoneFormData: {
        phone: ''
      },
      phoneRules: {
        phone: [{ required: true, trigger: 'blur', validator: this.validateMobile }]
      },
      fixRules: {
        newPassword: [{ required: true, trigger: 'blur', validator: this.validatePassword }],
        confirmPassword: [{ required: true, trigger: 'blur', validator: this.validateConfirmPassword }],
        verifyCode: [{ required: true, trigger: 'blur', validator: this.validateVerifyCode }]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.phone.focus();
    })
  },
  methods: {
    ...mapActions('app', ['getVerifyCode', 'updatePwd']),
    async handleNextStep(step) {
      switch (step) {
        case 0:
          if (!mobileReg.test(this.phoneFormData.phone)) {
            return false
          } else {
            this.replacePhoneNo()
            this.stepNumber++
          }
          break
        case 1:
          const updateForm = {
            code: this.fixFormData.verifyCode.trim(),
            password: this.fixFormData.newPassword.trim().MD5Encryption(32),
            phone: this.phoneFormData.phone.trim()
          }
          this.$refs.fixRef.validate(valid => {
            if (valid) {
              this.updatePwd(updateForm).then(res => {
                this.stepNumber++
                var backLogin = null
                backLogin = setInterval(() => {
                  this.countdown--
                  if (this.countdown <= 0) {
                    clearInterval(backLogin)
                    this.$router.push('login')
                  }
                }, 1000)
              })
            } else {
              this.$message({
                type: 'warning',
                message: '请按照正确格式输入内容'
              })
            }
          });
          break
        case 2:
          await this.$store.dispatch('app/logout')
          this.$router.push({
            path: 'login',
            query: {
              redirect: 'dashboard'
            }
          })
          break
      }
    },
    async backLogin() {
      await this.$store.dispatch('app/logout')
      this.$store.dispatch('app/changeCurrentActivePath', '/dashboard');
      this.$router.push({
        path: 'login',
        query: {
          redirect: 'dashboard'
        }
      })
    },
    replacePhoneNo() {
      const myPhone = this.phoneFormData.phone.substr(3, 4)
      const oldPhone = this.phoneFormData.phone
      this.phone = oldPhone.replace(myPhone, '****')
    },
    openUpdateMobile() {
      this.$prompt('请输入手机号码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: mobileReg,
        inputErrorMessage: '请输入正确格式的手机号码'
      }).then(({ value }) => {
        this.phoneFormData.phone = value
        this.replacePhoneNo()
      }).catch(() => {
      })
    },
    validateMobile(rule, value, callback) {
      if (!mobileReg.test(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
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
    validateVerifyCode(rule, value, callback) {
      if (!/^\d{6}$/.test(value)) {
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    },
    handleSendCode() {
      if (!passwordReg.test(this.fixFormData.newPassword)) {
        this.$message({
          type: 'warning',
          message: '请输入6-16位含有字符/数字的新密码'
        });
        return;
      }
      if (!passwordReg.test(this.fixFormData.confirmPassword)) {
        this.$message({
          type: 'warning',
          message: '请输入正确格式的确认密码'
        });
        return;
      }
      if (this.isSend) {
        return
      }
      const that = this
      this.isSend = true
      const timer = setInterval(countDown, 1000)

      function countDown() {
        that.nCount--
        if (that.nCount <= 0) {
          that.isSend = false
          that.nCount = 60
          clearInterval(timer)
          that.codeText = '重新获取'
        } else {
          that.codeText = that.nCount + '秒'
        }
      }
      this.getVerifyCode(this.phoneFormData.phone).then(res => {
        this.$message.success('验证码发送成功')
      });
    }
  }
}
</script>

<style lang="scss">
  .wrap {
    .el-steps--simple {
      padding: 16px 80px;
    }
    .content-step {
      .is-process {
        font-weight: 400;
        /*color: rgba(18, 90, 217, 1);*/
        color: #409EFF;
        .is-text {
          /*border-color: rgba(18, 90, 217, 1);*/
          border-color: #409EFF;
        }
      }
    }
    .container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .el-input {
        height: 50px;
        input {
          height: 50px;
          line-height: 50px;
        }
      }
      .step-phone {
        .el-input {
          width: 400px;
          height: 53px;
          margin-top: 130px;
        }
      }
      .step-fix {
        margin-top: 72px;
        .el-form-item {
          position: relative;
          margin-bottom: 0;
        }
        .el-form-item__label {
          font-size: 14px;
          line-height: 36px;
          padding-bottom: 0;
          margin-top: 30px;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .wrap {
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    .header {
      width: 100%;
      height: 80px;
      background: #fff;
      .forget-wrap {
        cursor: pointer;
        height: 80px;
        width: 100px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding-left: 20px;
        .back-img {
          width: 24px;
          height: 24px;
        }
        .back-text {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          /*color: rgba(18, 90, 217, 1);*/
          color: #409EFF;
          line-height: 36px;
          margin-left: 8px;
        }
      }

    }
    .content-wrap {
      background: #f0f2f5;
      padding: 20px;
      flex: 1;
      position: relative;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      flex-direction: column;
      .content {
        background: #fff;
        flex: 1;
        padding-top: 120px;
      }
      .container {
        .step-phone {
          display: flex;
          flex-direction: column;
        }
        .next-btn {
          width: 400px !important;
          margin-top: 80px;
          /*background: linear-gradient(0deg, rgba(18, 90, 217, 1), rgba(36, 110, 241, 1));*/
          /*box-shadow: 3px 0px 10px 0px rgba(18, 90, 217, 0.3);*/
          background: #409EFF;
          /*border-radius: 17px;*/
          border-radius: 4px;
        }
        .first-btn {
          margin-top: 80px;
        }
        .second-btn {
          margin-top: 80px;
        }
        .third-btn {
          margin-top: 68px;
        }
        .fix-phone {
          position: absolute;
          right: 0;
          top: -36px;
          display: flex;
          flex-direction: row;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 36px;
          .fix-phone-update {
            margin-left: 24px;
            /*color: rgba(18, 90, 217, 1);*/
            color: #409EFF;
            cursor: pointer;
          }
        }
        .verify-code-tip {
          position: absolute;
          left: 0;
          bottom: -45px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          /*line-height: 36px;*/
        }
        .send-code {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          /*color: rgba(18, 90, 217, 1);*/
          color: #409EFF;
          line-height: 50px;
          padding-right: 14px;
          cursor: pointer;
        }
        .success-tip {
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          line-height: 36px;
          margin-top: 88px;
          margin-bottom: 10px;
          text-align: center;
        }
        .success-countdown {
          text-align: center;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #999;
          line-height: 36px;
        }
        .countdown-count {
          /*color: #125AD9;*/
          color: #409EFF;
        }
      }
    }
  }
</style>
