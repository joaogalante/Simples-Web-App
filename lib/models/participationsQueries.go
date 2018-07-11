package models

import (
	"database/sql"
	"time"

	"github.com/cinn-labs/lg"
	"github.com/cinn-labs/qh"
	"github.com/cinn-labs/validate"
)

func ListParticipationsCompositionForForLegalEntity(db *sql.DB, legalEntityID int, forControlID int) ([]Participation, error) {
	var limitDate interface{} = "NOW()"

	if forControlID != 0 {
		td, _ := ShowControlInstanceDate(db, forControlID)
		if td != nil {
			limitDate = *td
		}
	}

	q := `
		WITH RECURSIVE drilldown_participations AS (
			(
				SELECT p.mainRowID, p.legalEntityID, p.associatedEntityID, p.participationType, p.percentage, p.quotas, p.jobTitles, p.shareholderType, p.description, p.sort, p.updatedAt, p.deleted
					FROM ParticipationHistoryView AS p
					WHERE p.legalEntityID = $1
						AND p.updatedAt <= $3
			)

			UNION

			(
				SELECT a.mainRowID, a.legalEntityID, a.associatedEntityID, a.participationType, a.percentage, a.quotas, a.jobTitles, a.shareholderType, a.description, a.sort, a.updatedAt, a.deleted
					FROM ParticipationHistoryView AS a, drilldown_participations AS m
					WHERE a.legalEntityID = m.associatedEntityID
						AND a.updatedAt <= $3
			)
		)

		SELECT *
			FROM (
				SELECT DISTINCT ON (r.mainRowID) 
					r.*, e.mainRowID, e.name, e.code, e.entityType, e.countryID, e.addressID, e.revisedAt, e.bornAt, c.ID, c.namePT, c.code, m.mentionedAt, a.mainRowId, a.name, a.num, a.complement, a.region, a.postal, a.city, a.state, cl.id, cl.num, cl.instanceDate

					FROM drilldown_participations r

					LEFT OUTER JOIN (
						SELECT DISTINCT ON (mainRowID) mainRowID, name, code, entityType, countryID, addressID, revisedAt, bornAt
							FROM EntityHistoryView
							WHERE updatedAt <= $3
							ORDER BY mainRowID DESC, updatedAt DESC
					) AS e ON e.mainRowID = r.associatedEntityID

					LEFT OUTER JOIN Country AS c ON c.ID = e.countryID

					LEFT OUTER JOIN (
						SELECT DISTINCT ON (mainRowID) mainRowID, name, num, complement, region, postal, city, state
							FROM AddressHistoryView
							WHERE updatedAt <= $3
							ORDER BY mainRowID DESC, updatedAt DESC
					) AS a ON a.mainRowID = e.addressID

					LEFT JOIN (
						SELECT DISTINCT ON (entityID) entityID, id, controlID, mentionedAt
						FROM MentionWithControlInstanceDateView
						WHERE controlID <> $2
							AND mentionedAt <= $3
						ORDER BY entityID DESC, mentionedAt DESC
					) AS m ON e.mainRowID = m.entityID

					LEFT JOIN Control AS cl ON cl.ID = m.controlID

					ORDER BY r.mainRowID DESC, r.updatedAt DESC
			) result
			WHERE deleted <> true
	`

	rows, err := db.Query(q, legalEntityID, forControlID, limitDate)

	if err != nil {
		lg.Error(err)
		return nil, err
	}

	defer rows.Close()
	list := []Participation{}

	for rows.Next() {
		var m Participation
		var e Entity
		var c CountryQueryModel
		var a Address
		var u time.Time
		var d bool
		var cl Control

		err = rows.Scan(&m.ID, &m.LegalEntityID, &m.AssociatedEntityID, &m.ParticipationType, &m.Percentage, &m.Quotas, &m.JobTitles, &m.ShareholderType, &m.Description, &m.Sort, &u, &d, &e.ID, &e.Name, &e.Code, &e.EntityType, &e.CountryID, &e.AddressID, &e.RevisedAt, &e.BornAt, &c.ID, &c.NamePT, &c.Code, &e.LastMentionAt, &a.ID, &a.Name, &a.Num, &a.Complement, &a.Region, &a.Postal, &a.City, &a.State, &cl.ID, &cl.Num, &cl.InstanceDate)

		e.Country = c.ToCountry()
		e.Address = a
		e.LastControl = &cl
		m.AssociatedEntity = e
		list = append(list, m)
	}
	fps := []Participation{}

	// Used to clean deleted participations that somehow are comming on the query
	// TODO: Fix query and remove this function
	CleanParticipationsWithoutAssociationOnComposition(list, legalEntityID, &fps)

	return fps, nil
}

