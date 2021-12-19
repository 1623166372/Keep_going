<template>
  <div id="app">
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script>
// elementui-plus中文
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

export default {
  name: "App",
  components: {
    ElConfigProvider
  },
  setup() {
    return {
      locale: zhCn
    };
  }
};
</script>

