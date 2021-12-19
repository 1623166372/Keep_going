import axios from 'axios'
import {
    ElMessage
} from 'element-plus'
//创建axios实例
const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? `/api` : '/api',
    timeout: 4000
})
service.interceptors.request.use(config => {
    //发送前获取token
    if (localStorage.getItem('token')) {
        config.headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    } else {
        config.headers = {
            'Content-Type': 'application/json' //配置请求头
        }
    }
    return config
}, error => {
    return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(response => {
    //返回响应结果
    if (response.data) {
        return response.data
    }
}, error => {
    if (error.response) {
        switch (error.response) {
            case 401:
                ElMessage.error('未授权，请重新登录')
                break
            case 404:
                ElMessage.error('请求出错(404)')
                break
            case 408:
                ElMessage.error('请求超时')
                break
            case 500:
                ElMessage.error('服务端出错')
                break
            case 502:
                ElMessage.error('网络错误')
                break
            case 503:
                ElMessage.error('服务不可用')
                break
            case 504:
                ElMessage.error('网络超时')
                break
            default:
                ElMessage.error(`连接出错${status}`)
        }
    }

    return Promise.resolve(error.response)
})

export default service