/*
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise
*/

import ajax from './ajax'

// export function reqLogin(username,password) {
//     return ajax('./login',{username,password},'POST')
// } 
export const reqLogin = (adminname,adminpassword) => ajax('/admin/login',{adminname,adminpassword},'POST')