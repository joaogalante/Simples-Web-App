import './TableRowMessage.css'

import React from 'react'

import { TableCell, TableRow } from './Table'
import Icon from '../shapes/Icon'
import TitleSubtitle from '../presentation/TitleSubtitle'

const TableRowMessage = ({ level, title, subtitle }) => (
  <TableRow level={level} className='table-row-message'>
		<TableCell main>
			<Icon name='info' />
		</TableCell>
		<TableCell flex={1}>
			<TitleSubtitle 
				title={title}
				subtitle={subtitle} />
		</TableCell>
	</TableRow>
)

export default TableRowMessage 
