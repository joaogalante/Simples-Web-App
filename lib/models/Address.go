package models

import "fin/lib/helpers"

type Address struct {
	ID         int     `json:"id"`
	Name       *string `json:"name"`
	Num        *string `json:"num"`
	Complement *string `json:"complement"`
	Postal     *string `json:"postal"`
	Region     *string `json:"region"`
	City       *string `json:"city"`
	State      *string `json:"state"`
	EntityID   int     `json:"entityID"`
}

func (m *Address) IsEmpty() bool {
	return helpers.NilOrEmptyString(m.Name) && helpers.NilOrEmptyString(m.Num) && helpers.NilOrEmptyString(m.Complement) && helpers.NilOrEmptyString(m.Postal) && helpers.NilOrEmptyString(m.Region) && helpers.NilOrEmptyString(m.City) && helpers.NilOrEmptyString(m.State)
}
