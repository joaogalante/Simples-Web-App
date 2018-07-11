import {Layout} from 'antd'
import React from 'react'

import Panel from '../components/structure/Panel'

const SessionTemplate = ({children}) => (
  <Layout className="layout center-child">
    <Panel small textCenter largePadding style={{flex: 'none'}}>
      {children}
    </Panel>
  </Layout>
)

export default SessionTemplate
