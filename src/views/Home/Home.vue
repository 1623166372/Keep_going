<template>
  <div class="homebox">
    <el-container>
      <el-aside width="200px">
        <side-bar></side-bar>
      </el-aside>
      <el-container>
        <el-header>
          <Nav></Nav>
        </el-header>
        <el-main>
          <Tag></Tag>
          <div class="table-box">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Nav from "../../components/Layout/Nav";
import SideBar from "../../components/Layout/SideBar";
import Tag from "../../components/Layout/Tag";
export default {
  name: "home",
  components: {
    Nav,
    SideBar,
    Tag
  }
};
</script>

<style lang="scss" scoped>
.homebox {
  width: 100%;
  height: 100%;
}
.table-box {
  height: calc(100% - 40px);
}
:deep(.el-header) {
  padding: 0px 0px;
}
:deep(.el-aside) {
  height: 100vh;
  width: auto !important;
  background-color: #f2f3f4;
  padding: 0px;
}
:deep(.el-main) {
  background-color: #f1f2f6;
  padding: 0px 20px 20px 20px !important;
}
</style>
