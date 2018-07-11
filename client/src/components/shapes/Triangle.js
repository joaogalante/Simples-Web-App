import './Triangle.css'

import React from 'react'

const getClass = ({ left, down, up }) => {
  let className = 'triangle '

  if(left) className += 'left'
  else if(down) className += 'down'
  else if(up) className += 'up'
  else className += 'right'

  return className
}

const Triangle = (props) => (
  <div className={getClass(props)} />
)

export default Triangle
