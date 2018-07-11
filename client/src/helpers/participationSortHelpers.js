export const moveSortParticipation = (arr, p, pr) => {
	const min = p.sort > pr.sort ? pr.sort : p.sort
	const max = p.sort < pr.sort ? pr.sort : p.sort
	const isIncrement = p.sort > pr.sort
	const isAffected = (item) => item.sort >= min 
		&& item.sort <= max 
		&& item.legalEntityID === p.legalEntityID 
		&& item.legalEntityID === pr.legalEntityID

	return arr.map(item => {
		if(!isAffected(item)) return item

		let sort = item.sort
		if(item.id === p.id) {
			sort = pr.sort
		} else {
			sort += isIncrement ? 1 : -1
		}
		return {
			...item,
			sort
		}
	})
}

export const ajustSortAfterRemoveParticipation = (arr, p) => {
	const { sort: sortRemoved } = p
	const isAffected = (item) => item.sort >= sortRemoved 
		&& item.legalEntityID === p.legalEntityID 

	return arr.map(item => {
		if(!isAffected(item)) return item
		let { sort } = item
		sort += -1
		return {
			...item,
			sort
		}
	})
}


