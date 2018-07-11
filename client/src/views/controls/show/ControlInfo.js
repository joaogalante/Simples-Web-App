import {Modal} from 'antd'
import {connect} from 'react-redux'
import React from 'react'
import moment from 'moment'

import {formatCNPJ} from '../../../helpers/entityCodeHelpers'
import {goToShowLegalEntity} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import {mergeControlsSingle} from '../_common/controls.actions'
import {refreshControlInstanceDateApi} from '../../../api/saveControlApi'
import LabelValue, {LabelValueLink} from '../../../components/presentation/LabelValue'

const ControlInfo = ({control, goToShowLegalEntity, refreshInstanceDate}) => (
  <div>
    <LabelValue title="Número" subtitle={control.num} />
    <LabelValueLink
      title="Razão Social"
      subtitle={control.legalEntity.name}
      onClick={() => goToShowLegalEntity(control.legalEntity)}
    />
    <LabelValueLink
      title="CNPJ"
      subtitle={control.legalEntity.code ? formatCNPJ(control.legalEntity.code) : 'Sem CNPJ'}
      onClick={() => goToShowLegalEntity(control.legalEntity)}
    />
    <LabelValue title="Centro de Custo" subtitle={control.cost} emptyMessage="Sem custo" />
    <LabelValueLink
      title="Data de emissão"
      subtitle={moment(control.instanceDate).format('DD/MM/YYYY HH:mm')}
      icon="refresh-time"
      onClick={() => refreshInstanceDate(control)}
    />
  </div>
)

const mapState = state => ({
  control: state.controls.single,
})

const confirm = Modal.confirm

const mapActions = dispatch => ({
  refreshInstanceDate: control => {
    confirm({
      title: 'Alterar a data de emissão para hoje??',
      content:
        'Os dados desse controle serão atualizados para a data de hoje. Isso pode afetar o historico de outros controles e pesquisas que utilizam a data de reaproveitamento desse controle.',
      okText: 'Sim',
      cancelText: 'Não',
      onOk() {
        refreshControlInstanceDateApi(control.id).then(() => {
          dispatch(mergeControlsSingle({instanceDate: moment()}))
        })
      },
    })
  },
  goToShowLegalEntity: entity => {
    goToShowLegalEntity(dispatch, entity)
  },
})

export default connect(mapState, mapActions)(ControlInfo)
