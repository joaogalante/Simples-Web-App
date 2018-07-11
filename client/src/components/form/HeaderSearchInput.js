import './HeaderSearchInput.css'

import { Form } from 'antd'
import React from 'react'

import Button from '../actions/Button'
import Icon from '../shapes/Icon'
import Input from './Input'

const HeaderSearchInput = (props) => {
  const { onSubmit, ...restProps } = props

  return (
    <Form onSubmit={onSubmit} className='header-search-form'>
      <Input className='header-search-input' type='search' placeholder='Buscar...' field='search' {...restProps} />
      <Button className='header-search-submit' submit>
        <Icon name='search' />
      </Button>
    </Form>
  )
}

export default HeaderSearchInput
