import React from 'react';
import { withRouter } from 'react-router';
import { Collapse } from 'antd';
import computertypeUrl from '../../config/computerConfig'



class Computer extends React.Component {

    getcomputerList = (computertypeUrl) => {
        this.state = {
            onclick: localStorage.getItem('onclick')
        }
        const { Panel } = Collapse;
        const {onclick} = this.state
        return computertypeUrl.map(item => {
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
            this.computerList = this.getcomputerList(computertypeUrl)
        }
    }

    componentWillMount() {
        this.computerList = this.getcomputerList(computertypeUrl)
    }

    render() {
        return (
            <Collapse>{this.computerList}</Collapse>
        )
    }
}

export default withRouter(Computer)