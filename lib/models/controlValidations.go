package models

import (
	"database/sql"

	"github.com/cinn-labs/validate"
)

func (m *Control) Validate(db *sql.DB, update bool) (validate.Validations, error) {
	v := validate.Validations{}
	var err error = nil

	if m.Num == "" && !update {
		err = v.Add("num", "Required")
	}

	if m.Num != "" {
		h, _ := HasControlWithNum(db, m.Num, m.ID)
		if h == true {
			// TODO: Use english and translate on the frontend
			err = v.Add("num", "Número já cadastrado")
		}
	}

	if m.LegalEntityID == 0 && !update {
		err = v.Add("legalEntityID", "Required")
	}

	if m.Token == "" && !update {
		err = v.Add("token", "Required")
	}

	return v, err
}
