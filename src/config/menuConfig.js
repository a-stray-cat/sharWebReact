import {
    GlobalOutlined,
    DesktopOutlined,
    AndroidOutlined,
  } from '@ant-design/icons';

var web=JSON.parse(localStorage.getItem('web'))
let webtype = []
for(let i in web){
      if (JSON.stringify(webtype).indexOf(web[i].type) === -1) {
        // console.log(web[i].type)
        // console.log(JSON.stringify(webtype))
        webtype.push({'title':web[i].type,'key':'/homepage/web/'+web[i].type});
      }
}

var app=JSON.parse(localStorage.getItem('app'))
let apptype = []
for(let i in app){
      if (JSON.stringify(apptype).indexOf(app[i].type) === -1) {
        apptype.push({'title':app[i].type,'key':'/homepage/app/'+app[i].type});
      }
}

var computer=JSON.parse(localStorage.getItem('computer'))
let computertype = []
for(let i in computer){
      if (JSON.stringify(computertype).indexOf(computer[i].type) === -1) {
        computertype.push({'title':computer[i].type,'key':'/homepage/computer/'+computer[i].type});
      }
}


const menuList = [
    {
        title: '网页端',
        key: '/homepage/web',
        icon: <GlobalOutlined/>,
        children: webtype
        
    },
    {
        title: '电脑端',
        key: '/homepage/computer',
        icon: <DesktopOutlined/>,
        children: computertype
    },
    {
        title: '手机端',
        key: '/homepage/app',
        icon: <AndroidOutlined/>,
        children: apptype
    },

]
// menuList.children.push(webtype)
export default menuList