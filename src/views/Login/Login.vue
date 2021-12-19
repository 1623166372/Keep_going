<template>
  <div class="login_box" v-cloak>
    <div class="body">
      <div class="body-left"></div>
      <div class="body-right" >
        <h4>杨氏物流管理系统</h4>
        <el-form
          :model="form"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          label-position="left"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" clearable placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" show-password placeholder="请输入密码">></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="password">
            <el-input v-model="form.yzm" show-password placeholder="请输入密码">
              <template #append>
                <el-button type="primary">验证码</el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="password-box">
          <div class="rme-passssword">
            <el-checkbox v-model="checked" label="记住密码"></el-checkbox>
          </div>
          <div class="forget-password">
            <router-link to="ss">
              <span>忘记密码</span>
            </router-link>
          </div>
        </div>
        <div class="form-button">
          <el-button
            type="primary"
            :loading="islogin"
            @click="login"
            style="width:100%;padding:14px 20px;font-size:17px;letter-spacing:22px"
          >登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Login_In} from './api'
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "admin",
        password: "macro123",
        yzm: "4259"
      },
      rules: {
        username: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        yzm: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      islogin: false,
      checked:true
    };
  },
  methods: {
    change() {},
    login() {
      let that=this
      that.islogin = true;
      that.$refs["ruleForm"].validate(valid => {
        if (valid) {
           Login_In(that.form).then((res)=>{        
             localStorage.setItem('token',(res.data.tokenHead+res.data.token))
             that.$router.push({path: '/home'});
           })
        } else {
          that.islogin = false;
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$height: 100%;
$width: 100%;
$color: #ffffff;
.login_box {
  background: url("../../assets/image/bg1.jpg") no-repeat;
  background-size: cover;
  height: $height;
  width: $width;
  display: flex;
  align-items: center;
  justify-content: center;

  .body {
    width: 57%;
    height: 70%;
    background: transparent;
  }
  .body-left {
    height: $height;
    width: 50%;
    float: left;
    background: url("../../assets/image/work.png") no-repeat;
    background-size: 73% 65%;
    background-position: 45% 40%;
    background-color: $color;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .body-right {
    height: $height;
    width: 50%;
    float: left;
    padding: 5% 8%;
    box-sizing: border-box;
    background-color: rgba(42, 82, 141, 0.4);
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  h4 {
    color: $color;
    font-weight: 500;
    font-size: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 2px;
    margin-bottom: 60px;
  }
  .password-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
    margin-top: -5px;

    .rme-passssword {
      width: 50%;
    }
    .forget-password {
      flex: 1;
      text-align: right;

      span {
        color: #fafdfd;
        font-size: 14px;
      }
    }
  }
}

:deep(.el-form-item__label) {
  background-color: rgba(88, 133, 219, 0.5);
  color: $color ;
  text-align: center ;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
 :deep(.el-input--suffix .el-input__inner) {
  background-color: rgba(88, 133, 219, 0.3);
  border: 0px;
  border-top-left-radius: 0px ;
  border-bottom-left-radius: 0px ;
  color: $color;
  font-size: 14px;
}
:deep(.el-form-item){
  margin-bottom: 38px 
}
:deep(.el-checkbox__label) {
  color: #fafdfd;
}
:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: #ffffff;
}
:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #027aff;
  border-color: #027aff;
}

:deep(.el-input-group__append) {
  background-color: #027aff ;
  color: #ffffff;
  border-color: #027aff ;
}

:deep(.el-input-group__append:hover) {
  background-color: rgba(2, 122, 255, 0.8);
  border-color: rgba(2, 122, 255, 0.8); 
}
</style>
