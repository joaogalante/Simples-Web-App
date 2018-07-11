export const OPEN_MODAL = 'OPEN_MODAL'
export const openModal = (key) => ({ type: OPEN_MODAL, payload: key })

export const CLOSE_MODAL = 'CLOSE_MODAL'
export const closeModal = (key) => ({ type: CLOSE_MODAL, payload: key })

export const CLOSE_ALL_MODALS = 'CLOSE_ALL_MODALS'
export const closeAllModals = () => ({ type: CLOSE_ALL_MODALS })
