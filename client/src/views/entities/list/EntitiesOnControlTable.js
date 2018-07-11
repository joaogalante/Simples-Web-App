import React from 'react'

import {ENTITY_TYPES, ENTITY_TYPES_LABELS} from '../../../config/vars'
import {checkSortForEntitiesOnControlSearch, hasRecentMention} from '../../../helpers/entitiesHelpers'
import {displayCode} from '../../../helpers/entityCodeHelpers'
import EntityExpirationIcon from '../_common/EntityExpirationIcon'
import LoadingSpinnerWrapper from '../../../logicContainers/loading/LoadingSpinnerWrapper'
import Table, {TableCell, TableRow} from '../../../components/table/Table'
import Tag from '../../../components/presentation/Tag'
import TitleSubtitle from '../../../components/presentation/TitleSubtitle'

const EntitiesOnControlTable = ({list, loading, goToShow, ControlCell}) => (
  <LoadingSpinnerWrapper loading={loading}>
    <Table>
      {list.sort(checkSortForEntitiesOnControlSearch).map(item => (
        <TableRow key={item.id} grey={item.entityType === ENTITY_TYPES.LEGAL}>
          <TableCell flex={3} main>
            <TitleSubtitle title={item.name} subtitle={displayCode(item)} />
          </TableCell>
          <TableCell flex={1}>
            <EntityExpirationIcon entity={item} />
          </TableCell>
          <TableCell flex={2}>{ENTITY_TYPES_LABELS[item.entityType]}</TableCell>
          <TableCell flex={2}>
            {item.country && item.country.namePT}
            {item.country && item.address && item.address.state && ' - '}
            {item.address && item.address.state}
          </TableCell>

          <TableCell flex={3}>
            {hasRecentMention(item) &&
              item.lastControl &&
              item.lastControl.num && <Tag yellow>Reaproveitadas {item.lastControl.num}</Tag>}
          </TableCell>
        </TableRow>
      ))}
    </Table>
  </LoadingSpinnerWrapper>
)

export default EntitiesOnControlTable
