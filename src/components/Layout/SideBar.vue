<template>
  <div class="SideBar_container">
    <el-menu
      class="el-menu-vertical-demo"
       background-color="#01254d"
       text-color="#ffffff"
       active-text-color="#ffffff"
      :router="true"
      :collapse="isCollapse"
      :default-active="this.$route.path"
    >
    <!--logo -->
    <div class="SideBar_logo">
      <img class="logo" src="../../assets/image/img_28.png" :style="{ width:isCollapse ? '30px' :'38px',marginLeft: isCollapse ? '20px' :'10px'} ">
      <span class="logo-title" v-show="!isCollapse" >杨氏物流管理系统</span>
    </div>
     <!-- 菜单 -->
      <div class="side-body">
        <div v-for="(item,index) in filter_menu" :key="index">
          <el-menu-item v-if="! item.children" :index="item.path" >
            <i :class="item.icon"></i>
            <template #title>{{item.name}}</template>
          </el-menu-item>

          <el-submenu v-else :index="item.path">
            <template #title >
              <i :class="item.icon"></i>
              <span>{{ item.name}}</span>
            </template>

            <el-menu-item
              v-for="(item_child,index_child) in item.children"
              :index="item_child.path"
              :key="index_child"
            >{{item_child.name}}</el-menu-item>
          </el-submenu>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      menulist: [
        {
          id: "1",
          path: "/home",
          icon: "el-icon-s-home",
          name: "首页",
          role: ["admin", "user"]
        },
         {
          id: "2",
          path: "/Goods",
          icon: "el-icon-present",
          name: "商品管理",
          role: ["admin", "user"],
          children:[
             {
              id: "2-1",
              path: "/GoodsInfo",
              name: "商品列表",
              role: ["admin", "user"],
            }
          ]    
        },
        {
          id: "3",
          path: "/Orders",
          icon: "el-icon-s-order",
          name: "订单管理",
          role: ["admin", "user"],
          children:[
             {
              id: "3-1",
              path: "/OderInfo",
              name: "订单列表",
              role: ["admin", "user"],
            },
            {
              id: "3-2",
              path: "/ReturnOder",
              name: "退款申请",
              role: ["admin", "user"],
            }
          ]    
        },
         {
          id: "4",
          path: "/User",
          icon: "el-icon-user",
          name: "用户管理",
          role: ["admin", "user"],
          children:[
             {
              id: "4-1",
              path: "/UserInfo",
              name: "用户列表",
              role: ["admin", "user"],
            },
          ]    
        },
         {
          id: "4",
          path: "/System",
          icon: "el-icon-setting",
          name: "系统设置",
          role: ["admin", "user"],   
        },
  
      ],
    };
  },
  computed: {
    filter_menu() {
      let menulist = [];
      let role = "admin";
      for (let i in this.menulist) {
        //只有一级菜单
        if (
          this.menulist[i].role &&
          this.menulist[i].role.includes(role) &&
          !this.menulist[i].children
        ) {
          menulist.push(this.menulist[i]);
        }
        //有一级菜单且有子菜单
        else if (
          this.menulist[i].role &&
          this.menulist[i].role.includes(role) &&
          this.menulist[i].children
        ) {
          let list = new Object();
          list.id = this.menulist[i].id;
          list.path = this.menulist[i].path;
          list.name = this.menulist[i].name;
          list.role = this.menulist[i].role;
          list.icon = this.menulist[i].icon;
          list.children = [];
          menulist.push(list);

          //父菜单id
          let parentId = this.menulist[i].id;

          for (let t in this.menulist[i].children) {
            if (
              this.menulist[i].children[t].role &&
              this.menulist[i].children[t].role.includes(role)
            ) {
              for (let j in menulist) {
                //如果菜单集合中一级菜单id 和父id一致
                if (menulist[j].id == parentId) {
                  menulist[j].children.push(this.menulist[i].children[t]);
                }
              }
            }
          }
        }
      }
      return menulist;
    },
    isCollapse(){
      return this.$store.state.isCollapse
    }
  },
  created() {
    let that = this;
    window.onresize = function() {
      let window_height =
        document.body.clientWidth || document.documentElement.clientWidth;
      if (window_height < 960) {
         that.$store.commit('Change_isCollapse',true)
      } else {
        that.isCollapse = false;
        that.$store.commit('Change_isCollapse',false)
      }
    };
  }
};
</script>

<style lang="scss"  scoped>
.SideBar_container{
    height: 100vh;
    .SideBar_logo{
     height: 60px;
     line-height: 60px;
     text-align: left;
     background-color: #0747a6;
     box-sizing: border-box;
     overflow: hidden;
    
      .logo{
        vertical-align: middle;
        transition: all 0.3s;
      }
      .logo-title{
        vertical-align: middle;
        font-size: 17px;
        font-weight: 600;
        color: #ffffff;
        margin-left: 15px;
      }
      }
      .side-body {
      height: calc(100vh - 60px);
      overflow-y: auto;
      overflow-x: hidden;
      
    }
}

:deep(.el-menu-vertical-demo:not(.el-menu--collapse)) {
  width: 210px;
  min-height: 400px;
}
:deep(.el-menu--collapse .el-submenu__title span) {
  display: none;
}
:deep(.el-menu--collapse .el-submenu__title .el-submenu__icon-arrow) {
  display: none;
}
:deep(.el-menu-item.is-active) {
   background-color: #0747a6 !important;
}
:deep(.el-menu){
  border-right: 0px !important;;
}
:deep(.el-menu-item i){
  color: #ffffff;
}
:deep(.el-submenu__title i){
  color: #ffffff;
}
</style>
