package models

import (
	"database/sql"

	"github.com/Nhanderu/brdoc"
)

func ListGlobalSearch(db *sql.DB, q string) (map[string]interface{}, error) {
	m := make(map[string]interface{})
	es, err := ListEntitiesWithNameOrCode(db, q)
	ls, is := SeparateEntitiesByType(es)
	m["legalEntities"] = ls
	m["individualEntities"] = is
	m["controls"], err = ListControlsWithNumOrEntityCodeAndName(db, q)
	if brdoc.IsCNPJ(q) && len(ls) == 0 {
		m["unregisteredEntity"], _ = ShowLegalEntityWithCodeOnGovApi(q)
	}
	return m, err
}
