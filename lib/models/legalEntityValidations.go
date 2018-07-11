package models

import (
	"database/sql"

	"github.com/Nhanderu/brdoc"
	"github.com/cinn-labs/validate"
)

func (l *LegalEntity) Validate(db *sql.DB, update bool) (validate.Validations, error) {
	v, err := l.Entity.Validate(db, update)

	if l.Code != nil && *l.Code != "" && !brdoc.IsCNPJ(*l.Code) {
		err = v.Add("code", "Invalid Code")
	}

	if l.legalEntityType != "" && LEGAL_ENTITY_TYPES[l.legalEntityType] == "" && !update {
		err = v.Add("legalEntityType", "Invalid Value")
	}

	return v, err
}
