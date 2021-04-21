import React, {Component} from 'react'
import memoryUtils from '../utils/memoryUtils'
import {Redirect} from 'react-router-dom'

export default class Admin extends Component {
    render(){
        const user = memoryUtils.user
        console.log(!user)
        if(JSON.stringify(user)=='{}') {
            //自动跳转到登录
            return <Redirect to='/login'></Redirect>
        } else {
            var userj = JSON.parse(user)
            return(
                <div>
                    Hello {userj['adminname']}
                </div>
            )
        }
    }
}