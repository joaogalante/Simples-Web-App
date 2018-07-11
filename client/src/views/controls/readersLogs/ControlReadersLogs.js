import {Col, Collapse, Row} from 'antd'
import React from 'react'

import Content from '../../../components/structure/Content'
import ControlReaderTimeline from './ControlReaderTimeline'
import Separator from '../../../components/helpers/Separator'
import TitleSubtitle from '../../../components/presentation/TitleSubtitle'

class Logs extends React.Component {
  renderItems(items, section) {
    return items.map((item, i) => (
      <Col span={8} key={section + '_' + i}>
        <ControlReaderTimeline item={item} index={i} />
      </Col>
    ))
  }

  renderSections() {
    const logs = {Google: [1, 2, 3], 'Governo.sp.com': [4, 5, 6.7]}
    return Object.keys(logs).map(key => {
      const items = logs[key]

      return (
        <div key={key}>
          <Content basicPadding>
            <TitleSubtitle title={key} />
          </Content>

          <Content basicPadding>
            <Row type="flex" justify="start" gutter={16}>
              {this.renderItems(items, key)}
            </Row>
          </Content>

          <Separator />
        </div>
      )
    })
  }

  render() {
    return <div>{this.renderSections()}</div>
  }
}

export default Logs
