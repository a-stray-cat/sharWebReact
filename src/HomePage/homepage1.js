import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, withRouter, Route, Switch } from 'react-router-dom';
import '../HomePage/homepage1.css';
import menuList from '../config/menuConfig'
import App from './App/app';
import Web from './Web/web';
import Computer from './Computer/computer';
import { getInfor } from '../api/homeInfor';


const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class Homepage extends React.Component {

  getMenuNodes = (menuList) => {
    console.log(2)
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        const path = this.props.location.pathname
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          this.openKey = item.key
        }
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <span>{item.title}</span>
              </span>
            }
            icon={item.icon}
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }

  handleClick = e => {
    const start = JSON.stringify(e.keyPath[1]).length
    const end = JSON.stringify(e.keyPath[0]).length-1
    localStorage.setItem('onclick',JSON.stringify(e.keyPath[0]).substring(start,end))
    localStorage.setItem('nowSelect',e.keyPath[1])
  };

  

  getTitle = () => {
    //得到当前请求路径
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      //如果当前item对象的key与path一样，item的title就是要显示的title
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        //在所有子Item中查找匹配的
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
        //如果有值才说明有匹配的
        if (cItem) {
          //取出它的title
          title = cItem.title
        }
      }
    })
    return title
  }

  getTwoTitle = () => {
    //得到当前请求路径
    const path = this.props.location.pathname
    let titleTwo
    menuList.forEach(item => {
      //如果当前item对象的key与path一样，item的title就是要显示的title
      if (path.indexOf('/homepage/web/') > -1) {
        titleTwo = '网页端'
      } else if (path.indexOf('/homepage/computer/') > -1) {
        titleTwo = '电脑端'
      } else if (path.indexOf('/homepage/app/') > -1) {
        titleTwo = '手机端'
      }
    })
    return titleTwo
  }

  getInfor = (async () => {
    const response = await getInfor()
    console.log(1)
    let data = response.data
    let web = [];
    for (let i in data) {
      if (data[i].id === 'web') {
        web.push(data[i]);
      }
    }
    localStorage.setItem('web', JSON.stringify(web))

    let app = [];
    for (let i in data) {
      if (data[i].id === 'app') {
        app.push(data[i]);
      }
    }
    localStorage.setItem('app', JSON.stringify(app))

    let computer = [];
    for (let i in data) {
      if (data[i].id === 'computer') {
        computer.push(data[i]);
      }
    }
    localStorage.setItem('computer', JSON.stringify(computer))
  })

  state = {
    deskHeight: document.body.clientHeight,
    gaiHeight: (document.body.clientHeight) / 7,
    lastHeight: document.body.clientHeight - (document.body.clientHeight) / 7
  };

  constructor(props) {
    super(props);
    this.getInformation = this.getInfor()
  }

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
      gaiHeight: (document.body.clientHeight) / 7,
      lastHeight: document.body.clientHeight - (document.body.clientHeight) / 7
    });
  }
  //在第一次render()之前执行一次
  componentWillMount() {
    
    this.menuNodes = this.getMenuNodes(menuList)
    
    // this.getappList = this.getapp()
    
  }

  render() {
    const { lastHeight } = this.state;
    //得到当前需要显示的title
    const title = this.getTitle()
    const titleTwo = this.getTwoTitle()
    const nowSelect = JSON.stringify(localStorage.getItem('nowSelect'))
    // console.log(nowSelect)
    
    const path = this.props.location.pathname
    // console.log(now)
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>{titleTwo}</Breadcrumb.Item>
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0', height: '100%', minHeight: lastHeight }}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                style={{ height: '100%' }}
                onClick={this.handleClick}
                defaultSelectedKeys={[path]}
                defaultOpenKeys={[JSON.parse(nowSelect)]}
              >
                {
                  this.menuNodes
                }
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                <Route path='/homepage/app' component={App}></Route>
                <Route path='/homepage/web' component={Web}></Route>
                <Route path='/homepage/computer' component={Computer}></Route>
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <div style={{width:'300px',margin:'0 auto', padding:'20px 0'}}>
            <a target="_blank" rel="noreferrer" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51132402000094" style={{display:'inline-block',textDecoration:'none',height:'20px',lineHeight:'20px'}}><img alt='备案图标' src='https://whanp.ltd/static/media/beian.0c577066.png' style={{float:'left'}}/><p style={{float:'left',height:'20px',lineHeight:'20px',margin: '0px 0px 0px 5px', color:'#939393'}}>川公网安备 51132402000094号</p></a>
          </div>
        </Footer>
      </Layout>
    )
  }
}

export default withRouter(Homepage)