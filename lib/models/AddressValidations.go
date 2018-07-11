package models

import (
	"database/sql"

	"github.com/cinn-labs/validate"
)

func (m *Address) Validate(db *sql.DB, update bool) (validate.Validations, error) {
	v := validate.Validations{}
	var err error = nil

	return v, err
}
