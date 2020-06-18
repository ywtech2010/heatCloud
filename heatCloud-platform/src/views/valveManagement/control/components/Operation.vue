<template>
  <span>
    <el-button v-if="option === '回水温度设置' || option === '阀门开度设置'"  size="small" type="default" @click.native.prevent="toggleVisible">{{ option }}</el-button>
    <el-button v-else type="text" size="small" @click.native.prevent="toggleVisible">{{ option }}</el-button>
    <el-dialog
      :append-to-body="true"
      :title="option"
      width="336px"
      :visible="visible"
      @close="visible = false"
      :close-on-click-modal="false"
    >
      <el-form size="small" ref="form" :model="form" label-width="auto" v-if="option === '回水温度设置'||option === '温度设置'">
        <el-form-item label="最小回水温度" prop="minOutTemperature" :rules="[{ required: true, message: '请输入最小回水温度' }]">
          <el-input :style="{width: '180px'}" size="small" v-model="form.minOutTemperature" autocomplete="off" placeholder="请输入最小回水温度">
            <span style="padding-right: 10px" slot="suffix">℃</span>
          </el-input>
        </el-form-item>
        <el-form-item label="最大回水温度" prop="maxOutTemperature" :rules="[{ required: true, message: '请输入最大回水温度' }]">
          <el-input :style="{width: '180px'}"  size="small" v-model="form.maxOutTemperature" autocomplete="off" placeholder="请输入最大回水温度">
            <span style="padding-right: 10px" slot="suffix">℃</span>
          </el-input>
        </el-form-item>
      </el-form>

     <el-form size="small" ref="form" :model="form" label-width="auto" v-if="option === '阀门开度设置'||option === '开度设置'">
        <el-form-item label="阀门开度：" prop="openPecent" :rules="[{ required: true, message: '请输入阀门开度' }]">
          <el-input :style="{width: '180px'}"  size="small" v-model="form.openPecent" autocomplete="off" placeholder="请输入阀门开度">
            <span style="padding-right: 10px" slot="suffix">%</span>
          </el-input>
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
import { valveControlSet } from "../vuex/api";

export default {
  name: 'Operation',
  components: {},
  props: {
    row: {
      type: Object,
      default: () => ({
        minOutTemperature: '',
        maxOutTemperature: '',
        openPecent:''
      }),
    },
    valveCodeList:{
      type: Array,
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
      // list:{...this.valveCodeList}
    };
  },
  computed: {
    ...mapGetters('controlList', ['']),
  },
  methods: {
    ...mapActions('controlList', ['Create', 'Update']),
    toggleVisible() {
        if (this.valveCodeList.length>0){
          this.visible = !this.visible;
          this.form = { ...this.row };
          this.$nextTick(() => {
            if (this.visible) {
              this.$refs.form.clearValidate();
            }
          });
        } else {
          this.$message.warning('请选择需要操作的数据');
        }

    },


    handleClose() {
      this.toggleVisible();
      this.$emit('close');
    },
    async handleConfirm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.option === '回水温度设置'||this.option === '温度设置') {
            let dic = {
              valveCodeList:this.valveCodeList,
              minOutTemperature:this.form.minOutTemperature,
              maxOutTemperature:this.form.maxOutTemperature,
              controlType:0
            }
            this.addControl(dic);
          }else if (this.option === '阀门开度设置'||this.option === '开度设置'){
            let dic = {
              valveCodeList:this.valveCodeList,
              openPecent:this.form.openPecent,
              controlType:1
            }
            this.addControl(dic);
          }

        } else {
          return false;
        }
      });
    },

    addControl(dic){

      valveControlSet(dic).then(res=>{
        this.$message.success('操作成功');
        this.handleClose();
      }).catch(()=>{

      })
    },
  },
};
</script>
<style lang="scss" scoped>
  /deep/.el-dialog__body {
    padding: 30px 24px 10px;
  }
</style>
