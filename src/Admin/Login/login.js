import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api'

import './login.css'
import logo from './image/logo.png'

export default class Login extends Component {
    state = {
        deskHeight: document.body.clientHeight,
        gaiHeight: (document.body.clientHeight) / 7,
        lastHeight: document.body.clientHeight - (document.body.clientHeight) / 7
    };

    componentDidMount() {

        // 注册浏览器尺寸变化监听事件， 刷新桌面尺寸
        window.addEventListener('resize', this.handleSize);

    }

    componentWillUnmount() {
        // 移除监听事件
        window.removeEventListener('resize', this.handleSize);
    }

    // 自适应浏览器的高度
    handleSize = () => {
        this.setState({
            deskHeight: document.body.clientHeight,
            gaiHeight: (document.body.clientHeight) / 3,
            lastHeight: document.body.clientHeight - (document.body.clientHeight) / 7
        });
    }
    render() {
        const onFinish = (async (values) => {
            const {adminname,adminpassword} = values
            const response = await reqLogin(adminname,adminpassword)
            const result = response.data
            console.log(result)
            if(result.state===1) {
                message.success('登陆成功')
                this.props.history.replace('/admin')
            } else if(result.state===2) {
                message.error("密码错误！")
            } else {
                message.error("用户不存在！")
            }
        });
        const { deskHeight, gaiHeight } = this.state;
        return (
            <div className="login" style={{height:deskHeight}}>
                <header className="login-header">
                    <img src={logo} alt="logo"></img>
                    <h1>shareWeb-后台管理系统</h1>
                </header>
                <section className="login-content" style={{marginTop:gaiHeight}}>
                    <h2>用户登录</h2>
                    <Form name="normal_login" className="login-form" onFinish={onFinish}>
                        <Form.Item name="adminname" rules={[{ required: true, message: '请输入用户名!' }]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item name="adminpassword" rules={[{ required: true, message: '请输入密码!' }]}>
                            <Input  prefix={<LockOutlined className="site-form-item-icon" />} type="password"  placeholder="密码"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}