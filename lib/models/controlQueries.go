package models

import (
	"database/sql"
	"fin/lib/helpers"
	"strings"
	"time"

	"github.com/cinn-labs/lg"
	"github.com/cinn-labs/qh"
	"github.com/cinn-labs/validate"
)

func HasControlWithNum(db *sql.DB, num string, id int) (bool, error) {
	q := "SELECT count(id) from Control WHERE num = $1 AND id <> $2 LIMIT 1"
	c := 0
	err := db.QueryRow(q, num, id).Scan(&c)
	if err != nil {
		lg.Error(err)
	}
	return c > 0, err
}

func ListControls(db *sql.DB) ([]Control, error) {
	q := `
		SELECT r.id, r.num, r.cost, r.instanceDate, e.id, e.name, e.code 
		FROM Control AS r
		INNER JOIN Entity AS e ON e.ID = r.legalEntityID
		ORDER BY r.instanceDate DESC
		LIMIT 20
	`
	rows, err := db.Query(q)

	if err != nil {
		lg.Error(err)
		return nil, err
	}

	defer rows.Close()
	list := []Control{}

	for rows.Next() {
		var m Control
		var e LegalEntity
		err = rows.Scan(&m.ID, &m.Num, &m.Cost, &m.InstanceDate, &e.ID, &e.Name, &e.Code)
		e.AfterInit()
		m.LegalEntity = e
		list = append(list, m)
	}

	return list, nil
}

func ListControlsWithNumOrEntityCodeAndName(db *sql.DB, qp string) ([]Control, error) {
	// TODO: Optimize query
	q := `
		SELECT r.id, r.num, r.cost, r.instanceDate, e.id, e.name, e.code 
		FROM Control AS r
		INNER JOIN Entity AS e ON e.ID = r.legalEntityID
		WHERE LOWER(r.num) LIKE LOWER($1) OR LOWER(e.name) LIKE LOWER($1) OR (e.code = $2 AND e.code <> '')
		ORDER BY r.instanceDate DESC
		LIMIT 20
	`
	rows, err := db.Query(q, "%"+strings.Join(strings.Split(qp, " "), "%")+"%", helpers.GetOnlyNumbersFrom(qp))

	if err != nil {
		lg.Error(err)
		return nil, err
	}

	defer rows.Close()
	list := []Control{}

	for rows.Next() {
		var m Control
		var e LegalEntity
		err = rows.Scan(&m.ID, &m.Num, &m.Cost, &m.InstanceDate, &e.ID, &e.Name, &e.Code)
		e.AfterInit()
		m.LegalEntity = e
		list = append(list, m)
	}

	return list, nil
}

func ShowControl(db *sql.DB, id int) (m Control, err error) {
	m = Control{}
	var e LegalEntity
	var c CountryQueryModel
	var a Address
	var lcl ControlQueryModel

	q := `
		WITH cl AS (
			SELECT 	
				r.id, r.num, r.cost, r.requestDate, r.deliveryDate, r.instanceDate, r.token, r.open, r.legalEntityID
			FROM Control as r
			WHERE r.id = $1
		)

		SELECT 
		  r.*, 
			e.mainRowID, e.name, e.code, e.countryID, e.addressID, e.revisedAt,
	    c.ID, c.namePT, c.code, 
			m.mentionedAt, 
			a.mainRowId, a.name, a.num, a.complement, a.region, a.postal, a.city, a.state,
			lcl.id, lcl.num, lcl.instanceDate

		FROM cl AS r

		LEFT OUTER JOIN (
			SELECT DISTINCT ON (mainRowID) mainRowID, name, code, entityType, countryID, addressID, revisedAt
				FROM EntityHistoryView
				WHERE updatedAt <= (SELECT instanceDate FROM cl)				
				ORDER BY mainRowID DESC, updatedAt DESC
		) AS e ON e.mainRowID = r.legalEntityID

		LEFT OUTER JOIN Country AS c ON c.ID = e.countryID

		LEFT OUTER JOIN (
			SELECT DISTINCT ON (mainRowID) mainRowID, name, num, complement, region, postal, city, state
				FROM AddressHistoryView
				WHERE updatedAt <= (SELECT instanceDate FROM cl)
				ORDER BY mainRowID DESC, updatedAt DESC
		) AS a ON a.mainRowID = e.addressID

		LEFT JOIN (
			SELECT DISTINCT ON (entityID) entityID, id, controlID, mentionedAt
			FROM MentionWithControlInstanceDateView
			WHERE controlID <> (SELECT id FROM cl)
				AND mentionedAt <= (SELECT instanceDate FROM cl)
			ORDER BY entityID DESC, mentionedAt DESC
		) AS m ON e.mainRowID = m.entityID

		LEFT JOIN Control AS lcl ON lcl.ID = m.controlID
	`

	err = db.QueryRow(q, id).Scan(&m.ID, &m.Num, &m.Cost, &m.RequestDate, &m.DeliveryDate, &m.InstanceDate, &m.Token, &m.Open, &m.LegalEntityID, &e.ID, &e.Name, &e.Code, &e.CountryID, &e.AddressID, &e.RevisedAt, &c.ID, &c.NamePT, &c.Code, &e.LastMentionAt, &a.ID, &a.Name, &a.Num, &a.Complement, &a.Region, &a.Postal, &a.City, &a.State, &lcl.ID, &lcl.Num, &lcl.InstanceDate)

	e.LastControl = lcl.ToControl()
	e.Country = c.ToCountry()
	e.Address = a

	e.AfterInit()
	m.LegalEntity = e

	if err != nil {
		lg.Error(err)
	}
	return
}

