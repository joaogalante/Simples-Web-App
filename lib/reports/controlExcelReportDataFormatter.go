package reports

import (
	"fin/lib/models"
	"sort"
)

func sortParticipations(ps *[]models.Participation) {
	sort.Slice(*ps, func(i, j int) bool {
		a := (*ps)[i]
		b := (*ps)[j]
		aFirst := true
		bFirst := false

		if a.Sort <= b.Sort {
			return aFirst
		}

		return bFirst

		return aFirst
	})
}

func CountLegalAndIndividualsAmount(ls []models.LegalEntity) (lc, ic int) {
	lIDsMap := map[int]bool{}
	iIDsMap := map[int]bool{}

	// Check root entity
	rl := ls[0]
	if !rl.LastMentionInLessThenSixMonths() {
		lIDsMap[rl.ID] = true
	}

	for _, l := range ls {
		ps := append(l.Shareholders, l.Administrators...)
		for _, p := range ps {
			e := p.AssociatedEntity
			// Only counts entities associations and not metioned in the last 6 months
			if p.IsAssociatedWithAnEntity() && !e.LastMentionInLessThenSixMonths() {
				if e.EntityType == models.ENTITY_TYPES["individual"] {
					iIDsMap[e.ID] = true
				} else {
					lIDsMap[e.ID] = true
				}
			}
		}
	}

	lc = len(lIDsMap)
	ic = len(iIDsMap)
	return
}

func sortShareholdersForRootListOfLegalEntities(shareholders []models.Participation) []models.Participation {
	ns := append([]models.Participation{}, shareholders...)
	sort.Slice(ns, func(i, j int) bool {
		a := shareholders[i]
		b := shareholders[j]
		aEntity := a.AssociatedEntity
		bEntity := b.AssociatedEntity
		aFirst := true
		bFirst := false

		if aEntity.IsFromBrazil() && !bEntity.IsFromBrazil() {
			return aFirst
		} else if !aEntity.IsFromBrazil() && bEntity.IsFromBrazil() {
			return bFirst
		}

		if aEntity.IsLegal() && bEntity.IsLegal() {
			aLegal := models.LegalEntity{Entity: aEntity}
			bLegal := models.LegalEntity{Entity: bEntity}
			if aLegal.HasShareholder(bLegal) {
				return bFirst
			} else if bLegal.HasShareholder(aLegal) {
				return aFirst
			}
		}

		if a.CalculatedPercentage > b.CalculatedPercentage {
			return bFirst
		}
		return aFirst
	})

	return ns
}

// The list o legal entities on the root of the file has a different order than the shareholder and admins list
func sortLegalEntities(ps []models.Participation, root models.LegalEntity, ls *[]models.LegalEntity) {
	ss := sortShareholdersForRootListOfLegalEntities(root.Shareholders)
	for _, p := range ss {
		e := p.AssociatedEntity
		if e.IsLegal() && !e.IsInLegalList(*ls) {
			nl := models.LegalEntity{Entity: e}
			nl.FillShareholders(ps)
			nl.FillAdministrators(ps)
			*ls = append(*ls, nl)
			sortLegalEntities(ps, nl, ls)
		}
	}
}

func FormatControlReportData(r models.Control, ps []models.Participation) ([]models.LegalEntity, int, int) {
	sortParticipations(&ps)
	models.CalculatePercentageForParticipations(ps)
	r.LegalEntity.FillShareholders(ps)
	r.LegalEntity.FillAdministrators(ps)
	ls := append([]models.LegalEntity{r.LegalEntity})
	sortLegalEntities(ps, r.LegalEntity, &ls)

	lc, ic := CountLegalAndIndividualsAmount(ls)
	return ls, lc, ic
}
