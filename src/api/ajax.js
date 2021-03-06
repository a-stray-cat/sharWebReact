/*
能发送异步ajax请求的函数模块
封装axios库
函数的返回值是promise对象
1.优化：统一处理请求异常
    在外层包一个自己创建的promise对象
    在请求出错时，不reject(error)，而是显示错误提示
*/

import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={},type='GET') {

    return  new Promise((resolve,reject) => {
        let promise
        //1.执行异步ajax请求
        if(type==='GET') {
            promise = axios.get(url, {
                params: data
            })
        } else {
            promise = axios.post(url,data)
        }

        //2.如果成功，调用resolve(value)
        promise.then(response => {
            resolve(response)
        //3.如果失败，不调用reject(reaon)，而提示异常信息
        }).catch(error =>　{
            message.error('请求出错了：'+error.message)
        })
        

    })

    
}