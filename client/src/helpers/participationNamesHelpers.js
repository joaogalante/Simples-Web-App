import { SHAREHOLDER_TYPES, SHAREHOLDER_TYPES_LABELS } from '../config/vars'

const { ENTITY, UNIDENTIFIED, CIRCULATION, OPEN, TREASURY } = SHAREHOLDER_TYPES 

export const getParticipationTitle = (participation) => {
	const legalEntityID = participation.legalEntityID 
		|| (participation.legalEntity && participation.legalEntity.id)
	const associatedEntityID = participation.associatedEntityID 
		|| (participation.associatedEntity && participation.associatedEntity.id)

	if(legalEntityID && associatedEntityID && legalEntityID === associatedEntityID) {
		return SHAREHOLDER_TYPES_LABELS[TREASURY]
	}
	if(!participation.shareholderType || participation.shareholderType === ENTITY) {
		return participation.associatedEntity && participation.associatedEntity.name
	}
	if(participation.shareholderType === UNIDENTIFIED
			&& !!participation.description) {
		return participation.description
	}
	if(SHAREHOLDER_TYPES_LABELS[participation.shareholderType]) {
		return SHAREHOLDER_TYPES_LABELS[participation.shareholderType] 
	}

	return participation.description
}

