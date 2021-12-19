<template>
  <div class="table-container" v-cloak>
    <!--  查询条件-->
    <div class="table-header">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input placeholder="请输入货号" v-model="SeachParams.productSn" @keyup.enter="selectall"></el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="SeachParams.verifyStatus" placeholder="请选择审核状态" @change="selectall">
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

        <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
        <el-table-column label="商品编号" show-overflow-tooltip align="center">
          <template #default="scope">
            <span class="primary" @click.stop="details(scope.row.id)">{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="商品名称" :show-overflow-tooltip="true" align="center">
        <template #default="scope">
        <span >{{scope.row.name}}</span>
        </template>
        </el-table-column>
        <el-table-column
          label="商品图片"
          :show-overflow-tooltip="true"
          align="center"
         >
          <template #default="scope">
            <span ><img :src="scope.row.pic" style="width:40px"></span>
          </template>
        </el-table-column>
        <el-table-column
          label="销量"
          :show-overflow-tooltip="true"
          align="center"
         >
          <template #default="scope">
            <span >{{scope.row.usePointLimit}}件</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" :show-overflow-tooltip="true" align="center">
          <template #default="scope">
            <span >{{scope.row.verifyStatus=='0' ?'未审核' :'审核通过' }}</span>
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
      SeachParams: { productSn: "" ,verifyStatus:""},
      details_show: false ,//详情
      options:[{lable:'未审核',value:'0'},{lable:'审核通过',value:'1'}]
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
        productSn: this.SeachParams.productSn,
        verifyStatus: this.SeachParams.verifyStatus
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
      this.SeachParams.productSn = ""
      this.SeachParams.verifyStatus=""
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
