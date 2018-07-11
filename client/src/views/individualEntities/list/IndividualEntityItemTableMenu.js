import { connect } from 'react-redux'
import React from 'react'

import {
  goToEditIndividualEntity,
  goToShowIndividualEntity,
} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import IconButton from '../../../components/actions/IconButton'

const IndividualEntityTableMenu = ({ item, goToShow, goToEdit }) => (
  <div className='flex'>
    {/* <IconButton green icon='download-document' tooltip='Gerar Relatório de Controle' path={`/individual-entities/${item.id}/report`} /> */}
    <IconButton yellow icon='pencil' tooltip='Editar' onClick={() => goToEdit(item)} />
    <IconButton blue icon='search' tooltip='Ver Detalhes' onClick={() => goToShow(item)} />
  </div>
)

const mapActions = (dispatch) => ({
  goToShow: (entity) => goToShowIndividualEntity(dispatch, entity),
  goToEdit: (entity) => goToEditIndividualEntity(dispatch, entity),
})

export default connect(null, mapActions)(IndividualEntityTableMenu)
