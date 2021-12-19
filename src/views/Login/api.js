import request from '../../untils/request'

//登录
export function Login_In(data){
    return  request({
        url:'/admin/login',
        method:'post',
        data:data,
    })
}

