import {Icon, Timeline} from 'antd'
import React from 'react'
import moment from 'moment'

export const getTimelineIcon = type => {
  switch (type) {
    case 'clock':
      return <Icon type="clock-circle-o" style={{fontSize: '16px', color: '#FB9642'}} />

    case 'done':
      return <Icon type="check-circle-o" style={{fontSize: '16px', color: '#3BB273'}} />

    case 'error':
      return <Icon type="warning" style={{fontSize: '16px', color: '#EE6A83'}} />

    case 'running':
      return <Icon type="loading" style={{fontSize: '16px', color: '#2290FF'}} />
  }
}

const TimelineItem = ({msg, time, type}) => {
  const dot = getTimelineIcon(type)

  return (
    <Timeline.Item dot={dot} color="grey">
      <div>{msg}</div>
      <small>{moment(time).format('HH:mm:SS')}</small>
    </Timeline.Item>
  )
}

export default TimelineItem
