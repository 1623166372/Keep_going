<template>
  <div class="table-container" v-cloak>
    <!--  查询条件-->
    <div class="table-header">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input placeholder="请输入订单编号" v-model="SeachParams.orderSn" @keyup.enter="selectall"></el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="SeachParams.status" placeholder="请选择订单状态" @change="selectall">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item.lable"
            :value="item.value">
          </el-option>
        </el-select>
        </el-col>
        <el-col :span="6">
          <el-button icon="el-icon-search" @click="selectall">查询</el-button>
          <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
          <el-button type="primary" @click="addClick()" icon="el-icon-plus">新增</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 表格 -->
    <div class="table-body">
      <el-table
        :data="tableData"
        border
        v-loading="isloading"
        stripe
        element-loading-text="加载中"
        empty-text="暂无数据"
      >
        <!-- <el-table-column 
        type="selection"
         width="55" > 
        </el-table-column>-->
        <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
        <el-table-column label="订单编号" show-overflow-tooltip align="center">
          <template #default="scope">
            <span class="primary" @click.stop="details(scope.row.id)">{{scope.row.orderSn}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="memberUsername"
          label="用户账号"
          :show-overflow-tooltip="true"
          align="center"
         >
        </el-table-column>
         <el-table-column  label="支付方式" :show-overflow-tooltip="true" align="center">
            <template #default="scope">
           <span >{{scope.row.payType=='0' ?'未支付':scope.row.payType=='1' ? '支付宝':'微信' }}</span>
            </template>
        </el-table-column>
        <el-table-column label="支付时间" show-overflow-tooltip align="center">
          <template #default="scope">
            <i class="el-icon-timer"></i>
            <span
              style="margin-left: 10px"
              v-if="scope.row.createTime"
            >{{ this.$moment(scope.row.createTime).format("YYYY-MM-DD ") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单来源" :show-overflow-tooltip="true" align="center">
          <template #default="scope">
            <span >{{ scope.row.sourceType=='1'?'APP订单':''}}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" :show-overflow-tooltip="true" align="center">
          <template #default="scope">
            <span >{{scope.row.status=='0' ?'待付款':scope.row.status=='1' ?'待发货':scope.row.status=='2' ? '已发货': scope.row.status=='3' ?'已完成' :'已关闭' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template #default="scope">
            <el-button @click="updateClick(scope.row.id)" type="text" size="medium">编辑</el-button>
            <el-button @click="deleteClick(scope.row.id)" type="text danger" size="medium">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-footer">
      <el-pagination
        style="margin-top:10px;float:right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20, 30, 50]"
        :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>

    <de-tails :details_show="details_show" @closeDig="closeDig" ref="details"></de-tails>
  </div>
</template>

<script>
import DeTails from "./commponts/Details";
import * as Ordernotes from "./api";
export default {
  name: "Ordernotes",
  data() {
    return {
      tableData: [],
      currentPage: 1, // 默认显示第几页
      totalCount: 0, // 总条数
      PageSize: 10, // 默认每页显示的条数
      isloading: false, //加载动画
      SeachParams: { orderSn: "" ,status:""},
      details_show: false ,//详情
      options:[{lable:'待付款',value:'0'},{lable:'待发货',value:'1'},{lable:'已发货',value:'2'},{lable:'已完成',value:'3'},{lable:'已关闭',value:'4'}]
    };
  },
  components: {
    DeTails
  },
  methods: {
    //查询全部
    selectall() {
      this.isloading = true;
      let params = {
        pageSize: this.PageSize,
        pageNum: this.currentPage,
        orderSn: this.SeachParams.orderSn,
        status: this.SeachParams.status
      };
      Ordernotes.List(params).then(res => {
        this.isloading = false;
        this.tableData = res.data.list;
        this.totalCount = res.data.total;
      });
    },
    //详情
    details(id) {
      this.details_show = true;
      this.$refs.details.geDetails(id);
    },
    //新增
    addClick(){

    },
    //编辑
    updateClick(id){
     console.log(id)
    },
    //删除
    deleteClick(id) {
      console.log(id)
    },
    //重置
    reset() {
      this.SeachParams.orderSn = ""
      this.SeachParams.status=""
      this.selectall();
    },
    //关闭弹框
    closeDig(obj) {
      if (obj == "details") {
        this.details_show = false;
      }
    },
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val;
      // 页码显示到第一页
      this.currentPage = 1;
      this.selectall();
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      this.selectall();
    }
  },

  created() {
    this.selectall();
  }
};
</script>

<style lang="scss" scoped>
.table-container {
  padding: 0px 20px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .table-header {
    padding: 20px 0px;
  }
  .table-body {
    width: 100%;
    overflow: auto;
    height: 66vh;
  }
  .table-footer {
    padding: 20px 0px;
  }
}

.el-row {
  height: 70px;
  .el-col {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
