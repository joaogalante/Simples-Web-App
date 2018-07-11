package reports

import (
	"fin/lib/models"
	"sort"
)

type EntitiesGroup struct {
	Legals      []models.Entity
	Individuals []models.Entity
}

type ControlsEntitiesReportData struct {
	Entities       EntitiesGroup
	ReusedEntities map[string]EntitiesGroup
}

func sortEntitiesByName(es []models.Entity) {
	sort.Slice(es, func(i, j int) bool { return es[i].Name < es[j].Name })
}

func FormatControlsEntitiesReportData(es []models.Entity) ControlsEntitiesReportData {
	d := ControlsEntitiesReportData{Entities: EntitiesGroup{}, ReusedEntities: map[string]EntitiesGroup{}}

	sortEntitiesByName(es)

	for _, e := range es {
		groupToAppend := d.Entities
		isReused := false

		if e.LastMentionInLessThenSixMonths() {
			isReused = true
			if val, ok := d.ReusedEntities[e.LastControl.Num]; ok {
				groupToAppend = val
			} else {
				groupToAppend = EntitiesGroup{}
			}
		}

		if e.IsLegal() {
			groupToAppend.Legals = append(groupToAppend.Legals, e)
		} else {
			groupToAppend.Individuals = append(groupToAppend.Individuals, e)
		}

		if isReused {
			d.ReusedEntities[e.LastControl.Num] = groupToAppend
		} else {
			d.Entities = groupToAppend
		}
	}

	return d
}
