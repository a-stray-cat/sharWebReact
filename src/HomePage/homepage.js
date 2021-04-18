import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import '../HomePage/homepage.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GlobalOutlined,
  DesktopOutlined,
  AndroidOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

export default class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    deskHeight: document.body.clientHeight,
    gaiHeight: (document.body.clientHeight)/5
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
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
          deskHeight:document.body.clientHeight,
      });
  }

  render() {
    const { gaiHeight,deskHeight } = this.state;
    return (
      <Layout>
          <div className="logo1"></div>
        <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{height: deskHeight-gaiHeight, minHeight:deskHeight*0.5}}>
            <Menu.Item key="1" icon={<GlobalOutlined />}>
              网站
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              电脑端
            </Menu.Item>
            <Menu.Item key="3" icon={<AndroidOutlined />}>
              手机端
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content className="site-layout-background">
            test
          </Content>
        </Layout>
      </Layout>
      </Layout>
    );
  }
}
