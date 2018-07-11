import './LabelValue.css'

import React from 'react'
import moment from 'moment'

import {getDefaultClassName} from '../../helpers/classNameHelpers'
import Icon from '../shapes/Icon'
import Link from '../actions/Link'

const LabelValue = props => (
  <div className={getDefaultClassName(props, 'label-value')}>
    <div className="label">{props.title}</div>
    <div className="value">{props.subtitle || (props.emptyMessage || '-')}</div>
  </div>
)

export const LabelDate = props => {
  if (!props.subtitle) return <LabelValue {...props} />
  return <LabelValue {...props} subtitle={moment.utc(props.subtitle).format(props.format || 'DD/MM/YYYY')} />
}

export const LabelValueLink = props => (
  <div className={getDefaultClassName(props, 'label-value-link')}>
    <div className="label">{props.title}</div>
    <Link className="value" onClick={props.onClick} goTo={props.goTo}>
      {props.subtitle}
      <Icon name={props.icon || 'search'} blue />
    </Link>
  </div>
)

export default LabelValue
