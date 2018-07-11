import { connect } from 'react-redux'
import React from 'react'

import { closeAllModals } from '../../../logicContainers/modal/modal.actions'
import {
  goToEditControl,
  goToShowControl,
} from '../../../logicContainers/composedNavigations/composedNavigations.actions'
import IconButton from '../../../components/actions/IconButton'

const ControlTableMenu = ({ item, goToShow, goToEdit }) => (
  <div className='flex'>
    <IconButton yellow icon='pencil' tooltip='Editar' onClick={() => goToEdit(item)} />
    <IconButton blue icon='search' tooltip='Ver Detalhes' onClick={() => goToShow(item)} />
  </div>
)

const mapActions = (dispatch) => ({
  goToShow: (control) => {
    dispatch(closeAllModals())
    goToShowControl(dispatch, control)
  },
  goToEdit: (control) => {
    dispatch(closeAllModals())
    goToEditControl(dispatch, control)
  }
})

export default connect(null, mapActions)(ControlTableMenu)