func ShowControlInstanceDate(db *sql.DB, id int) (d *time.Time, err error) {
	q := `
		SELECT instanceDate
		FROM Control
		WHERE id = $1
	`

	err = db.QueryRow(q, id).Scan(&d)

	if err != nil {
		lg.Error(err)
	}
	return
}

func ShowControlInstanceDateAndLegalEntityID(db *sql.DB, id int) (d *time.Time, lid int, err error) {
	q := `
		SELECT instanceDate, legalEntityID
		FROM Control
		WHERE id = $1
	`

	err = db.QueryRow(q, id).Scan(&d, &lid)

	if err != nil {
		lg.Error(err)
	}
	return
}

func ShowControlWithNum(db *sql.DB, num string) (m Control, err error) {
	m = Control{}
	e := LegalEntity{}
	q := `
		SELECT r.id, r.num, r.cost, r.requestDate, r.deliveryDate, r.instanceDate, r.token, r.open, e.id, e.name, e.code 
		FROM Control AS r
		INNER JOIN Entity AS e ON e.ID = r.legalEntityID
		WHERE r.num = $1
	`
	err = db.QueryRow(q, num).Scan(&m.ID, &m.Num, &m.Cost, &m.RequestDate, &m.DeliveryDate, &m.InstanceDate, &m.Token, &m.Open, &e.ID, &e.Name, &e.Code)
	e.AfterInit()
	m.LegalEntity = e

	if err != nil {
		lg.Error(err)
	}
	return
}

func CreateControl(db *sql.DB, m *Control) (validate.Validations, error) {
	q := `INSERT INTO Control (num, cost, requestDate, deliveryDate, token, open, legalEntityID) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`
	m.BeforeCreate()
	if v, err := m.Validate(db, false); err != nil {
		lg.ValidationError(v, err)
		return v, err
	}
	err := db.QueryRow(q, m.Num, m.Cost, m.RequestDate, m.DeliveryDate, m.Token, m.Open, m.LegalEntityID).Scan(&m.ID)

	if err != nil {
		lg.Error(err)
	}

	return nil, err
}

func UpdateControl(db *sql.DB, id int, m *Control) (validate.Validations, error) {
	if v, err := m.Validate(db, true); err != nil {
		lg.ValidationError(v, err)
		return v, err
	}

	pm := qh.ParamsMatching{[]string{}, 2, []interface{}{id}}

	if m.Num != "" {
		pm.Append("num", m.Num)
	}

	if m.Cost != nil {
		pm.Append("cost", *m.Cost)
	}

	if m.RequestDate != nil {
		pm.Append("requestDate", m.RequestDate)
	}

	if m.DeliveryDate != nil {
		pm.Append("deliveryDate", m.DeliveryDate)
	}

	// pm.Append("open", m.Open)

	q := "UPDATE Control SET " + pm.JoinColNames() + " WHERE id = $1"

	_, err := db.Exec(q, pm.ParamsValues...)
	if err != nil {
		lg.Error(err)
	}
	return nil, err
}

func RefreshControlInstanceDate(db *sql.DB, id int) error {
	q := "UPDATE Control SET instanceDate = NOW() WHERE id = $1"
	_, err := db.Exec(q, id)
	if err != nil {
		lg.Error(err)
	}
	return err
}

func DeleteControl(db *sql.DB, id int) error {
	q := "DELETE FROM Control WHERE id = $1"
	_, err := db.Exec(q, id)
	if err != nil {
		lg.Error(err)
	}
	return err
}

func ListControlsForLegalEntity(db *sql.DB, legalEntityID int) ([]Control, error) {
	q := `
		SELECT id, num, cost, instanceDate
		FROM Control
		WHERE legalEntityID = $1
		ORDER BY id DESC
		LIMIT 40
	`
	rows, err := db.Query(q, legalEntityID)

	if err != nil {
		lg.Error(err)
		return nil, err
	}

	defer rows.Close()
	list := []Control{}

	for rows.Next() {
		var m Control
		err = rows.Scan(&m.ID, &m.Num, &m.Cost, &m.InstanceDate)
		list = append(list, m)
	}

	return list, nil
}
