import React from 'react';
import { withRouter } from 'react-router';
import { Collapse } from 'antd';
import webtypeUrl from '../../config/webConfig'

class Web extends React.Component {

    getwebList = (webtypeUrl) => {
        const { Panel } = Collapse;
        return webtypeUrl.map(item => {
            <Panel header={item.name} key={item.key}>
                <p>{item.name}</p>
            </Panel>
        })
    }

    // componentWillMount() {
    //     this.webList = this.getwebList(webtypeUrl)
    // }

    render() {
        
        return (
            // <Collapse>{this.webList}</Collapse>
            <div>web</div>
        )
    }
}

export default withRouter(Web)