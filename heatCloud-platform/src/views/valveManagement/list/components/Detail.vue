<template>
  <div class="detail">
    <el-button type="text" size="small" @click.native.prevent="toggleVisible">详情</el-button>
    <el-dialog
      :append-to-body="true"
      title="详情"
      :visible.sync="visible"
      width="50%"
    >
      <div class="detail-items">
        <el-row class="item">
          <el-col :span="12">
            <span class="detail-label">阀门序列号：</span>
            <span class="detail-value">{{ valveBaseInfo.code?valveBaseInfo.code:'/' }}</span>
          </el-col>
          <el-col :span="12">
            <span class="detail-label">阀门地址：</span>
            <span class="detail-value">{{valveBaseInfo.address?valveBaseInfo.address:'/' }}</span>
          </el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="12">
            <span class="detail-label">进水温度：</span>
            <span class="detail-value">{{ valveStatusInfo.inTemperature?valveStatusInfo.inTemperature:'/' }}</span>
          </el-col>
          <el-col :span="12">
            <span class="detail-label">回水温度：</span>
            <span class="detail-value">{{valveStatusInfo.outTemperature?valveStatusInfo.outTemperature:'/' }}</span>
          </el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="12">
            <span class="detail-label">进回水温度差：</span>
            <span class="detail-value">{{ valveStatusInfo.departTemperature?valveStatusInfo.departTemperature:'/'}}</span>
          </el-col>
          <el-col :span="12">
            <span class="detail-label">室内温度：</span>
            <span class="detail-value">{{ valveStatusInfo.indoorTemperature?valveStatusInfo.indoorTemperature:'/' }}</span>
          </el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="12">
            <span class="detail-label">阀门开度：</span>
            <span class="detail-value">{{valveStatusInfo.openPecent?valveStatusInfo.openPecent:'/'}}</span>
          </el-col>
          <el-col :span="12">
            <span class="detail-label">阀门压力：</span>
            <span class="detail-value"></span>
          </el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="12">
            <span class="detail-label">开阀累计时间：</span>
            <span class="detail-value">{{valveStatusInfo.totalTime?valveStatusInfo.totalTime:'/' }}</span>
          </el-col>
          <el-col :span="12">
            <span class="detail-label">集中器序列号：</span>
            <span class="detail-value">{{ valveBaseInfo.concentratorCode?valveBaseInfo.concentratorCode:'/' }}</span>
          </el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="12">
            <span class="detail-label">授权限制时间：</span>
            <span class="detail-value"></span>
          </el-col>
          <el-col :span="12">
            <span class="detail-label">采集时间：</span>
            <span class="detail-value">{{valveStatusInfo.collectDate|formaTime}}</span>
          </el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="12">
            <span class="detail-label">阀门硬件版本：</span>
            <span class="detail-value">{{valveStatusInfo.hardwareVersion?valveStatusInfo.hardwareVersion:'/' }}</span>
          </el-col>
          <el-col :span="12">
            <span class="detail-label">阀门软件版本：</span>
            <span class="detail-value">{{valveStatusInfo.softVersion?valveStatusInfo.softVersion:'/' }}</span>
          </el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="12">
            <span class="detail-label">升级状态：</span>
            <span class="detail-value">{{valveStatusInfo.payStatus?valveStatusInfo.payStatus:'/' }}</span>
          </el-col>
          <el-col :span="12">
            <span class="detail-label">升级时间：</span>
            <span class="detail-value">{{valveStatusInfo.updateDate|formaTime }}</span>
          </el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="12">
            <span class="detail-label">阀门绑定状态：</span>
            <span class="detail-value">{{ valveStatusInfo.status?valveStatusInfo.status:'/' }}</span>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';
  import { detailValve } from "../vuex/api";
  import { formatDate } from '@/utils'

  export default {
  name: 'Detail',
  components: {},
  props: {
    row: {
      type: Object,
      default: () => ({
        code:''
      }),
    },
  },
  data() {
    return {
      visible: false,
      valve:{...this.row},
      valveBaseInfo:{},
      valveStatusInfo:{}
    };
  },
    computed: {
      ...mapGetters('valveList', ['']),
    },
    filters: {
      formaTime(time) {
        if (time){
          return formatDate.convertTime(time, "yyyy-MM-dd HH:mm:ss");
        }else {
          return '/';
        }
      }
    },
  methods: {
    ...mapActions('valveList', []),
    toggleVisible() {
      this.visible = !this.visible;
      this.order = { ...this.row };
      this.init();
      this.$nextTick(() => {
        if (this.visible) {
          // this.$refs.form.clearValidate();
        }
      });
    },

    init(){
      console.log(this.order)
      detailValve(this.order.code).then(res=>{
        this.valveBaseInfo = res['valveBaseInfo'];
        this.valveStatusInfo = res['valveStatusInfo'];

      }).catch(()=>{

      });
    },

    handleClose() {
      this.toggleVisible();
      this.$emit('close');
    },
  },
};

</script>
<style lang="scss">
.detail {
  &-items {
    .item {
      margin-bottom: 20px;
      padding: 0 24px;
    }
  }
}
</style>
