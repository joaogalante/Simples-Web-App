import React from 'react'

import {
  PARTICIPATION_TAGS_COLORS,
  PARTICIPATION_TAGS_LABELS,
  PARTICIPATION_TYPES,
  SHAREHOLDER_TYPES
} from '../config/vars'
import Tag from './presentation/Tag'

const { SHAREHOLDER, ADMINISTRATOR, BOTH } = PARTICIPATION_TYPES
const { CIRCULATION } = SHAREHOLDER_TYPES

const BothTags = () => (
  <div>
    <ParticipationTypeTag type={SHAREHOLDER} />
    <ParticipationTypeTag type={ADMINISTRATOR} />
  </div>
)

const ParticipationTypeTag = (props) => {
	if(props.type === BOTH) return <BothTags />

	const tagKey = props.shareholderType === CIRCULATION 
		? CIRCULATION 
		: props.type
	return (
		<Tag color={PARTICIPATION_TAGS_COLORS[tagKey]}>
			{PARTICIPATION_TAGS_LABELS[tagKey]}
		</Tag>
	)
}

export default ParticipationTypeTag  
