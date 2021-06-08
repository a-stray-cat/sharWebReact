import React from 'react';
import { withRouter } from 'react-router';
import { Collapse } from 'antd';
import webtypeUrl from '../../config/webConfig'



class Web extends React.Component {

    // onclick=JSON.parse(localStorage.getItem('onclick'))
    // onclick = null;

    

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     //该方法内禁止访问this
    //     const { type } = nextProps
    //     console.log('nextProps',nextProps+i)
    //     console.log('prevState',prevState+i)
    //     // if (type !== prevState.type) {
    //     //   //通过对比nextProps和prevState，返回一个用于更新状态的对象
    //     //   return {
    //     //     pathname: Newpathname
    //     //   }
        
    //     // }
    //     return null
    // }
    
    
    getwebList = (webtypeUrl) => {
        this.state = {
            onclick: localStorage.getItem('onclick')
        }
        const { Panel } = Collapse;
        // var onclick = localStorage.getItem('onclick')
        const {onclick} = this.state
        // console.log(onclick)
        return webtypeUrl.map(item => {
            if (item.type===onclick) {
                return (
                    <Panel header={item.name} key={item.key}>
                        <p>{item.key}</p>
                    </Panel>
                )
            }
        })
    }

    // updateOnclick = () => {
    //     setInterval(() => {
    //         onclick = localStorage.getItem('onclick')
    //         this.setState({onclick})
    //     }, 1000);
    // }

    componentWillReceiveProps(nextProps) {
        // console.log('nextProps',nextProps)
        // console.log('props',this.props)
        if (this.props.location.pathname!==nextProps.pathname) {
            this.setState({
                onclick:localStorage.getItem('onclick')
            })
            this.webList = this.getwebList(webtypeUrl)
        }
    }


    //第一次render()之后执行一次，一般在此执行异步操作：启动定时器
    // componentDidMount() {
    //     // this.updateOnclick()
    //     // this.webList = this.getwebList(webtypeUrl)
    // }


    componentWillMount() {
        this.webList = this.getwebList(webtypeUrl)
    }

    render() {
        return (
            <Collapse>{this.webList}</Collapse>
            // <div>web</div>
        )
    }
}

export default withRouter(Web)