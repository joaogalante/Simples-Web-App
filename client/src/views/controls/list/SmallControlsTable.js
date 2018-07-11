import { connect } from 'react-redux'
import React from 'react'

import { closeAllModals } from '../../../logicContainers/modal/modal.actions'
import {
  goToShowControl,
} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import Table, {
  TableCell,
  TableLinkCell,
  TableRow,
} from '../../../components/table/Table'

const SmallControlsTable = ({ list, goToShow, ControlCell }) => (
  <Table>
    {list.map((item) => (
      <TableRow key={item.id}>
        <TableLinkCell flex={1} onClick={goToShow.bind(null, item)}>
          {item.num}
        </TableLinkCell>
        <TableCell>
          <ControlCell item={item} />
        </TableCell>
      </TableRow>
    ))}
  </Table>
)

const mapActions = dispatch => ({
  goToShow: (control) => {
    dispatch(closeAllModals())
    goToShowControl(dispatch, control)
  }
})

export default connect(null, mapActions)(SmallControlsTable)
