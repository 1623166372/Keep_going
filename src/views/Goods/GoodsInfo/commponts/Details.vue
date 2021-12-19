<template>
  <div>
    <el-dialog title="详情" @close="closeDig()" v-model="visible" width="800px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="商品编号:" >
            <el-input v-model="form.id" autocomplete="off" disabled></el-input>
        </el-form-item>
       <el-form-item label="商品名称:" >
           <el-input v-model="form.name" autocomplete="off" disabled></el-input>
      </el-form-item>
       <el-form-item label="销量" >
           <el-input v-model="form.usePointLimit" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="审核状态:" >
           <el-input v-model="status" autocomplete="off" disabled></el-input>
      </el-form-item>
       <el-form-item label="描述" >
        <el-input
        type="textarea"
        v-model="form.promotionInfo"
        disabled
        maxlength="500"
        show-word-limit
        :autosize="{ minRows: 3, maxRows: 6 }"
        resize="none"
        >
        </el-input>
      </el-form-item>
    </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDig()" icon="el-icon-close">取消</el-button>
          <el-button type="primary" @click="closeDig()"  icon="el-icon-check">确定</el-button>
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
        form:{}
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
    
   status(){
     if(this.form.verifyStatus=='0'){
         return '未审核'
      }
      else{
        return '审核通过'
      }
    }
  },
  methods: {
    geDetails(id){
    let that=this
     Details.get_Details(id).then(res => {
         if(res.data){
          that.form=res.data
         }
         else{
            that.form={} 
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
:deep(.el-input.is-disabled .el-input__inner){
  border: none;
  background: none;
}
:deep(.el-textarea.is-disabled .el-textarea__inner){
  border: none;
  background: none;
}
</style>