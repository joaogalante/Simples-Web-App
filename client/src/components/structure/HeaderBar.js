import './HeaderBar.css'

import { connect } from 'react-redux'
import React from 'react'

import { getDefaultClassName } from '../../helpers/classNameHelpers'
import Container from './Container'
import FlexGridItem from './FlexGridItem'
import HeaderSearchForm from '../../views/search/form/HeaderSearchForm'
import Logo from '../shapes/Logo'

const HeaderBar = (props) => (
  <div className={getDefaultClassName(props, 'header-bar')}>
    <Container>
      <FlexGridItem flex={8}>
        <Logo />
      </FlexGridItem>
      <FlexGridItem empty />
      <FlexGridItem flex={18}>
        <HeaderSearchForm />
      </FlexGridItem>
      <FlexGridItem textRight flex={10}>
        {props.user.name}
      </FlexGridItem>
      <FlexGridItem empty />
    </Container>
  </div>
)

const mapState = ({ session }) => ({
  user: session.user,
})

export default connect(mapState)(HeaderBar)
