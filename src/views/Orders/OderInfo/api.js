import request from '../../../untils/request'

//列表
export function List(params){
    return  request({
        url:'/order/list',
        method:'get',
        params:params
    })
}

//详情
export function get_Details(id){
    return  request({
        url:`/order/${id}`,
        method:'get'
    })
}
