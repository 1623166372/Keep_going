<template>
  <div>
    <el-dialog title="详情" @close="closeDig()" v-model="visible" width="800px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="服务单号:">
          <el-input v-model="form.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="申请时间:">
          <el-input v-model="createTime" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="退款金额:">
          <el-input v-model="form.productRealPrice" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="申请状态:">
          <el-input v-model="status" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="处理时间:">
          <el-input v-model="handleTime" autocomplete="off" disabled></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDig()" icon="el-icon-close">取消</el-button>
          <el-button type="primary" @click="closeDig()" icon="el-icon-check">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import * as Details from "../api";
export default {
  name: "KeepGoingDetails",
  data() {
    return {
      visible: this.details_show,
      form: {}
    };
  },
  props: {
    details_show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    details_show(newval) {
      this.visible = newval;
    }
  },
  computed: {
    createTime() {
      if (this.form.createTime) {
        return this.$moment(this.form.createTime).format("YYYY-MM-DD ");
      } else {
        return "";
      }
    },
    handleTime() {
      if (this.form.handleTime) {
        return this.$moment(this.form.handleTime).format("YYYY-MM-DD ");
      } else {
        return "";
      }
    },
    status() {
      if (this.form.status == "0") {
        return "待处理";
      }
      if (this.form.status == "1") {
        return "退货中";
      }
      if (this.form.status == "2") {
        return "已完成";
      } else {
        return "已拒绝";
      }
    }
  },
  methods: {
    geDetails(id) {
      let that = this;
      Details.get_Details(id).then(res => {
        if (res.data) {
          that.form = res.data;
        } else {
          that.form = {};
        }
      });
    },
    closeDig() {
      this.$emit("closeDig", "details");
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
:deep(.el-input.is-disabled .el-input__inner) {
  border: none;
  background: none;
}
:deep(.el-textarea.is-disabled .el-textarea__inner) {
  border: none;
  background: none;
}
</style>