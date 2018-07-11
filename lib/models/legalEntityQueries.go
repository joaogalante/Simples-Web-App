package models

import (
	"database/sql"
	"fmt"

	"github.com/cinn-labs/lg"
	"github.com/cinn-labs/qh"
	"github.com/cinn-labs/validate"
)

func ListLegalEntities(db *sql.DB) ([]LegalEntity, error) {
	q := "SELECT id, code, name, revisedAt, bornAt FROM Entity WHERE entityType = 'legal' ORDER BY id DESC LIMIT 20"
	rows, err := db.Query(q)

	if err != nil {
		lg.Error(err)
		return nil, err
	}

	defer rows.Close()
	list := []LegalEntity{}

	for rows.Next() {
		var m LegalEntity
		err = rows.Scan(&m.ID, &m.Code, &m.Name, &m.RevisedAt, &m.BornAt)
		m.AfterInit()
		list = append(list, m)
	}

	return list, nil
}

func ShowLegalEntity(db *sql.DB, id int) (m LegalEntity, err error) {
	m = LegalEntity{}
	a := Address{}
	c := CountryQueryModel{}
	m.AfterInit()
	q := `
		SELECT e.id, e.code, e.name, e.countryID, COALESCE(e.addressID, 0), e.revisedAt, e.bornAt, COALESCE(a.id, 0), a.name, a.city, a.state, a.postal, a.num, a.region, a.complement, c.id, c.namePT, c.code
		FROM Entity AS e
		LEFT JOIN Address AS a ON a.id = e.addressID
		LEFT JOIN Country AS c ON c.id = e.CountryID
		WHERE e.id = $1 AND e.entityType = 'legal'
	`

	err = db.QueryRow(q, id).Scan(&m.ID, &m.Code, &m.Name, &m.CountryID, &m.AddressID, &m.RevisedAt, &m.BornAt, &a.ID, &a.Name, &a.City, &a.State, &a.Postal, &a.Num, &a.Region, &a.Complement, &c.ID, &c.NamePT, &c.Code)
	m.Address = a
	m.Country = c.ToCountry()
	if err != nil {
		lg.Error(err)
	}
	return
}

func CreateLegalEntity(db *sql.DB, m *LegalEntity) (validate.Validations, error) {
	q := `
		WITH a AS (
			INSERT INTO Address (name, num, complement, postal, region, city, state) 
			VALUES ($5, $6, $7, $8, $9, $10, $11)
			RETURNING id
		) 
		INSERT INTO Entity (code, name, countryID, bornAt, entityType, addressID) 
		VALUES ($1, $2, $3, $4, 'legal', (SELECT id from a)) 
		RETURNING id
	`
	m.BeforeSave()
	if v, err := m.Validate(db, false); err != nil {
		lg.ValidationError(v, err)
		return v, err
	}
	a := m.Address
	err := db.QueryRow(q, m.Code, m.Name, m.CountryID, m.BornAt, a.Name, a.Num, a.Complement, a.Postal, a.Region, a.City, a.State).Scan(&m.ID)
	if err != nil {
		lg.Error(err)
	}
	return nil, err
}

func UpdateLegalEntity(db *sql.DB, id int, m *LegalEntity) (validate.Validations, error) {
	m.BeforeSave()

	if v, err := m.Validate(db, true); err != nil {
		lg.ValidationError(v, err)
		return v, err
	}

	pm := qh.ParamsMatching{[]string{}, 2, []interface{}{id}}

	if m.Name != "" {
		pm.Append("name", m.Name)
	}

	if m.Code != nil {
		pm.Append("code", *m.Code)
	}

	if m.CountryID != nil && *m.CountryID != 0 {
		pm.Append("countryID", *m.CountryID)
	}

	if m.BornAt != nil {
		pm.Append("bornAt", *m.BornAt)
	}

	pma := GetAddressUpdateParams(m.Address, []string{""}, pm.ParamsCount, []interface{}{})

	// Updating the id on address to keep the query always filled
	q := `
		WITH e AS (
			UPDATE Entity SET %s
				WHERE id = $1 AND entityType = 'legal'
			RETURNING addressID
		) 
		UPDATE Address SET 
			id = id
			%s
			WHERE id = (SELECT addressID from e)
	`

	qf := fmt.Sprintf(q, pm.JoinColNames(), pma.JoinColNames())
	data := append(pm.ParamsValues, pma.ParamsValues...)

	r, err := db.Exec(qf, data...)
	if err != nil {
		lg.Error(err, r)
	}
	return nil, err
}
