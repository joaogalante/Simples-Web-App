package models

import (
	"database/sql"

	"github.com/cinn-labs/lg"
)

func ListJobTitles(db *sql.DB) ([]JobTitle, error) {
	q := `
		SELECT DISTINCT UNNEST(jobTitles) 
		FROM Participation 
		WHERE participationType = 'administrator';
	`
	rows, err := db.Query(q)

	if err != nil {
		lg.Error(err)
		return nil, err
	}

	defer rows.Close()
	list := []JobTitle{}

	for rows.Next() {
		var m JobTitle
		err = rows.Scan(&m.Name)
		list = append(list, m)
	}

	return list, nil
}
