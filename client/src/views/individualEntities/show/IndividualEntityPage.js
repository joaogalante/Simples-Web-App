import {connect} from 'react-redux'
import React from 'react'

import AssociatedEntityParticipationsTable from '../../participations/list/AssociatedEntityParticipationsTable'
import Content from '../../../components/structure/Content'
import FlexGrid from '../../../components/structure/FlexGrid'
import FlexGridItem from '../../../components/structure/FlexGridItem'
import FullWidthTemplate from '../../../templates/FullWidthTemplate'
import IndividualEntityInfo from './IndividualEntityInfo'
import IndividualEntityInfoSideBar from './IndividualEntityInfoSideBar'
import LoadIndividualEntitySingle from '../../../logicContainers/loading/LoadIndividualEntitySingle'
import PageHeader from '../../../components/structure/PageHeader'
import Panel from '../../../components/structure/Panel'
import TableHeader from '../../../components/table/TableHeader'
import Tabs, {Tab} from '../../../components/structure/Tabs'

const returnTo = '/individual-entities'

const IndividualEntityPage = ({individualEntity, loading, match: {params}}) => (
  <LoadIndividualEntitySingle id={params.id}>
    <FullWidthTemplate activeMenuItem="individualEntities">
      <PageHeader title={individualEntity.name} returnTo={returnTo} />
      <Panel stretch noPadding flex={1}>
        <Tabs defaultActiveKey="1" size="large">
          <Tab tab="Informações Gerais" key="1">
            <FlexGrid flex={1}>
              <FlexGridItem flex={19} scroll basicPadding>
                <IndividualEntityInfo />
              </FlexGridItem>
              <FlexGridItem flex={6} borderLeft>
                <IndividualEntityInfoSideBar />
              </FlexGridItem>
            </FlexGrid>
          </Tab>

          <Tab tab="Participações" key="2">
            <Content flex={1} scroll>
              <TableHeader>
                <span>Empresas onde é acionista ou administrador</span>
              </TableHeader>
              <AssociatedEntityParticipationsTable associatedEntityID={params.id} />
            </Content>
          </Tab>
        </Tabs>
      </Panel>
    </FullWidthTemplate>
  </LoadIndividualEntitySingle>
)

const mapState = state => ({
  individualEntity: state.individualEntities.single,
})

export default connect(mapState)(IndividualEntityPage)
