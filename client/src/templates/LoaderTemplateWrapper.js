import React from 'react'

import SideMenuTemplate from './SideMenuTemplate'
import Spinner from '../components/shapes/Spinner'

const LoaderTemplateWrapper = (props) => {
  if(props.loaded) return props.children
  const Template = props.Template || SideMenuTemplate
  return (
    <Template>
      <Spinner />
    </Template>
  )
}

export default LoaderTemplateWrapper
