import {connect} from 'react-redux'
import React from 'react'

import AssociatedEntityParticipationsTable from '../../participations/list/AssociatedEntityParticipationsTable'
import ComposedControlsForLegalEntityTable from '../../controls/list/ComposedControlsForLegalEntityTable'
import Content from '../../../components/structure/Content'
import ControlItemTableMenu from '../../controls/list/ControlItemTableMenu'
import FlexGrid from '../../../components/structure/FlexGrid'
import FlexGridItem from '../../../components/structure/FlexGridItem'
import FullWidthTemplate from '../../../templates/FullWidthTemplate'
import LegalEntityCompositionParticipationsTable from '../../participations/list/LegalEntityCompositionParticipationsTable'
import LegalEntityInfo from './LegalEntityInfo'
import LegalEntityInfoSideBar from './LegalEntityInfoSideBar'
import LoadLegalEntitySingle from '../../../logicContainers/loading/LoadLegalEntitySingle'
import PageHeader from '../../../components/structure/PageHeader'
import Panel from '../../../components/structure/Panel'
import TableHeader from '../../../components/table/TableHeader'
import Tabs, {Tab} from '../../../components/structure/Tabs'

const returnTo = '/'

const LegalEntityPage = ({legalEntity, participations, loading, match: {params}}) => (
  <LoadLegalEntitySingle id={params.id}>
    <FullWidthTemplate activeMenuItem="legalEntities">
      <PageHeader title={legalEntity.name} returnTo={returnTo} />
      <Panel stretch noPadding flex={1}>
        <Tabs defaultActiveKey="1" size="large">
          <Tab tab="Informações Gerais" key="1">
            <FlexGrid flex={1}>
              <FlexGridItem flex={19} scroll basicPadding>
                <LegalEntityInfo />
              </FlexGridItem>
              <FlexGridItem flex={6} borderLeft>
                <LegalEntityInfoSideBar />
              </FlexGridItem>
            </FlexGrid>
          </Tab>

          <Tab tab="Composição" key="2">
            <Content flex={1} scroll>
              <LegalEntityCompositionParticipationsTable
                legalEntityID={params.id}
                emptyMessage={`Não há nenhum socio/administrador cadastrado para ${
                  legalEntity.name
                }. Clique em "Editar Empresa" na aba de "Informações Gerais"`}
              />
            </Content>
          </Tab>

          <Tab tab="Participações" key="3">
            <Content flex={1} scroll>
              <TableHeader>
                <span>Empresas onde é sócio</span>
              </TableHeader>
              <AssociatedEntityParticipationsTable associatedEntityID={params.id} disableGoToShow />
            </Content>
          </Tab>

          <Tab tab="Controles" key="4">
            <Content flex={1} scroll>
              <ComposedControlsForLegalEntityTable ControlCell={ControlItemTableMenu} legalEntityID={params.id} />
            </Content>
          </Tab>
        </Tabs>
      </Panel>
    </FullWidthTemplate>
  </LoadLegalEntitySingle>
)

const mapState = state => ({
  legalEntity: state.legalEntities.single,
})

export default connect(mapState)(LegalEntityPage)
