import { connect } from 'react-redux'
import React from 'react'
import moment from 'moment'

import {
  goToShowControl,
} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import LoadingSpinnerWrapper from
  '../../../logicContainers/loading/LoadingSpinnerWrapper'
import Table, {
  TableCell,
  TableLinkCell,
  TableRow,
} from '../../../components/table/Table'

const ControlsTable = ({ list, loading, goToShow, ControlCell }) => (
  <LoadingSpinnerWrapper loading={loading}>
    <Table>
      {list.map((item) => (
        <TableRow key={item.id}>
          <TableLinkCell flex={1} onClick={goToShow.bind(null, item)}>
            {item.num}
          </TableLinkCell>

					{(item.legalEntity && item.legalEntity.id > 0) &&
						<TableCell flex={1}>
							{item.legalEntity.name}
						</TableCell>
					}

					<TableCell flex={1}>
						Emitido {moment(item.instanceDate).fromNow()}
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
  goToShow: (control) => goToShowControl(dispatch, control),
})

export default connect(null, mapActions)(ControlsTable)
