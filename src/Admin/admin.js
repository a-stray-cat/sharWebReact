import React, {Component} from 'react'
import memoryUtils from '../utils/memoryUtils'
import {Redirect} from 'react-router-dom'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import storageUtils from '../utils/storageUtils';
import { withRouter } from 'react-router-dom';
import './admin.css'

class Admin extends Component {

    logout = () => {
        //显示确认框
        Modal.confirm({
            title: '是否确认退出登录？',
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                console.log('ok',this)
                //删除保存的user数据
                storageUtils.removeUser()
                memoryUtils.user = {}
                //跳转到login
                this.props.history.replace('/login')
            }
          })
    }

    render(){
        const user = memoryUtils.user
        console.log(!user)
        if(JSON.stringify(user)==='{}') {
            //自动跳转到登录
            return <Redirect to='/login'></Redirect>
        } else {
            var userj = JSON.parse(user)
            return(
                <div>
                    <span>Hello {userj['adminname']}</span>
                    <button onClick={this.logout}>退出</button>
                </div>
            )
        }
    }
}

export default withRouter(Admin)