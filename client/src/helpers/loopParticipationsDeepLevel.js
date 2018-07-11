import R from 'ramda'

const loopParticipationsDeepLevel = R.curry((loopActionName, participations, action) => {
  if(!participations || !participations.length) return participations
  return participations[loopActionName](item => action({ 
    ...item, 
    associatedParticipations: loopParticipationsDeepLevel(loopActionName, item.associatedParticipations, action) 
  }))
})

export const forEachParticipationsDeepLevel = R.curry((participations, action) => {
  if(!participations || !participations.length) return 

	participations.forEach(item => {
		action(item)
		forEachParticipationsDeepLevel(item.associatedParticipations, action)
	})
})

export const findParticipationsDeepLevel = R.curry((participations, action) => {
  if(!participations || !participations.length) return undefined
	let result = participations.find(action)
	if(!result) {
		participations.forEach(item => {
			const internalResult = findParticipationsDeepLevel(item.associatedParticipations, action)
			if(internalResult) {
				result = internalResult
				return result
			}
		})
	}
	return result
})

export const reduceParticipationsDeepLevel = (participations, action) => {
  if(!participations || !participations.length) return participations
  return participations.reduce((list, item) => action(list, { 
    ...item, 
    associatedParticipations: reduceParticipationsDeepLevel(item.associatedParticipations, action) 
  }), [])
}

export const mapParticipationsDeepLevel = loopParticipationsDeepLevel('map')


