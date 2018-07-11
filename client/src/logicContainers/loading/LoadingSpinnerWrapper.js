import React from 'react'

import Content from '../../components/structure/Content'
import Spinner from '../../components/shapes/Spinner'

const LoadingSpinnerWrapper = (props) => {
  if(!props.loading) return props.children
  return (
    <Content centerChild basicPadding>
      <Spinner />
    </Content>
  )
}

export default LoadingSpinnerWrapper
