export const formatAddress = (address) => {
	if(!address) return false

	const { name, num, region, postal, complement } = address
	let s = ''

	if(!!name) s += name
	if(!!num) {
		if(s.length > 0) s += ', '
		s += num
	}
	if(!!complement) {
		s += `(${complement})`
	}
	if(!!region) {
		if(s.length > 0) s += ' - '
		s += region
	}
	if(!!postal) {
		if(s.length > 0) s += ' | '
		s += postal
	}

	return s
}

export const formatCityState = (address) => {
	if(!address) return false

	const { city, state } = address
	let s = ''

	if(!!city) s += city
	if(!!state) {
		if(s.length > 0) s += ', '
		s += state
	}

	return s
}
