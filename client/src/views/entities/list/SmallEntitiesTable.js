import {connect} from 'react-redux'
import React from 'react'

import {closeAllModals} from '../../../logicContainers/modal/modal.actions'
import {formatCpfOrCnpj} from '../../../helpers/entityCodeHelpers'
import EntityBornAtInfo from '../_common/EntityBornAtInfo'
import IconButton from '../../../components/actions/IconButton'
import Table, {TableCell, TableLinkCell, TableRow} from '../../../components/table/Table'
import TitleSubtitle from '../../../components/presentation/TitleSubtitle'

const SmallEntitiesTable = ({list, onSelectWrapper}) => (
  <Table>
    {list.map(item => (
      <TableRow key={item.id}>
        <TableLinkCell flex={2} onClick={() => onSelectWrapper(item)}>
          <TitleSubtitle title={item.name} subtitle={item.code ? formatCpfOrCnpj(item.code) : 'Sem CNPJ/CPF'} />
        </TableLinkCell>

        <TableCell flex={1}>
          <EntityBornAtInfo entity={item} />
        </TableCell>

        <TableCell>
          <IconButton blue icon="angle-right" tooltip="Selectionar" onClick={() => onSelectWrapper(item)} />
        </TableCell>
      </TableRow>
    ))}
  </Table>
)

const mapActions = (dispatch, {onSelect}) => ({
  onSelectWrapper: entity => {
    dispatch(closeAllModals())
    onSelect(entity)
  },
})

export default connect(null, mapActions)(SmallEntitiesTable)
