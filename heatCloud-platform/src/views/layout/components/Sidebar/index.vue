<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="currentActivePath || $route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      @select="handleSelect"
      mode="vertical"
    >
      <div class="system-label">
        <img :src="Asset.mainTopLogo" alt="">
        <span v-show="!isCollapse">后台管理平台</span>
      </div>
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import { Asset } from '@/assets'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  data() {
    return {
      Asset: Asset
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'currentActivePath'
    ]),
    routes() {
      return this.$router.options.routes
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    handleSelect(router) {
      this.$store.dispatch('app/changeCurrentActivePath', `${router}`);
    }
  }
}
</script>

<style lang="scss" scoped>
  .system-label {
    width: 240px;
    transition: width 0.28s;;
    height: 70px;
    padding-left: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      width: 34px;
      height: 34px;
    }
    span {
      font-size:18px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
      margin-left: 14px;
    }
  }
</style>
