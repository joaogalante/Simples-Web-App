package models

import (
	"database/sql"
	"fin/lib/helpers"
	"strings"

	"github.com/cinn-labs/lg"
)

func HasEntityWithCode(db *sql.DB, code string, id int) (bool, error) {
	q := "SELECT count(id) FROM Entity WHERE code = $1 AND id <> $2 LIMIT 1"
	c := 0
	err := db.QueryRow(q, code, id).Scan(&c)
	return c > 0, err
}

func ShowEntity(db *sql.DB, id int) (m Entity, err error) {
	m = Entity{}
	q := `
		SELECT e.id, e.code, e.name, e.entityType, e.countryID, e.revisedAt, e.bornAt, c.id, c.namePT, c.code
		FROM Entity AS e
		LEFT OUTER JOIN Country AS c ON c.ID = e.countryID
		WHERE e.id = $1
	`
	var c Country
	err = db.QueryRow(q, id).Scan(&m.ID, &m.Code, &m.Name, &m.EntityType, &m.CountryID, &m.RevisedAt, &m.BornAt, &c.ID, &c.NamePT, &c.Code)
	m.Country = &c
	if err != nil {
		lg.Error(err)
	}
	return
}

func ShowEntityWithCode(db *sql.DB, code string) (m Entity, err error) {
	m = Entity{}
	q := "SELECT id, code, name, entityType, countryID FROM Entity WHERE code = $1 LIMIT 1"
	err = db.QueryRow(q, code).Scan(&m.ID, &m.Code, &m.Name, &m.EntityType, &m.CountryID)
	if err != nil {
		lg.Error(err)
	}
	return
}

func ListEntitiesWithNameOrCode(db *sql.DB, qp string) ([]Entity, error) {
	q := `
		SELECT id, code, name, entityType, countryID, revisedAt, bornAt
		FROM Entity
		WHERE LOWER(name) LIKE LOWER($1) OR (code = $2 AND code <> '')
		ORDER BY id DESC
		LIMIT 20
	`

	rows, err := db.Query(q, "%"+strings.Join(strings.Split(qp, " "), "%")+"%", helpers.GetOnlyNumbersFrom(qp))

	if err != nil {
		lg.Error(err)
		return nil, err
	}

	defer rows.Close()
	list := []Entity{}

	for rows.Next() {
		var m Entity
		err = rows.Scan(&m.ID, &m.Code, &m.Name, &m.EntityType, &m.CountryID, &m.RevisedAt, &m.BornAt)

		list = append(list, m)
	}

	return list, nil
}

func ListEntitiesWithNameAndType(db *sql.DB, qp string, entityType string) ([]Entity, error) {
	qSelect := "SELECT id, code, name, entityType, bornAt, countryID FROM Entity"
	qWhere := " WHERE LOWER(name) LIKE LOWER($1)"
	if entityType != "both" && entityType != "any" {
		qWhere = qWhere + " AND entityType = $2"
	} else {
		// To allow the same amount of params in the dbQuery function
		qWhere = qWhere + " AND $2 = $2"
	}
	qOptions := " ORDER BY id DESC LIMIT 20"

	rows, err := db.Query(qSelect+qWhere+qOptions, "%"+strings.Join(strings.Split(qp, " "), "%")+"%", entityType)

	if err != nil {
		lg.Error(err)
		return nil, err
	}

	defer rows.Close()
	list := []Entity{}

	for rows.Next() {
		var m Entity
		err = rows.Scan(&m.ID, &m.Code, &m.Name, &m.EntityType, &m.BornAt, &m.CountryID)

		list = append(list, m)
	}

	return list, nil
}

func ListEntitiesOnControl(db *sql.DB, controlID int) ([]Entity, error) {
	c, _ := ShowControl(db, controlID)
	ps, err := ListParticipationsCompositionForForLegalEntity(db, c.LegalEntityID, controlID)

	if err != nil {
		lg.Error(err)
		return nil, err
	}

	es := []Entity{c.LegalEntity.Entity}

	for _, p := range ps {
		if p.IsAssociatedWithAnEntity() && !p.AssociatedEntity.IsInList(es) {
			es = append(es, p.AssociatedEntity)
		}
	}

	return es, nil
}

func ListExpiredEntitiesOnComposition(db *sql.DB, legalEntityID int) ([]Entity, error) {
	q := `
		WITH RECURSIVE drilldown_participations AS (
			(
				SELECT p.associatedEntityID
					FROM Participation AS p
					WHERE p.legalEntityID = $1
						AND p.associatedEntityID IS NOT NULL
						AND p.deleted <> true
			)

			UNION

			(
				SELECT a.associatedEntityID
					FROM Participation AS a, drilldown_participations AS m
					WHERE a.legalEntityID = m.associatedEntityID
						AND a.associatedEntityID IS NOT NULL
						AND a.deleted <> true
			)
		)

		SELECT DISTINCT e.id, e.name, e.code, e.entityType, e.revisedAt
			FROM drilldown_participations r
			LEFT JOIN Entity AS e 
				ON e.ID = r.associatedEntityID
					OR e.ID = $1
			WHERE e.revisedAt <= NOW() - interval '6 month';

	`

	rows, err := db.Query(q, legalEntityID)

	if err != nil {
		lg.Error(err)
		return nil, err
	}

	defer rows.Close()
	list := []Entity{}

	for rows.Next() {
		var e Entity

		err = rows.Scan(&e.ID, &e.Name, &e.Code, &e.EntityType, &e.RevisedAt)

		list = append(list, e)
	}

	return list, nil
}

func CountExpiredEntitiesOnComposition(db *sql.DB, legalEntityID int) (int, error) {
	q := `
		WITH RECURSIVE drilldown_participations AS (
			(
				SELECT p.associatedEntityID
					FROM Participation AS p
					WHERE p.legalEntityID = $1
						AND p.associatedEntityID IS NOT NULL
						AND p.deleted <> true
			)

			UNION

			(
				SELECT a.associatedEntityID
					FROM Participation AS a, drilldown_participations AS m
					WHERE a.legalEntityID = m.associatedEntityID
						AND a.associatedEntityID IS NOT NULL
						AND a.deleted <> true
			)
		)

		SELECT COUNT(DISTINCT e.id)
			FROM drilldown_participations r
			LEFT JOIN Entity AS e 
				ON e.ID = r.associatedEntityID
					OR e.ID = $1
			WHERE e.revisedAt <= NOW() - interval '6 month';

	`

	c := 0
	err := db.QueryRow(q, legalEntityID).Scan(&c)
	if err != nil {
		lg.Error(err)
	}
	return c, err
}

func RefreshEntityRevisedAt(db *sql.DB, id int) error {
	q := "UPDATE Entity SET revisedAt = NOW() WHERE id = $1"
	_, err := db.Exec(q, id)
	if err != nil {
		lg.Error(err)
	}
	return err
}
