<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <ScreenFull class="right-menu-item hover-effect" />
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="Assets.avatar" class="user-avatar">
          <span class="user-name">{{userInfo.name}}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!--<router-link to="/">-->
          <!--<el-dropdown-item>-->
          <!--Home-->
          <!--</el-dropdown-item>-->
          <!--</router-link>-->
          <!--<a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">-->
          <!--</a>-->
          <el-dropdown-item @click.native="showPersonalCenter">
            <span>个人中心</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ScreenFull from '@/components/ScreenFull'
import { Asset } from '@/assets'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ScreenFull
  },
  data() {
    return {
      isShow: false,
      Assets: Asset
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'userInfo'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('app/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    showPersonalCenter() {
      this.$store.dispatch('app/changeCurrentActivePath', '/dashboard');
      this.$router.push( `/personalCenter`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    /*overflow: hidden;*/
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color:transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;
      display: flex;
      flex-direction: row;
      align-items: center;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;
        margin-left: 10px;

        .avatar-wrapper {
          /*margin-top: 5px;*/
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          cursor: pointer;

          .user-avatar {
            width: 32px;
            height: 32px;
            border-radius: 16px;
            display: block;
          }

          .user-name {
            font-family: Microsoft YaHei;
            font-size: 14px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            margin-left: 5px;
            display: block;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
