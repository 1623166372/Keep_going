<template>
  <div>
    <el-dialog title="详情" @close="closeDig()" v-model="visible" width="800px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="订单编号:" >
            <el-input v-model="form.orderSn" autocomplete="off" disabled></el-input>
        </el-form-item>
       <el-form-item label="支付方式:" >
           <el-input v-model="payType" autocomplete="off" disabled></el-input>
      </el-form-item>
       <el-form-item label="支付时间:" >
           <el-input v-model="form.createTime" autocomplete="off" disabled></el-input>
      </el-form-item>
         <el-form-item label="订单来源:" >
           <el-input v-model="sourceType" autocomplete="off" disabled></el-input>
      </el-form-item>
         <el-form-item label="订单状态:" >
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
    sourceType() {
      if(this.form.sourceType=='1'){
         return 'APP订单'
      }
      else{
        return ''
      }
    },
    payType(){
       if(this.form.payType=='0'){
         return '未支付'
      }
       if(this.form.payType=='1'){
         return '支付宝'
      }
      else{
        return '微信'
      }
    },
   status(){
     if(this.form.status=='0'){
         return '待付款'
      }
     if(this.form.status=='1'){
         return '待发货'
      }
       if(this.form.status=='2'){
         return '已发货'
      }
       if(this.form.status=='3'){
         return '已完成'
      }
      else{
        return '已关闭'
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