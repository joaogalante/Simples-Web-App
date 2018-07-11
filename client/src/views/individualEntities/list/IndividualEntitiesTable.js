import {connect} from 'react-redux'
import React from 'react'

import {formatCpfOrCnpj} from '../../../helpers/entityCodeHelpers'
import {goToShowIndividualEntity} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import EntityBornAtInfo from '../../entities/_common/EntityBornAtInfo'
import EntityExpirationIcon from '../../entities/_common/EntityExpirationIcon'
import LoadingSpinnerWrapper from '../../../logicContainers/loading/LoadingSpinnerWrapper'
import Table, {TableCell, TableLinkCell, TableRow} from '../../../components/table/Table'
import TitleSubtitle from '../../../components/presentation/TitleSubtitle'

const IndividualEntitiesTable = ({list, loading, goToShow, ControlCell}) => (
  <LoadingSpinnerWrapper loading={loading}>
    <Table>
      {list.map(item => (
        <TableRow key={item.id}>
          <TableLinkCell flex={3} onClick={goToShow.bind(null, item)}>
            <TitleSubtitle title={item.name} subtitle={item.code ? formatCpfOrCnpj(item.code) : 'Sem CNPJ/CPF'} />
          </TableLinkCell>

          <TableCell flex={1}>
            <EntityBornAtInfo entity={item} />
          </TableCell>

          <TableCell flex={1}>
            <EntityExpirationIcon entity={item} />
          </TableCell>

          <TableCell>
            <ControlCell item={item} />
          </TableCell>
        </TableRow>
      ))}
    </Table>
  </LoadingSpinnerWrapper>
)

const mapActions = dispatch => ({
  goToShow: entity => goToShowIndividualEntity(dispatch, entity),
})

export default connect(null, mapActions)(IndividualEntitiesTable)
