package models

import (
	"time"

	uuid "github.com/satori/go.uuid"
)

type Control struct {
	ID            int         `json:"id"`
	LegalEntity   LegalEntity `json:"legalEntity"`
	LegalEntityID int         `json:"legalEntityID"`
	Num           string      `json:"num"`
	Cost          *string     `json:"cost"`
	RequestDate   *time.Time  `json:"requestDate"`
	DeliveryDate  *time.Time  `json:"deliveryDate"`
	InstanceDate  *time.Time  `json:"instanceDate"`
	Token         string      `json:"token"`
	Open          bool        `json:"open"`
}

type ControlQueryModel struct {
	ID           *int       `json:"id"`
	Num          *string    `json:"num"`
	RequestDate  *time.Time `json:"requestDate"`
	DeliveryDate *time.Time `json:"deliveryDate"`
	InstanceDate *time.Time `json:"instanceDate"`
}

func (cqm *ControlQueryModel) ToControl() *Control {
	if cqm.ID != nil && cqm.Num != nil {
		return &Control{
			ID:           *cqm.ID,
			Num:          *cqm.Num,
			InstanceDate: cqm.InstanceDate}
	}
	return nil
}

func (m *Control) BeforeCreate() {
	m.Token = uuid.NewV4().String()
}
