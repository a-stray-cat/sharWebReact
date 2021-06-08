import React from 'react';
import { withRouter } from 'react-router';
import { Collapse } from 'antd';
import apptypeUrl from '../../config/appConfig'



class App extends React.Component {

    getappList = (apptypeUrl) => {
        this.state = {
            onclick: localStorage.getItem('onclick')
        }
        const { Panel } = Collapse;
        const {onclick} = this.state
        return apptypeUrl.map(item => {
            if (item.type===onclick) {
                return (
                    <Panel header={item.name} key={item.key}>
                        <p>{item.key}</p>
                    </Panel>
                )
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname!==nextProps.pathname) {
            this.setState({
                onclick:localStorage.getItem('onclick')
            })
            this.appList = this.getappList(apptypeUrl)
        }
    }

    componentWillMount() {
        this.appList = this.getappList(apptypeUrl)
    }

    render() {
        return (
            <Collapse>{this.appList}</Collapse>
        )
    }
}

export default withRouter(App)