import './EmptyMessage.css'

import React from 'react'

import Icon from '../shapes/Icon'


const EmptyMessage = ({ msg }) => (
  <div className='empty-message'>
    <Icon name='folder' />
    <h3>{msg || 'Sem cadastro'}</h3>
  </div>
)

export default EmptyMessage
