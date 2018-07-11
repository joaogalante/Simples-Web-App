package models

// Used to store sum of quotas and percentages
type quotasAndPercentages struct {
	quotas      int
	percentages float64
	quotaUnit   float64
}

func (qp *quotasAndPercentages) calculateQuotaUnit() {
	r := 100.00 - qp.percentages
	qp.quotaUnit = r / float64(qp.quotas)
}

func collectQuotasAndPercentagesSumPerLegalEntity(ps []Participation) map[int]quotasAndPercentages {
	group := map[int]quotasAndPercentages{}

	for _, p := range ps {
		if !p.IsShareholderOrBoth() {
			continue
		}
		qp := group[p.LegalEntityID]
		qp.percentages += p.GetPercentageOrZero()
		qp.quotas += p.GetQuotasOrZero()
		group[p.LegalEntityID] = qp
	}

	return group
}

func setParticipationsCalculatedPercentageBasedOnQuotas(ps []Participation, idsQuotas map[int]quotasAndPercentages) {
	for i, p := range ps {
		if !p.IsShareholderOrBoth() {
			continue
		}
		cp := p.GetPercentageOrZero()
		if cp == 0 && p.Quotas != nil {
			qp := idsQuotas[p.LegalEntityID]
			if qp.quotaUnit == 0 {
				qp.calculateQuotaUnit()
			}
			cp = qp.quotaUnit * float64(p.GetQuotasOrZero())
		}
		ps[i].CalculatedPercentage = cp
	}
}

func CalculatePercentageForParticipations(ps []Participation) {
	idsQuotas := collectQuotasAndPercentagesSumPerLegalEntity(ps)
	setParticipationsCalculatedPercentageBasedOnQuotas(ps, idsQuotas)
}
