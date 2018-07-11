import {connect} from 'react-redux'
import React from 'react'

import ControlReadersLogs from './ControlReadersLogs'
import ControlReadersOverview from './ControlReadersOverview'
import FullWidthTemplate from '../../../templates/FullWidthTemplate'
import LoadControlSingle from '../../../logicContainers/loading/LoadControlSingle'
import PageHeader from '../../../components/structure/PageHeader'
import Panel from '../../../components/structure/Panel'

const Page = ({control, loading, match: {params}}) => (
  <LoadControlSingle id={params.id}>
    <FullWidthTemplate activeMenuItem="controls">
      <PageHeader title={`Efetuando pesquisas para controle ${control.num}`} />
      <Panel stretch noPadding flex={1}>
				<ControlReadersOverview />
        <ControlReadersLogs />
      </Panel>
    </FullWidthTemplate>
  </LoadControlSingle>
)

const mapState = state => ({
  control: state.controls.single,
})

export default connect(mapState)(Page)
