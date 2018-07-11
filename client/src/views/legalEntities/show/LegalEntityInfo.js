import {connect} from 'react-redux'
import React from 'react'

import {displayCode} from '../../../helpers/entityCodeHelpers'
import {formatAddress, formatCityState} from '../../../helpers/addressHelpers'
import EntityExpirationLabelValue from '../../entities/_common/EntityExpirationLabelValue'
import LabelValue, {LabelDate} from '../../../components/presentation/LabelValue'

const LegalEntityInfo = ({entity, hideExpirationDate}) => (
  <div>
    <LabelValue title={'Razão Social'} subtitle={entity.name} />
    <LabelValue title={'CNPJ'} subtitle={displayCode(entity)} />
    <LabelDate title={'Data de Constituição'} subtitle={entity.bornAt} emptyMessage="Sem data" />

    {!hideExpirationDate && <EntityExpirationLabelValue entity={entity} />}
    <LabelValue title={'País'} subtitle={entity.country && entity.country.namePT} emptyMessage="Sem país cadastrado" />
    <LabelValue
      title={'Cidade/Estado'}
      subtitle={formatCityState(entity.address)}
      emptyMessage="Sem endereço cadastrado"
    />
    <LabelValue title={'Endereço'} subtitle={formatAddress(entity.address)} emptyMessage="Sem endereço cadastrado" />
  </div>
)

const mapState = state => ({
  entity: state.legalEntities.single,
})

export default connect(mapState)(LegalEntityInfo)
