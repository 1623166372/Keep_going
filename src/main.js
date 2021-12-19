import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import './assets/css/style.scss'
import * as echarts from 'echarts'
import * as md5 from 'js-md5'
import * as moment  from "moment";
import * as ElIconModules from '@element-plus/icons'

const app = createApp(App)
app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$md5 = md5;
app.config.globalProperties.$moment = moment;
app.use(store).use(router).use(ElementPlus)
//注册图标
for(let iconName in ElIconModules){
    app.component(iconName,ElIconModules[iconName])
  }
app.mount('#app')
 