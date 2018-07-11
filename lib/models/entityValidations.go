package models

import (
	"database/sql"

	"github.com/cinn-labs/validate"
)

func (m *Entity) Validate(db *sql.DB, update bool) (validate.Validations, error) {
	v := validate.Validations{}
	var err error = nil

	if m.Name == "" && !update {
		err = v.Add("name", "Required")
	}

	if m.Code != nil && *m.Code != "" {
		h, _ := HasEntityWithCode(db, *m.Code, m.ID)
		if h == true {
			// TODO: Use english and translate on the frontend
			err = v.Add("code", "Código já cadastrado")
		}
	}

	av, aerr := m.Address.Validate(db, update)
	if aerr != nil {
		v.MergeSubFieldValidations(av, "address")
		err = aerr
	}

	// if e.EntityType == "" && !update {
	// 	err = v.Add("entityType", "Required")
	// } else if ENTITY_TYPES[e.EntityType] == "" && !update {
	// 	err = v.Add("entityType", "Invalid Value")
	// }

	return v, err
}
