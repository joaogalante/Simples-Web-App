import {connect} from 'react-redux'
import React from 'react'

import {formatedEntityFullExpirationDate, isEntityExpired} from '../../../helpers/entityExpirationDate'
import {goToValidateEntity} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import LabelValue, {LabelValueLink} from '../../../components/presentation/LabelValue'

const EntityExpirationLabelValueReadOnly = ({entity}) => (
  <LabelValue
    title={'Data de validade'}
    subtitle={formatedEntityFullExpirationDate(entity)}
    red={isEntityExpired(entity)}
  />
)

const EntityExpirationLabelValueWithAction = ({entity, goToValidation}) => (
  <LabelValueLink
    title={'Data de validade'}
    subtitle={formatedEntityFullExpirationDate(entity)}
    red={isEntityExpired(entity)}
    icon="refresh-time"
    onClick={goToValidation}
  />
)

const EntityExpirationLabelValue = ({readOnly, ...restProps}) =>
  readOnly ? (
    <EntityExpirationLabelValueReadOnly {...restProps} />
  ) : (
    <EntityExpirationLabelValueWithAction {...restProps} />
  )

const mapActions = (dispatch, {entity}) => ({
  goToValidation: () => goToValidateEntity(dispatch, entity),
})

export default connect(null, mapActions)(EntityExpirationLabelValue)
