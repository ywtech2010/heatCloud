<template>
  <span>
    <el-button v-if="option === '换热站添加'" size="small" type="default" @click.native.prevent="toggleVisible">{{ option }}</el-button>
    <el-button v-if="option === '收费标准维护'" size="small" type="default" @click.native.prevent="toggleVisible">{{ option }}</el-button>
    <el-button v-if="option === '批量时间设置'" size="small" type="default" @click.native.prevent="toggleVisible">{{ option }}</el-button>
    <!--<el-button v-else type="text" size="small" @click.native.prevent="toggleVisible">{{ option }}</el-button>-->
    <el-dialog
      :append-to-body="true"
      :title="option"
      width="40%"
      :visible="visible"
      @close="visible = false"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="换热站名称" prop="stationName" :rules="[{ required: true, message: '请输入换热站名称' }]">
          <el-input size="small" v-model="form.stationName" autocomplete="off" placeholder="请输入换热站名称"></el-input>
        </el-form-item>
        <el-form-item label="小区名称" prop="desp" :rules="[{ required: true, message: '请输入名称' }]">
          <el-input placeholder="请输入" :v-model="form.desp"></el-input>
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

const namespace = 'exchangeList';


export default {
  name: 'Operation',
  components: {},
  props: {
    row: {
      type: Object,
      default: () => ({
        name: '',
        phone: '',
        desp: '',
        stationName:''
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
  mounted() {

  },

  methods: {
    ...mapActions('authList', ['Create', 'Update']),

    init() {
      this.$store.dispatch(`${namespace}/addHeatState`, this.form)
    },

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
          if (this.option === '换热站添加') {
            // this.init();
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
