import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import Icon from '@ant-design/icons';
import '../HomePage/homepage1.css';
import menuList from '../config/menuConfig'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class SiderDemo extends React.Component{

getMenuNodes = (menuList) => {
  return menuList.map(item => {
    if(!item.children) {
      return(
        <Menu.Item key={item.key}>
          <Link to={item.key}>
            <Icon type={item.icon}/>
            <span>{item.title}</span>
          </Link>
        </Menu.Item>
      )
    } else {
      const path = this.props.location.pathname
      const cItem = item.children.find(cItem => cItem.key===path)
      if(cItem){
        this.openKey = item.key
      }
      return (
        <SubMenu 
          key={item.key}
          title={
            <span>
              <Icon type={item.icon}></Icon>
              <span>{item.title}</span>
            </span>
          }
        >
          {this.getMenuNodes(item.children)}
        </SubMenu>
      )
    }
  })
}

  state = {
    deskHeight: document.body.clientHeight,
    gaiHeight: (document.body.clientHeight)/7,
    lastHeight: document.body.clientHeight-(document.body.clientHeight)/7
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
            gaiHeight:(document.body.clientHeight)/7,
            lastHeight:document.body.clientHeight-(document.body.clientHeight)/7
        });
    }
    //在第一次render()之前执行一次
    componentWillMount() {
      this.menuNodes = this.getMenuNodes(menuList)
    }
    
    render(){
      const { lastHeight } = this.state;
      const path = this.props.location.pathname
      console.log("render()",path)
        return(
          <Layout>
            <Header className="header">
              <div className="logo" />
            </Header>
            <Content style={{ padding: '0 50px'}}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
                <Layout className="site-layout-background" style={{ padding: '24px 0' ,height:lastHeight}}>
                  <Sider className="site-layout-background" width={200}>
                    <Menu
                      mode="inline"
                      // selectedKeys={[path]}
                      // openKeys={[openKey]}
                      style={{ height: '100%' }}
                    >
                      {
                        this.menuNodes
                      }
                    </Menu>
                  </Sider>
                  <Content style={{ padding: '0 24px', minHeight: 280 }}>Content</Content>
                </Layout>
            </Content>
    <Footer style={{ textAlign: 'center' }}>备案号</Footer>
  </Layout>
        )
    }
}

export default withRouter(SiderDemo)