func ListParticipationsForLegalEntity(db *sql.DB, legalEntityID int) ([]Participation, error) {
	q := `
		SELECT p.id, p.associatedEntityID, p.participationType, p.percentage, p.quotas, p.JobTitles, p.shareholderType, p.description, e.id, e.name, e.code, e.revisedAt, e.bornAt
		FROM Participation AS p
		INNER JOIN Entity AS e ON e.ID = p.associatedEntityID
		WHERE p.legalEntityID = $1
			AND p.deleted <> true
		ORDER BY p.sort DESC NULLS LAST
	`

	rows, err := db.Query(q, legalEntityID)

	if err != nil {
		lg.Error(err)
		return nil, err
	}

	defer rows.Close()
	list := []Participation{}

	for rows.Next() {
		var m Participation
		var e Entity
		err = rows.Scan(&m.ID, &m.AssociatedEntityID, &m.ParticipationType, &m.Percentage, &m.Quotas, &m.JobTitles, &m.ShareholderType, &m.Description, &e.ID, &e.Name, &e.Code, &e.RevisedAt, &e.BornAt)
		m.AssociatedEntity = e
		list = append(list, m)
	}

	return list, nil
}

func ListParticipationsForAssociatedEntity(db *sql.DB, associatedEntityID int) ([]Participation, error) {
	q := `
		SELECT p.id, p.legalEntityID, p.participationType, p.percentage, p.quotas, p.JobTitles, p.shareholderType, p.description, e.id, e.name, e.code, e.revisedAt, e.bornAt
		FROM Participation AS p
		INNER JOIN Entity AS e ON e.ID = p.legalEntityID
		WHERE p.associatedEntityID = $1
			AND p.deleted <> true
		ORDER BY p.percentage DESC NULLS LAST
	`

	rows, err := db.Query(q, associatedEntityID)

	if err != nil {
		lg.Error(err)
		return nil, err
	}

	defer rows.Close()
	list := []Participation{}

	for rows.Next() {
		var m Participation
		var l LegalEntity
		err = rows.Scan(&m.ID, &m.LegalEntityID, &m.ParticipationType, &m.Percentage, &m.Quotas, &m.JobTitles, &m.ShareholderType, &m.Description, &l.ID, &l.Name, &l.Code, &l.RevisedAt, &l.BornAt)
		l.AfterInit()
		m.LegalEntity = l
		list = append(list, m)
	}

	return list, nil
}

func ShowParticipationSort(db *sql.DB, id int) (m Participation, err error) {
	m = Participation{}
	q := `SELECT id, legalEntityID, sort FROM Participation 
		WHERE id = $1 AND deleted <> true`
	err = db.QueryRow(q, id).Scan(&m.ID, &m.LegalEntityID, &m.Sort)
	if err != nil {
		lg.Error(err)
	}
	return
}

func CreateParticipation(db *sql.DB, m *Participation) (validate.Validations, error) {
	q := `
		INSERT INTO Participation
			(legalEntityID, associatedEntityID, percentage, quotas, jobTitles, participationType, shareholderType, description)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING id
	`

	if v, err := m.Validate(db, false); err != nil {
		lg.ValidationError(v, err)
		return v, err
	}

	err := db.QueryRow(q, m.LegalEntityID, m.AssociatedEntityID, m.Percentage, m.Quotas, m.GetJobTitlesPGFormat(), m.ParticipationType, m.ShareholderType, m.Description).Scan(&m.ID)
	if err != nil {
		lg.Error(err)
	}
	return nil, err
}

func UpdateParticipation(db *sql.DB, id int, m *Participation) (validate.Validations, error) {
	if v, err := m.Validate(db, true); err != nil {
		lg.ValidationError(v, err)
		return v, err
	}

	pm := qh.ParamsMatching{[]string{}, 2, []interface{}{id}}

	if m.Quotas != nil {
		pm.Append("quotas", *m.Quotas)
	} else {
		pm.Append("quotas", nil)
	}

	if m.Percentage != nil {
		pm.Append("percentage", *m.Percentage)
	} else {
		pm.Append("percentage", nil)
	}

	if m.JobTitles != nil {
		pm.Append("jobTitles", m.GetJobTitlesPGFormat())
	}

	if m.ParticipationType != "" {
		pm.Append("participationType", m.ParticipationType)
	}

	if m.Description != nil {
		pm.Append("description", m.Description)
	}

	q := "UPDATE Participation SET " + pm.JoinColNames() + " WHERE id = $1"

	_, err := db.Exec(q, pm.ParamsValues...)
	if err != nil {
		lg.Error(err)
	}
	return nil, err
}

func DeleteParticipation(db *sql.DB, id int) error {
	q := "UPDATE Participation SET deleted = true WHERE id = $1"
	_, err := db.Exec(q, id)
	if err != nil {
		lg.Error(err)
	}
	return err
}

func UpdateParticipationSort(db *sql.DB, id, sort int) error {
	q := "UPDATE Participation SET sort = $2 WHERE id = $1"
	r, err := db.Exec(q, id, sort)
	if err != nil {
		lg.Error(err, r)
	}
	return err
}
