package models

import (
	"database/sql"
	"strings"

	"github.com/cinn-labs/lg"
)

func ListCountries(db *sql.DB, qp string) ([]Country, error) {
	q := `
		SELECT id, namePT, code, sort
		FROM Country
		ORDER BY sort DESC, namePT ASC
	`
	qwp := `
		SELECT id, namePT, code, sort
		FROM Country
		WHERE LOWER(namePT) LIKE LOWER($1) 
			OR  LOWER(name) LIKE LOWER($1) 
			OR  LOWER(code) LIKE LOWER($1) 
		ORDER BY sort DESC, namePT ASC
		LIMIT 50
	`

	var rows *sql.Rows
	var err error
	if qp != "" {
		rows, err = db.Query(qwp, "%"+strings.Join(strings.Split(qp, " "), "%")+"%")
	} else {
		rows, err = db.Query(q)
	}

	if err != nil {
		lg.Error(err)
		return nil, err
	}

	defer rows.Close()
	list := []Country{}

	for rows.Next() {
		var m Country
		err = rows.Scan(&m.ID, &m.NamePT, &m.Code, &m.Sort)
		list = append(list, m)
	}

	return list, nil
}
