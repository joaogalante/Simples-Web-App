import {Collapse, Timeline} from 'antd'
import React from 'react'

import FlexGrid from '../../../components/structure/FlexGrid'
import FlexGridItem from '../../../components/structure/FlexGridItem'
import Separator from '../../../components/helpers/Separator'
import TimelineItem, {getTimelineIcon} from '../../../components/presentation/TimelineItem'

class ControlTimeline extends React.Component {
  refresh() {
    console.log('REFRESHING')
    // TODO: Call server to check status
  }

  componentDidMount() {
    this._ismounted = true
    const {index} = this.props
    setTimeout(() => {
      if (this._ismounted) {
        this.interval = setInterval(this.refresh, 3000)
      }
    }, index * 1000)
  }

  componentWillUnmount() {
    this._ismounted = false
    clearInterval(this.interval)
  }

  render() {
    // TODO: Use params
    const {item} = this.props
    const icon = getTimelineIcon('running')

    const header = (
      <FlexGrid>
        <FlexGridItem flex={2}>Pag Seguro</FlexGridItem>
        <FlexGridItem style={{paddingRight: 14}}>{icon}</FlexGridItem>
      </FlexGrid>
    )

    return (
      <Collapse accordion defaultActiveKey="_">
        <Collapse.Panel header={header} key="_">
          <Timeline pending>
            <TimelineItem msg="Iniciando busca" time={new Date()} />
            <TimelineItem msg="Preparando conexão" time={new Date()} />
            <TimelineItem msg="Pausando busca por 38s" time={new Date()} type="clock" />
            {/*
						<TimelineItem msg="Busca finalizada com sucesso" time={new Date()} type="done" />
						<TimelineItem msg="Erro ao efetuar a busca: Motivo......" time={new Date()} type="error" />
					*/}
          </Timeline>
        </Collapse.Panel>
      </Collapse>
    )
  }
}

export default ControlTimeline
