package models

import (
	"database/sql"

	"github.com/Nhanderu/brdoc"
	"github.com/cinn-labs/validate"
)

func (i *IndividualEntity) Validate(db *sql.DB, update bool) (validate.Validations, error) {
	v, err := i.Entity.Validate(db, update)

	if i.Code != nil && *i.Code != "" && !brdoc.IsCPF(*i.Code) {
		err = v.Add("code", "Invalid Code")
	}

	return v, err
}
