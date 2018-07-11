import './PageHeader.css'

import React from 'react'

import { branch, renderNothing } from 'recompose'

import Icon from '../shapes/Icon'
import Link from '../actions/Link'

const hideIfHasNoIcon = branch(
  ({ icon }) => !icon,
  renderNothing
)

const SideTitleLink = hideIfHasNoIcon(({ icon, action, path }) => (
  <Link to={path} onClick={action} className='side-title-link'>
    <Icon name={icon} blue />
  </Link>
))

const hideIfHasNoReturn = branch(
  ({ returnTo, returnAction }) => !returnTo && !returnAction,
  renderNothing
)

const ReturnLink = hideIfHasNoReturn(({ returnTo, returnAction }) => (
  <Link to={returnTo} onClick={returnAction} className='return-link'>
    <Icon name='angle-left' />
  </Link>
))

const PageHeader= ({ title, sideTitlePath, sideTitleAction, sideTitleIcon, returnTo, returnAction, sideContent }) => (
  <div className='page-header'>
    <div className='page-header-col flex-1'>
      <ReturnLink returnTo={returnTo} returnAction={returnAction} />
      <h2 className='title'>{title}</h2>
      <SideTitleLink icon={sideTitleIcon} path={sideTitlePath} action={sideTitleAction} />
    </div>
    <div className='page-header-col'>
      {sideContent}
    </div>
  </div>
)

export default PageHeader
