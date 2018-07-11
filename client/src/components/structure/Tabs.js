import './Tabs.css'

import { Tabs } from 'antd'
import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'

const InternalTabs = (props) => (
  <Tabs className={getDefaultClassName(props, 'tabs')} {...props} animated={false}>
    {props.children}
  </Tabs>
)

export const Tab = (props) => (
  <Tabs.TabPane className={getDefaultClassName(props, 'tab')} {...props}>
    {props.children}
  </Tabs.TabPane>
)

export default InternalTabs
