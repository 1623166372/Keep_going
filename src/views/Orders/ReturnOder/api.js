import request from '../../../untils/request'

//列表
export function List(params){
    return  request({
        url:'returnApply/list',
        method:'get',
        params:params
    })
}

//详情
export function get_Details(id){
    return  request({
        url:`/returnApply/${id}`,
        method:'get'
    })
}
