import {connect} from 'react-redux'
import React from 'react'

import ExpiredEntitiesOnCompositionTable from '../../entities/list/ExpiredEntitiesOnCompositionTable'
import FullWidthTemplate from '../../../templates/FullWidthTemplate'
import LoadLegalEntitySingle from '../../../logicContainers/loading/LoadLegalEntitySingle'
import PageHeader from '../../../components/structure/PageHeader'
import Panel from '../../../components/structure/Panel'
import TableHeader from '../../../components/table/TableHeader'

const returnTo = '/'

const ValidateLegalEntityCompositionPage = ({legalEntity, participations, loading, match: {params}}) => (
  <LoadLegalEntitySingle id={params.id}>
    <FullWidthTemplate activeMenuItem="legalEntities">
      <PageHeader title="Entidades expiradas" returnTo={returnTo} />
      <Panel stretch noPadding scroll flex={1}>
        <TableHeader borderTop>
          <span>As seguintes entidades estão com conteúdo expirado, clique em analizar para atualizalas</span>
        </TableHeader>
        <ExpiredEntitiesOnCompositionTable legalEntityID={params.id} />
      </Panel>
    </FullWidthTemplate>
  </LoadLegalEntitySingle>
)

const mapState = state => ({
  legalEntity: state.legalEntities.single,
})

export default connect(mapState)(ValidateLegalEntityCompositionPage)
