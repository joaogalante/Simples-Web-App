package models

import (
	"database/sql"

	"github.com/cinn-labs/validate"
)

func loadRelationships(db *sql.DB, m *Participation) {
	if m.LegalEntityID > 0 {
		m.LegalEntity, _ = ShowLegalEntity(db, m.LegalEntityID)
	}
	if m.AssociatedEntityID != nil {
		m.AssociatedEntity, _ = ShowEntity(db, *m.AssociatedEntityID)
	}
}

func (m *Participation) Validate(db *sql.DB, update bool) (validate.Validations, error) {
	loadRelationships(db, m)

	v := validate.Validations{}
	var err error = nil

	if m.LegalEntityID == 0 && !update {
		err = v.Add("legalEntityID", "Required")
	}

	if m.AssociatedEntityID == nil && m.ShareholderType == SHAREHOLDER_TYPES["entity"] && !update {
		err = v.Add("associatedEntityID", "Required")
	} else {
		if m.ParticipationType != PARTICIPATION_TYPES["shareholder"] && m.AssociatedEntity.EntityType == ENTITY_TYPES["legal"] {
			err = v.Add("associatedTypeID", "Invalid entity type")
		}
	}

	if m.LegalEntityID > 0 && m.LegalEntity.ID == 0 {
		err = v.Add("legalEntityID", "Invalid entity type")
	}

	if m.Percentage != nil && (*m.Percentage < 0 || *m.Percentage > 100) {
		err = v.Add("percentage", "Out of range")
	}

	if m.Quotas != nil && (*m.Quotas < 0) {
		err = v.Add("quotas", "Out of range")
	}

	if m.ParticipationType == "" && !update {
		err = v.Add("participationType", "Required")
	} else if PARTICIPATION_TYPES[m.ParticipationType] == "" && !update {
		err = v.Add("participationType", "Invalid Value")
	}

	if m.ShareholderType == "" && !update {
		err = v.Add("shareholderType", "Required")
	} else if SHAREHOLDER_TYPES[m.ShareholderType] == "" && !update {
		err = v.Add("shareholderType", "Invalid Value")
	}

	return v, err
}
