<template>
  <div class="Tag_box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item,index) in list"
        :key="index"
        :to="{path:item.path}"
      >{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      list: []
    };
  },
  watch: {
    $route() {
      this.bread();
    }
  },
  methods: {
    bread() {
      let matched = this.$route.matched.filter(item => item.name);
      let first = matched[0];
      if (first && first.name !== "首页") {
        // 我在这里是判断的是name，渲染的是name
         matched = [{ path: "/home", name: "首页" }].concat(matched);
      }
      this.list = matched;
    }
  },
  created() {
    this.bread();
  }
};
</script>

<style lang="scss" scoped>
.Tag_box{
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
// :deep(.el-breadcrumb__inner.is-link){
//   color: #026ee6 !important;
// }
</style>
