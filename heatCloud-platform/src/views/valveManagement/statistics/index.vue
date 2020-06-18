<template>
  <g-container>
    <div slot="content"  class="statistics-wrap">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="开阀/关阀统计" name="switchReport">
          <Malfunction />
        </el-tab-pane>
        <el-tab-pane label="正常/故障统计" name="malfunction">
          <SwitchReport />
        </el-tab-pane>
      </el-tabs>
    </div>
  </g-container>
</template>

<script>
export default {
  name: 'Statistics',
  components: {
    GContainer: () => import('@/components/GlobalComponents/GContainer'),
    Malfunction: () => import('./malfunction'),
    SwitchReport: () => import('./switchReport'),
  },
  props: {},
  data() {
    return {
      activeName: 'switchReport',
    };
  },
  computed: {},

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped>
  .statistics-wrap {
    padding: 25px 25px 0;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    .el-tabs {
      height: 100%;
      display: flex;
      flex-direction: column;
      /deep/.el-tabs__content {
        flex: 1;
      }
    }
  }
</style>
