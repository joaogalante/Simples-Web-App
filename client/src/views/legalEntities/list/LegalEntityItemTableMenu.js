import { connect } from 'react-redux'
import React from 'react'

import {
  goToEditLegalEntity,
  goToShowLegalEntity,
} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import IconButton from '../../../components/actions/IconButton'

const LegalEntityTableMenu = ({ item, goToShow, goToEdit }) => (
  <div className='flex'>
    {/* <IconButton green icon='download-document' tooltip='Gerar Relatório de Controle' path={`/legal-entities/${item.id}/report`} /> */}
    <IconButton yellow icon='pencil' tooltip='Editar' onClick={() => goToEdit(item)} />
    <IconButton blue icon='search' tooltip='Ver Detalhes' onClick={() => goToShow(item)} />
  </div>
)

const mapActions = (dispatch) => ({
  goToShow: (entity) => goToShowLegalEntity(dispatch, entity),
  goToEdit: (entity) => goToEditLegalEntity(dispatch, entity),
})

export default connect(null, mapActions)(LegalEntityTableMenu)
