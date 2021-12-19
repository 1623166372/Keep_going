<template>
  <div class="Nav_box">
    <div class="nav_logo" @click="Change_isCollapse">
      <i :class="isCollapse ? 'el-icon-s-unfold' :'el-icon-s-fold'"></i>
    </div>
    <div class="nav_logo" @click="screen">
      <i class="el-icon-full-screen"></i>
    </div>
    <div class="nav_logo" @click="refresh">
      <i class="el-icon-refresh"></i>
    </div>

    <div class="nav_body">
      <!-- <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#fff"
        text-color="#5a5e66"
        active-text-color="#409EFF"
        >
        <el-menu-item index="2">
           <Tag></Tag>
        </el-menu-item>
      </el-menu>-->
    </div>
    <div class="nav_footer">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user-img" src="../../assets/image/user_img.png" />
          <span class="me">杨金山</span>
          <el-icon class="el-icon--right">
            <i class="el-icon-caret-bottom"></i>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <span class="me">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span class="me" @click="login_out()">退出系统</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      activeIndex: "1"
    };
  },
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    }
  },
  methods: {
    Change_isCollapse() {
      this.$store.commit("Change_isCollapse", !this.$store.state.isCollapse);
    },
    screen() {
      let _this = this;
      let el = document.documentElement;
      if (document.fullscreenElement === null) {
        _this.openFullscreen(el);
      } else {
        _this.quitFullscreen();
      }
    },
    openFullscreen(element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    quitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    },
    refresh() {
      this.$router.go(0);
    },
    login_out() {
      this.$router.replace("/login");
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
$height: 60px;
$width: 100%;
$background: #0747a6;
$color: #ecf5ff;
.Nav_box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: $height;
  width: $width;
  background-color: $background;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  color: $color;

  .me {
    color: $color;
  }
  .nav_logo {
    padding: 0 20px;
    height: $height;
    line-height: $height;
    cursor: pointer;

    .el-icon-s-unfold,
    .el-icon-s-fold,
    .el-icon-full-screen,
    .el-icon-refresh {
      font-size: 20px;
      font-weight: normal;
    }
  }
  .nav_body {
    display: flex;
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    overflow: auto;
    box-sizing: border-box;
    padding: 0px 20px;
    height: $height;
  }

  .nav_footer {
    padding: 0px 20px;
    height: $height;
    line-height: $height;

    .icon {
      font-size: 20px;
      margin-right: 30px;
    }
    .user-img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
}

:deep(.el-menu--horizontal > .el-menu-item) {
  border-bottom: 0px;
  font-size: 14px;
  font-weight: 600;
}
:deep(.el-menu--horizontal > .el-menu-item.is-active) {
  background: $background !important;
}
:deep(.el-icon-caret-bottom) {
  color: $color;
}
</style>
