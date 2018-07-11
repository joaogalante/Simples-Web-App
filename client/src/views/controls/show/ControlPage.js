import {connect} from 'react-redux'
import React from 'react'
import moment from 'moment'

import ComposedEntitiesFolderStructureForControlTable from '../../entities/list/ComposedEntitiesFolderStructureForControlTable'
import ComposedEntitiesOnControlTable from '../../entities/list/ComposedEntitiesOnControlTable'
import Content from '../../../components/structure/Content'
import ControlInfo from './ControlInfo'
import ControlReadersSearchButton from '../_common/ControlReadersSearchButton'
import ControlSideBar from './ControlSideBar'
import FlexGrid from '../../../components/structure/FlexGrid'
import FlexGridItem from '../../../components/structure/FlexGridItem'
import FullWidthTemplate from '../../../templates/FullWidthTemplate'
import GenerateCompressControlsEntitiesFolderStructureButton from
  '../_common/GenerateCompressControlsEntitiesFolderStructureButton'
import GenerateControlExcelButton from '../_common/GenerateControlExcelButton'
import GenerateControlsEntitiesExcelButton from '../_common/GenerateControlsEntitiesExcelButton'
import LegalEntityCompositionParticipationsTable from '../../participations/list/LegalEntityCompositionParticipationsTable'
import LoadControlSingle from '../../../logicContainers/loading/LoadControlSingle'
import PageHeader from '../../../components/structure/PageHeader'
import Panel from '../../../components/structure/Panel'
import TableHeader from '../../../components/table/TableHeader'
import Tabs, {Tab} from '../../../components/structure/Tabs'

const returnTo = '/controls'

const ControlPage = ({control, participations, loading, match: {params}}) => (
  <LoadControlSingle id={params.id}>
    <FullWidthTemplate activeMenuItem="controls">
      <PageHeader title={`${control.num} - ${control.legalEntity && control.legalEntity.name}`} returnTo={returnTo} />
      <Panel stretch noPadding flex={1}>
        <Tabs defaultActiveKey="1" size="large">
          <Tab tab="Informações Gerais" key="1">
            <FlexGrid flex={1}>
              <FlexGridItem flex={19} basicPadding>
                <ControlInfo />
              </FlexGridItem>
              <FlexGridItem flex={6} borderLeft>
                <ControlSideBar />
              </FlexGridItem>
            </FlexGrid>
          </Tab>

          <Tab tab="Composição" key="2">
            {control.legalEntity && (
              <Content flex={1} scroll>
                <TableHeader>
                  <span style={{color: 'tomato'}}>
                    Composição gerada {moment(control.instanceDate).fromNow()}.<br />
                    Pode não bater com composição atual da {control.legalEntity.name}
                  </span>
                  <GenerateControlExcelButton controlId={params.id} />
                </TableHeader>
                <LegalEntityCompositionParticipationsTable
                  legalEntityID={control.legalEntity.id}
                  controlID={params.id}
                />
              </Content>
            )}
          </Tab>

          <Tab tab="Pesquisa" key="3">
            {control.legalEntity && (
              <Content flex={1} scroll>
                <TableHeader>
                  <span style={{color: 'tomato'}}>
                    Pesquisa gerada {moment(control.instanceDate).fromNow()}.<br />
                    Pode não bater com composição atual da {control.legalEntity.name}
                  </span>
                  <GenerateControlsEntitiesExcelButton controlId={params.id} />
                </TableHeader>
                <ComposedEntitiesOnControlTable controlID={params.id} />
              </Content>
            )}
          </Tab>

          <Tab tab="Ordem de Serviço" key="4">
            {control.legalEntity && (
              <Content flex={1} scroll>
                <TableHeader>
                  <span style={{color: 'tomato'}}>
                    Pesquisa gerada {moment(control.instanceDate).fromNow()}.<br />
                    Pode não bater com composição atual da {control.legalEntity.name}
                  </span>
									<FlexGrid>
										<ControlReadersSearchButton controlId={params.id} />
										<GenerateCompressControlsEntitiesFolderStructureButton controlId={params.id} />
                  </FlexGrid>
                </TableHeader>
                <ComposedEntitiesFolderStructureForControlTable controlID={params.id} />
              </Content>
            )}
          </Tab>
        </Tabs>
      </Panel>
    </FullWidthTemplate>
  </LoadControlSingle>
)

const mapState = state => ({
  control: state.controls.single,
})

export default connect(mapState)(ControlPage)
